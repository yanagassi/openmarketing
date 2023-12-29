from .Base.BaseAppService import BaseAppService
import http.cookies
from settings import EMAIL_FIELD, NAME_FIELD
from constants.event_type import OPPORTUNITY, SALE
from repository.LeadsRepository import LeadsRepository
from repository.EventsRepository import EventsRepository
from .EventsAppService import EventsAppService
from .LeadScoringAppService import LeadScoringAppService
from .LandingPagesAppService import LandingPagesAppService
import json

from helpers.comun import parse_entity
from flask import Flask, jsonify
from bson.objectid import ObjectId
from datetime import datetime, timedelta


class LeadsAppService(BaseAppService):
    def __init__(self):
        # Inicializa o serviço de aplicativo para leads, utilizando o repositório de leads.
        self._repo = LeadsRepository()
        self._events_repo = EventsRepository()
        self._event_appservice = EventsAppService()
        self._lead_scoring_appservice = LeadScoringAppService()

        self._landing_pages_appservice = LandingPagesAppService()

    def get_lead(self, email, organization_id):
        """
        Obtém informações de um lead com base no endereço de e-mail.

        :param email: O endereço de e-mail do lead.
        :return: Dados do lead ou False se não encontrado.
        """
        result = self._repo.get_leads_by_filter(
            {"email": email, "organization_id": organization_id}
        )
        if result:
            return json.loads(json.dumps(result[0].__dict__))
        return False

    @staticmethod
    def search_event_in_events_object(lead_events, id_event):
        """
        Procura um evento dentro do objeto de eventos.

        :param lead_events: Lista de eventos do lead.
        :param id_event: ID do evento a ser procurado.
        :return: O evento se encontrado, False caso contrário.
        """

        if len(lead_events) == 0:
            return False

        for evnt in lead_events:
            if str(evnt["id"]) == str(id_event):
                return evnt
            elif "_id" in evnt and str(evnt["_id"]) == str(id_event):
                return evnt

        return False

    def cancel_sale_or_oportunity(self, email, event_id, organization_id):
        """
        Cancela uma venda ou oportunidade para um lead.

        :param email: O endereço de e-mail do lead.
        :param event_id: O ID do evento a ser cancelado.
        :param organization_id: O ID da organização.
        :return: True se o evento foi cancelado, False caso contrário.
        """
        lead = self.get_lead(email, organization_id)
        if lead == False or "events" not in lead:
            return False

        evnt = self.search_event_in_events_object(lead["events"], event_id)
        if evnt == False:
            return False

        self._events_repo.delete_event(event_id)

    def get_lead_by_id(self, id, organization_id, for_frontend=False):
        """
        Obtém informações de um lead com base no endereço de e-mail.

        :param id: id do lead.
        :return: Dados do lead ou False se não encontrado.
        """
        result = self._repo.get_lead_by_id(id)
        if result:
            result = self.parse_lead(result.__dict__)
            if str(result["organization_id"]) != str(organization_id):
                return False

            result["events"] = []
            result[SALE] = False
            result[OPPORTUNITY] = False

            rules_perfil = self._lead_scoring_appservice.list_all(organization_id)
            rules_interesse = self._lead_scoring_appservice.list_all_interesse(
                organization_id
            )

            result[
                "data"
            ] = self._lead_scoring_appservice.get_especifico_campo_formulario(
                organization_id, result["data"], for_frontend
            )

            for i in self._event_appservice.get_events_by_lead_id(organization_id, id):
                if "lp_id" in i.data:
                    lp = self._landing_pages_appservice.get_landing_pages(
                        i.data["lp_id"]
                    )
                    lp.mobile = {}
                    lp.desktop = {}
                    lp.organization_id = str(lp.organization_id)
                    i.lp_data = parse_entity(lp.__dict__)

                event_parsed = self.parse_lead(i.__dict__)

                result["events"].append(event_parsed)

                # Especificando alguns eventos que eu quero preenchido.
                # Talvez aqui seja possivel adicionar validações de novos steps de funil que venham a surgir
                # Facilita na hora de manipular o JSON, é opcional, tendo em vista que já vem no Events, dentro do objeto.
                # Mas vai facilitar. ;)

                if i.type_event == OPPORTUNITY and i._deleted_date == False:
                    result[OPPORTUNITY] = True
                    result[f"{OPPORTUNITY}_ID"] = event_parsed

                if i.type_event == SALE and i._deleted_date == False:
                    result[SALE] = True
                    result[f"{SALE}_ID"] = event_parsed

                result[
                    "lead_scoring_perfil"
                ] = self._lead_scoring_appservice.calcule_perfil(result, rules_perfil)
                result[
                    "lead_scoring_interesse"
                ] = self._lead_scoring_appservice.calcule_interesse(
                    result, rules_interesse
                )

            return result
        return False

    def parse_lead(self, res):
        """
        Analisa e converte uma entidade de lead.

        :param res: Dicionário representando uma entidade de lead.
        :return: Dicionário convertido da entidade de lead.
        """
        result = {}
        for name, value in res.items():
            if "_id" == name:
                result["id"] = str(res["_id"])
            if "_" not in name[0]:
                result[name] = value

        return result

    def get_my_leads(self, org_id):
        """
        Obtém os leads pertencentes a uma organização.

        :param org_id: O ID da organização.
        :return: Lista de leads pertencentes à organização.
        """

        result = self._repo.get_leads_by_filter({"organization_id": org_id})
        if result:
            final = []
            for i in result:
                i = i.__dict__

                i["_id"] = str(i["_id"])
                i["data_len"] = len(i["data"])
                i["data"] = {}

                final.append(self.parse_lead(i))
            return jsonify(final)

        return jsonify([])

    def get_leads_filter(
        self, org_id, filter={}, last_month=False, remove_data=True, events=False
    ):
        """
        Obtém leads filtrados com base em critérios fornecidos.

        :param org_id: O ID da organização.
        :param filter: Filtros adicionais a serem aplicados.
        :param last_month: Flag para filtrar leads do mês passado.
        :param remove_data: Flag para remover dados dos leads.
        :param events: Flag para incluir eventos dos leads.
        :return: Lista de leads filtrados.
        """
        filter["organization_id"] = org_id
        result = self._repo.get_leads_by_filter()

        if last_month:
            data_atual = datetime.now()
            primeiro_dia_mes_anterior = datetime(
                data_atual.year, data_atual.month - 1, 1
            )
            ultimo_dia_mes_anterior = datetime(
                data_atual.year, data_atual.month, 1
            ) - timedelta(days=1)

            filter["created_at"] = {
                "$gte": primeiro_dia_mes_anterior,
                "$lt": ultimo_dia_mes_anterior,
            }

        if result:
            final = []
            for i in result:
                i = i.__dict__
                i["data_len"] = len(i["data"])
                if remove_data:
                    i["data"] = {}
                if events:
                    i["events"] = self._event_appservice.get_events_by_lead_id(
                        org_id, i["_id"]
                    )
                final.append(self.parse_lead(i))
            return final

        return []

    def alter_lead(self, body, lead_id, organization_id):
        """
        Altera informações de um lead.

        :param body: Dados a serem alterados no lead.
        :param lead_id: ID do lead a ser alterado.
        :param organization_id: O ID da organização.
        :return: True se o lead foi alterado com sucesso, False caso contrário.
        """
        result = self._repo.get_lead_by_id(lead_id)

        if str(result.organization_id) != str(organization_id):
            return False

        if "_id" in body:
            del body["_id"]

        if "id" in body:
            del body["id"]

        if "organization_id" in body:
            del body["organization_id"]

        self._repo.update_lead(lead_id, body)
        return True

    def get_or_insert_update_lead(self, body):
        """
        Obtém informações de um lead com base no corpo da requisição. Se o lead não existir, insere um novo.

        :param body: O corpo da requisição contendo informações sobre o lead.
        :return: Uma tupla contendo os dados do lead e um indicador se foi inserido um novo lead.
        """
        cookies = body.get("cookies", "")
        parsed_cookies = http.cookies.SimpleCookie(cookies)

        email = None
        for key, morsel in parsed_cookies.items():
            if key == EMAIL_FIELD:
                email = morsel.value

        email = body.get("email", email)
        if "data" in body and EMAIL_FIELD in body["data"]:
            email = body["data"].get(EMAIL_FIELD, email)

        if not email:
            return False, False

        result = self.get_lead(email, body["organization_id"])

        if result:
            if (
                (result["name"] == "")
                and ("data" in body)
                and (NAME_FIELD in body["data"])
            ):
                self._repo.update_lead(
                    result["_id"], {"name": body["data"][NAME_FIELD]}
                )

            for key, value in body.get("data", {}).items():
                result["data"][key] = value

            self._repo.update_lead(result["_id"], {"data": result["data"]})

            return result, False
        fic_name = ""
        if ("data" in body) and (NAME_FIELD in body["data"]):
            fic_name = body["data"][NAME_FIELD]

        self._repo.insert_lead(
            {
                "email": email,
                "organization_id": body["organization_id"],
                "name": body.get("name", fic_name),
                "data": body.get("data", {}),
            }
        )
        result = self.get_lead(email, body["organization_id"])

        return result, True

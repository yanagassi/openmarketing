from .Base.BaseAppService import BaseAppService
import http.cookies
from settings import DEFAULT_EVENT, EMAIL_FIELD
from repository.EventsRepository import EventsRepository
from datetime import datetime, timedelta
from bson.objectid import ObjectId
from helpers.comun import parse_entity


class EventsAppService(BaseAppService):
    def __init__(self):
        # Inicializa o serviço de aplicativo para eventos, utilizando o repositório de eventos.
        self._repo = EventsRepository()

    def get_events(self, organization_id, type_event, last_month=False):
        filters = {
            "organization_id": organization_id,
            "type_event": type_event,
            "deleted_date": {"$exists": False},
        }

        if last_month:
            data_atual = datetime.now()
            primeiro_dia_mes_anterior = datetime(
                data_atual.year, data_atual.month - 1, 1
            )
            ultimo_dia_mes_anterior = datetime(
                data_atual.year, data_atual.month, 1
            ) - timedelta(days=1)

            filters["event_date"] = {
                "$gte": primeiro_dia_mes_anterior,
                "$lt": ultimo_dia_mes_anterior,
            }

        return self._repo.get_by_filter(filters)

    def get_events_by_email(self, organization_id, email, deleted_return=False):
        return self._repo.get_by_filter(
            {
                "email": email,
                "organization_id": organization_id,
                "deleted_date": {"$exists": deleted_return},
            }
        )

    def get_events_by_lead_id(self, organization_id, lead_id, deleted_return=False):
        return self._repo.get_by_filter(
            {
                "lead_id": lead_id,
                "organization_id": organization_id,
                "deleted_date": {"$exists": deleted_return},
            }
        )

    def register_event(self, body):
        """
        Registra um novo evento com base nas informações fornecidas no corpo da requisição.

        :param body: O corpo da requisição contendo informações sobre o evento.
        :return: O ID do evento recém-criado ou None se um evento idêntico já existir nos últimos 5 segundos.
        """
        organization_id = body["organization_id"]
        cookies = []
        email = body.get("email", None)
        lead_id = body.get("lead_id", "")
        data = body.get("data", {})
        event_type = body.get("type", DEFAULT_EVENT)
        href = body.get("href", "")
        insert_id = None

        if "cookies" in body:
            cookie_string = body["cookies"]
            parsed_cookies = http.cookies.SimpleCookie(cookie_string)

            for key, morsel in parsed_cookies.items():
                cookies.append({key: morsel.value})

                if key == EMAIL_FIELD:
                    email = morsel.value

        if email is None:
            return insert_id

        # Calcula o timestamp para os últimos 5 segundos
        five_seconds_ago = datetime.now() - timedelta(seconds=5)

        # Verifica se existe um evento com os mesmos dados nos últimos 5 segundos
        existing_event = self._repo.get_by_filter(
            {
                "email": email,
                "type_event": event_type,
                "data": data,
                "href": href,
                "cookies": cookies,
                "lead_id": lead_id,
                "organization_id": organization_id,
                "event_date": {
                    "$gte": five_seconds_ago,
                    "$lte": datetime.now(),
                },
            }
        )

        if not existing_event:
            # Se não houver evento idêntico nos últimos 5 segundos, insira o novo evento
            result = self._repo.insert_event(
                {
                    "email": email,
                    "cookies": cookies,
                    "data": data,
                    "href": href,
                    "lead_id": lead_id,
                    "organization_id": organization_id,
                    "type_event": event_type,
                    "event_date": datetime.now().isoformat(),
                }
            )
            insert_id = str(result)

        return insert_id

    def delete_event(self, event_id):
        """
        Define a data de exclusão para o evento com o ID fornecido.

        :param event_id: O ID do evento a ser excluído.
        :return: True se a exclusão for bem-sucedida, False caso contrário.
        """
        res = self._repo.delete_event(event_id)
        return True

    def get_type_events(self, organization_id):
        filters = {
            "organization_id": organization_id,
            "deleted_date": {"$exists": False},
        }
        res = self._repo.get_by_filter(filters)
        final = []
        for i in res:
            final.append(i.type_event)

        return list(set(final))

    def list_all(self, organization_id):
        filters = {
            "organization_id": organization_id,
            "deleted_date": {"$exists": False},
        }
        res = self._repo.get_by_filter(filters)
        final = []
        for i in res:
            final.append(parse_entity(i.__dict__))

        return final

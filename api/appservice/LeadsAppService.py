from .Base.BaseAppService import BaseAppService
import http.cookies
from settings import EMAIL_FIELD, NAME_FIELD
from repository.LeadsRepository import LeadsRepository
import json
from flask import Flask, jsonify


class LeadsAppService(BaseAppService):
    def __init__(self):
        # Inicializa o serviço de aplicativo para leads, utilizando o repositório de leads.
        self._repo = LeadsRepository()

    def get_lead(self, email):
        """
        Obtém informações de um lead com base no endereço de e-mail.

        :param email: O endereço de e-mail do lead.
        :return: Dados do lead ou False se não encontrado.
        """
        result = self._repo.get_leads_by_filter({"email": email})
        if result:
            return json.loads(json.dumps(result[0].__dict__))
        return False

    def parse_lead(self, res):
        result = {}
        for name, value in res.items():
            if "_" not in name[0]:
                result[name] = value

        return result

    def get_my_leads(self, org_id):
        result = self._repo.get_leads_by_filter({"organization_id": org_id})
        if result:
            final = []
            for i in result:
                i = i.__dict__
                i["data_len"] = len(i["data"])
                i["data"] = {}
                final.append(self.parse_lead(i))
            return jsonify(final)

        return []

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
        if not email:
            return False, False

        result = self.get_lead(email)

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

        result_id = self._repo.insert_lead(
            {
                "email": email,
                "organization_id": body["organization_id"],
                "name": body.get("name", ""),
                "data": body.get("data", {}),
            }
        )
        result = self.get_lead(email)

        return result, True

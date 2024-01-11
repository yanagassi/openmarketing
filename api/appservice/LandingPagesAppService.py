from .Base.BaseAppService import BaseAppService
import http.cookies
from settings import EMAIL_FIELD, NAME_FIELD
from repository.LandingPageRepository import LandingPageRepository
import json
from bson.objectid import ObjectId
from helpers.comun import remove_special_characters


class LandingPagesAppService(BaseAppService):
    def __init__(self):
        # Inicializa o serviço de aplicativo para leads, utilizando o repositório de leads.
        self._repo = LandingPageRepository()

    def get_landing_pages(self, id):
        return self._repo.get_by_id(id)

    def get_all_landing_pages(self, organization_id):
        res = self._repo.get_by_filter({"organization_id": ObjectId(organization_id)})
        return res

    def update_landing_page(self, id, body):
        body = self._repo._repository.convert_ids_to_objectid(body)
        body["organization_id"] = ObjectId(body["organization_id"])
        update = self._repo.update(id, body)
        return True

    def create_landing_page(self, body):
        return None

    @staticmethod
    def group_by_form_variables(lista_de_objetos):
        grupos = {}

        for objeto in lista_de_objetos:
            cod_label = objeto["cod_label"]
            id_do_objeto = objeto["id"]

            if cod_label in grupos:
                if id_do_objeto not in grupos[cod_label]:
                    grupos[cod_label].append(id_do_objeto)
            else:
                grupos[cod_label] = [id_do_objeto]

        return grupos

    def get_form_variables(self, organization_id):
        response = []

        lps = self.get_all_landing_pages(ObjectId(organization_id))
        for lp in lps:
            for i in lp.mobile["properties"]:
                for item in i["items"]:
                    if (
                        str(item["type"]).lower() == "form"
                        and "fields" in item["content"]
                    ):
                        for field in item["content"]["fields"]:
                            response.append(
                                {
                                    "label": field["label"],
                                    "cod_label": remove_special_characters(
                                        str(field["label"]).upper().replace(" ", "_")
                                    ),
                                    "type": field["type"],
                                    "id": field["id"],
                                }
                            )

            for i in lp.desktop["properties"]:
                for item in i["items"]:
                    if (
                        str(item["type"]).lower() == "form"
                        and "fields" in item["content"]
                    ):
                        for field in item["content"]["fields"]:
                            response.append(
                                {
                                    "label": field["label"],
                                    "cod_label": remove_special_characters(
                                        str(field["label"]).upper().replace(" ", "_")
                                    ),
                                    "type": field["type"],
                                    "id": field["id"],
                                }
                            )

        return LandingPagesAppService.group_by_form_variables(response)

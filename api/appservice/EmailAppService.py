from .Base.BaseAppService import BaseAppService
import http.cookies
from settings import EMAIL_FIELD, NAME_FIELD
from repository.EmailRepository import EmailRepository
import json
from bson.objectid import ObjectId
from helpers.comun import parse_entity


class EmailAppService(BaseAppService):
    def __init__(self):
        self._repo = EmailRepository()

    def list_all(self, organizationid):
        res = self._repo.get_by_filter({"organization_id": ObjectId(organizationid)})
        res = [parse_entity(i.__dict__) for i in res]
        return res

    def create_email(self, organization_id, name):
        res = self._repo.insert_email(
            {"organization_id": ObjectId(organization_id), "name": name, "html": ""}
        )

        return res

    def get_email(self, organization_id, id, email_data):
        res = self._repo.get_by_id(id)
        if res != None and str(res.organization_id) == organization_id:
            res = parse_entity(res.__dict__)

            res["exists_html"] = res["html"] != ""

            if str(email_data).lower() == "false":
                del res["html"]
                if "design" in res:
                    del res["design"]

            return res

        return False

    def delete(self, organization_id, id):
        res = self.get_email(id)
        if res != None and str(res.organization_id) == organization_id:
            self._repo.delete_email(id)
            return True
        return False

    def update_email(self, organization_id, id, body):
        if self.get_email(organization_id, id) == False:
            return False

        res = self._repo.update(id, body)
        return True

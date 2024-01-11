from .Base.BaseAppService import BaseAppService
import http.cookies
from settings import EMAIL_FIELD, NAME_FIELD
from repository.EmailRepository import EmailRepository
from appservice.SegmentsAppService import SegmentsAppService
from appservice.EmailDisparatorAppService import EmailDisparatorAppService
import json
from bson.objectid import ObjectId
from helpers.comun import parse_entity


class EmailAppService(BaseAppService):
    def __init__(self):
        self._repo = EmailRepository()
        self._segment_appservice = SegmentsAppService()

    def list_all(self, organizationid):
        res = self._repo.get_by_filter({"organization_id": ObjectId(organizationid)})
        res = [parse_entity(i.__dict__) for i in res]
        return res

    def create_email(self, organization_id, name):
        res = self._repo.insert_email(
            {"organization_id": ObjectId(organization_id), "name": name, "html": ""}
        )

        return res

    def get_email(self, organization_id, id, email_data=True):
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
        res = self.get_email(organization_id, id)
        if res != None:
            self._repo.delete_email(id)
            return True
        return False

    def update_email(self, organization_id, id, body):
        if self.get_email(organization_id, id) == False:
            return False

        res = self._repo.update(id, body)
        return True

    def send_email(self, organization_id, body):
        segment = self._segment_appservice.get_segment_by_id(
            organization_id, body["from"]
        )

        leads_of_segment = self._segment_appservice.run(
            organization_id, segment["form"][0], segment["values"]
        )

        email = self.get_email(organization_id, body["id"])
        email_cursor = EmailDisparatorAppService(organization_id, email)

        result = []

        for i in leads_of_segment:
            email_res = email_cursor.send_email(i)
            result.append(email_res)

        return result

    def list_all_variables(self, organization_id):
        return EmailDisparatorAppService(organization_id).get_variables()

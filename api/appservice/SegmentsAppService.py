from .Base.BaseAppService import BaseAppService
from appservice.LeadsAppService import LeadsAppService
from segment_rules.register.RuleRegister import RuleRegister
from repository.SegmentsRepository import SegmentsRepository
from helpers.comun import parse_entity


class SegmentsAppService(BaseAppService):
    def __init__(self):
        self._leads_appservice = LeadsAppService()
        self._rule_register = RuleRegister()
        self._repo = SegmentsRepository()

    def list_rules(self, organization_id):
        return self._rule_register.get_rules_registers(organization_id, True)

    def run(self, organization_id, rule_type, values={}):
        leads = self._leads_appservice.get_leads_filter(
            organization_id, remove_data=False, events=True
        )
        rules = self._rule_register.get_rule(rule_type["type"])
        class_instace = rules["class"]()
        rest = []
        for lead in leads:
            rest.append(class_instace.run(lead, values))

        return rest

    @staticmethod
    def parse_segment(res):
        res = parse_entity(res)
        if "organization_id" in res:
            res["organization_id"] = str(res["organization_id"])
        return res

    def get_segments(self, organization_id, return_deleted=False):
        res = self._repo.get_segments_by_filter(
            {
                "organization_id": organization_id,
                "deleted_date": {"$exists": return_deleted},
            }
        )
        res = [self.parse_segment(i.__dict__) for i in list(res)]
        return res

    def teste_segments(self, organization_id, forms=[], values={}):
        result = []
        for form in forms:
            res = self.run(organization_id, form, values)
            result.append(res)

        return result

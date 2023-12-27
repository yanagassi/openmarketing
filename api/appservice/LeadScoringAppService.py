from repository.LeadScoringPerfilRepository import LeadScoringPerfilRepository
from repository.LeadScoringInteresseRepository import LeadScoringInteresseRepository

from .Base.BaseAppService import BaseAppService
from helpers.comun import parse_entity


class LeadScoringAppService(BaseAppService):
    def __init__(self):
        # Inicializa o serviço de aplicativo para leads, utilizando o repositório de leads.
        self._repo = LeadScoringPerfilRepository()
        self._repo_interesse = LeadScoringInteresseRepository()

    def calcule_perfil(self, lead, rules):
        return 0

    def calcule_interesse(self, lead, rules):
        lead_events = {event["type_event"] for event in lead.get("events", [])}
        total_pts = 0

        for rule in rules:
            pts = int(rule.get("pts", 0))
            rule_events = {event["eventId"] for event in rule.get("events", [])}

            if rule_events.intersection(lead_events):
                total_pts += pts

        return total_pts

    def save_perfil(self, body):
        if "id" in body and body != "":
            res = self._repo.get_by_id(body["id"])
            if res == False:
                return False

            self._repo.update(body["id"], body)
            return True
        else:
            return self._repo.insert_ld_scoring_perfil(body)

    def list_all(self, organization_id):
        res = self._repo.get_by_filter({"organization_id": organization_id})
        da = []
        for i in res:
            da.append(parse_entity(i.__dict__))
        return da

    def save_interesse(self, body):
        if "id" in body and body != "":
            res = self._repo_interesse.get_by_id(body["id"])
            if res == False:
                return False

            self._repo_interesse.update(body["id"], body)
            return True
        else:
            return self._repo_interesse.insert_ld_scoring_perfil(body)

    def list_all_interesse(self, organization_id):
        res = self._repo_interesse.get_by_filter({"organization_id": organization_id})
        da = []
        for i in res:
            da.append(parse_entity(i.__dict__))
        return da

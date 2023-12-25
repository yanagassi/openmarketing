from repository.LeadScoringPerfilRepository import LeadScoringPerfilRepository
from .Base.BaseAppService import BaseAppService
from helpers.comun import parse_entity


class LeadScoringAppService(BaseAppService):
    def __init__(self):
        # Inicializa o serviço de aplicativo para leads, utilizando o repositório de leads.
        self._repo = LeadScoringPerfilRepository()

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

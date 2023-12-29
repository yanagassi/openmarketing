from repository.LeadScoringPerfilRepository import LeadScoringPerfilRepository
from repository.LeadScoringInteresseRepository import LeadScoringInteresseRepository
from .Base.BaseAppService import BaseAppService
from helpers.comun import parse_entity


class LeadScoringAppService(BaseAppService):
    """
    Serviço de Aplicativo para Lead Scoring.
    """

    def __init__(self):
        """
        Inicializa o serviço de aplicativo para leads, utilizando os repositórios de perfil e interesse.
        """
        self._repo = LeadScoringPerfilRepository()
        self._repo_interesse = LeadScoringInteresseRepository()

    def calcule_perfil(self, lead, rules):
        """
        Calcula o score do perfil com base nas regras fornecidas.

        Parameters:
        - lead (dict): Dados do lead.
        - rules (list): Lista de regras para o cálculo do perfil.

        Returns:
        - float: Média ponderada do score do perfil.
        """
        score = []
        for i in rules:
            if i["name"] in lead["data"]:
                if i["operation"] == "exato":
                    for term in i["terms"]:
                        if term["name"] == lead["data"][i["name"]]:
                            score.append({"rate": term["rate"], "peso": i["peso"]})

                elif i["operation"] == "contem":
                    for term in i["terms"]:
                        if term["name"] in lead["data"][i["name"]]:
                            score.append({"rate": term["rate"], "peso": i["peso"]})

        if not score:
            return 0

        # Calcula a média ponderada
        weighted_sum = sum(item["rate"] * item["peso"] for item in score)
        total_peso = sum(item["peso"] for item in score)
        weighted_average = weighted_sum / total_peso

        return weighted_average

    def calcule_interesse(self, lead, rules):
        """
        Calcula o score de interesse com base nas regras fornecidas.

        Parameters:
        - lead (dict): Dados do lead.
        - rules (list): Lista de regras para o cálculo do interesse.

        Returns:
        - int: Pontuação total de interesse.
        """
        lead_events = {event["type_event"] for event in lead.get("events", [])}
        total_pts = 0

        for rule in rules:
            pts = int(rule.get("pts", 0))
            rule_events = {event["eventId"] for event in rule.get("events", [])}

            if rule_events.intersection(lead_events):
                total_pts += pts

        return total_pts

    def get_especifico_campo_formulario(
        self, organization_id, data={}, for_front_end=False
    ):
        """
        Obtém um campo específico do formulário.

        Parameters:
        - organization_id (int): ID da organização.
        - data (dict): Dados do formulário.
        - for_front_end (bool): Indica se os dados são para o front-end.

        Returns:
        - dict: Dados do campo específico do formulário.
        """
        perfis = self.list_all(organization_id)

        for perf in perfis:
            if perf["id"] in list(data.keys()):
                data[str(perf["name"])] = data[perf["id"]]
                if for_front_end:
                    del data[perf["id"]]
        return data

    def save_perfil(self, body):
        """
        Salva ou atualiza um perfil.

        Parameters:
        - body (dict): Dados do perfil.

        Returns:
        - bool: True se a operação for bem-sucedida, False caso contrário.
        """
        if "id" in body and body != "":
            res = self._repo.get_by_id(body["id"])
            if res == False:
                return False

            self._repo.update(body["id"], body)
            return True
        else:
            return self._repo.insert_ld_scoring_perfil(body)

    def list_all(self, organization_id):
        """
        Lista todos os perfis.

        Parameters:
        - organization_id (int): ID da organização.

        Returns:
        - list: Lista de perfis.
        """
        res = self._repo.get_by_filter({"organization_id": organization_id})
        da = [parse_entity(i.__dict__) for i in res]
        return da

    def save_interesse(self, body):
        """
        Salva ou atualiza um interesse.

        Parameters:
        - body (dict): Dados do interesse.

        Returns:
        - bool: True se a operação for bem-sucedida, False caso contrário.
        """
        if "id" in body and body != "":
            res = self._repo_interesse.get_by_id(body["id"])
            if res == False:
                return False

            self._repo_interesse.update(body["id"], body)
            return True
        else:
            return self._repo_interesse.insert_ld_scoring_perfil(body)

    def list_all_interesse(self, organization_id):
        """
        Lista todos os interesses.

        Parameters:
        - organization_id (int): ID da organização.

        Returns:
        - list: Lista de interesses.
        """
        res = self._repo_interesse.get_by_filter({"organization_id": organization_id})
        da = [parse_entity(i.__dict__) for i in res]
        return da

from .Base.BaseAppService import BaseAppService
from appservice.LeadsAppService import LeadsAppService
from segment_rules.register.RuleRegister import RuleRegister
from repository.SegmentsRepository import SegmentsRepository
from helpers.comun import parse_entity


class SegmentsAppService(BaseAppService):
    """
    Serviço de Aplicação para Segmentos
    """

    def __init__(self):
        """
        Inicializa instâncias de outros serviços e repositórios necessários.
        """
        self._leads_appservice = LeadsAppService()
        self._rule_register = RuleRegister()
        self._repo = SegmentsRepository()

    def list_rules(self, organization_id):
        """
        Lista as regras disponíveis para um determinado ID de organização.

        Args:
            organization_id (str): ID da organização.

        Returns:
            list: Lista de regras disponíveis.
        """
        return self._rule_register.get_rules_registers(organization_id, True)

    def run(self, organization_id, rule_type, values={}):
        """
        Executa as regras em leads específicos com base em um tipo de regra fornecido.

        Args:
            organization_id (str): ID da organização.
            rule_type (dict): Tipo de regra a ser executado.
            values (dict): Valores para aplicar nas regras.

        Returns:
            list: Lista de leads que satisfazem as regras.
        """
        leads = self._leads_appservice.get_leads_filter(
            organization_id, remove_data=False, events=True
        )
        rules = self._rule_register.get_rule(rule_type["type"])
        class_instance = rules["class"]()
        result = []
        for lead in leads:
            if class_instance.run(lead, values):
                lead["events"] = []
                result.append(lead)

        return result

    @staticmethod
    def parse_segment(res):
        """
        Analisa e converte uma entidade de segmento.

        Args:
            res (dict): Dicionário representando uma entidade de segmento.

        Returns:
            dict: Dicionário convertido da entidade de segmento.
        """
        res = parse_entity(res)
        if "organization_id" in res:
            res["organization_id"] = str(res["organization_id"])
        return res

    def get_segments(self, organization_id, return_deleted=False):
        """
        Obtém os segmentos com base no ID da organização e na opção de incluir deletados.

        Args:
            organization_id (str): ID da organização.
            return_deleted (bool): Flag para incluir segmentos deletados.

        Returns:
            list: Lista de segmentos.
        """
        res = self._repo.get_segments_by_filter(
            {
                "organization_id": organization_id,
                "deleted_date": {"$exists": return_deleted},
            }
        )
        res = [self.parse_segment(i.__dict__) for i in list(res)]
        return res

    def get_segment_by_id(self, organization_id, id_seg):
        res = self._repo.get_segment_by_id(id_seg)

        return self.parse_segment(res.__dict__)

    def teste_segments(self, organization_id, forms=[], values={}):
        """
        Testa os segmentos com base nas regras fornecidas.

        Args:
            organization_id (str): ID da organização.
            forms (list): Lista de tipos de regras.
            values (dict): Valores para aplicar nas regras.

        Returns:
            list: Lista de resultados de teste.
        """
        result = []
        for form in forms:
            res = self.run(organization_id, form, values)
            result.append(res)

        flattened_array = [item for sublist in result for item in sublist]

        unique_ids = set()
        unique_results = []

        for item in flattened_array:
            if "id" in item and item["id"] not in unique_ids:
                unique_ids.add(item["id"])
                unique_results.append(item)

        return unique_results

    def save_segment(self, organization_id, ids, form, values):
        return self._repo.update_segment(ids, {"form": form, "values": values})

    def create_new_segment(self, organization_id, name):
        return self._repo.insert_segment(
            {"organization_id": organization_id, "name": name}
        )

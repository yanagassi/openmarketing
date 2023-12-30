from segment_rules.base_rule.BaseRule import BaseRule
from constants.filed_rule_types import DATE_OPTIONS, DATE_OPTIONS_TYPES
from helpers.comun import hash_gen_seed
from datetime import datetime

FIELD_ID = hash_gen_seed("FIELD_ID")
FIELD_OPTIONS = ["tags", "created_at"]
TYPE_ID = hash_gen_seed("TYPE_ID")
DATE_FIELD_TYPE = hash_gen_seed("DATE_FIELD_TYPE")
DATE_OPERTAION_FIELD = hash_gen_seed("DATE_OPERTAION_FIELD")


class LeadDataRule(BaseRule):
    def run(self, lead_data, values={}):
        if FIELD_ID in values and values[FIELD_ID] == FIELD_OPTIONS[0]:
            return self.validate_tag(lead_data, values)

        elif DATE_FIELD_TYPE in values and (
            values[FIELD_ID] == FIELD_OPTIONS[1] or values[FIELD_ID] == FIELD_OPTIONS[2]
        ):
            return self.validate_date(lead_data, values)

        return False

    def validate_tag(self, lead_data, values):
        if TYPE_ID in values and "tags" in lead_data:
            return values[TYPE_ID] in lead_data["tags"]

        return False

    def validate_date(self, lead_data, values):
        try:
            value_date = lead_data[values[FIELD_ID]].split("T")[0]
            date_parsed = values[DATE_FIELD_TYPE]
            operation = DATE_OPTIONS_TYPES[values[DATE_OPERTAION_FIELD]]

            _loc = {"find": False}
            imports = "from datetime import datetime"

            # Ele transforma o texto em codigo e executa uma validação
            # Salvando as respostas que ele rodou na variavel _loc.

            exec(
                f"{imports}\nfind = datetime.strptime('{value_date}', '%Y-%m-%d') {operation} datetime.strptime('{date_parsed}', '%Y-%m-%d')",
                locals(),
                _loc,
            )

            return _loc["find"]
        except Exception as e:
            print(str(e))
            return False

    @staticmethod
    def params(self, lead_data):
        return (
            [
                {
                    "id": FIELD_ID,
                    "name": "Campo",
                    "type": "select",
                    "options": FIELD_OPTIONS,
                },
                {
                    "id": TYPE_ID,
                    "name": "Tipo de Envento",
                    "type": "text",
                    "restrict": [
                        {
                            "value": FIELD_OPTIONS[0],
                            "id": FIELD_ID,
                        }
                    ],
                },
                {
                    "id": DATE_OPERTAION_FIELD,
                    "name": "Operação",
                    "type": "select",
                    "options": DATE_OPTIONS,
                    "restrict": [
                        {
                            "value": FIELD_OPTIONS[1],
                            "id": FIELD_ID,
                        }
                    ],
                },
                {
                    "id": DATE_FIELD_TYPE,
                    "name": "Data",
                    "type": "date",
                    "restrict": [
                        {
                            "value": FIELD_OPTIONS[1],
                            "id": FIELD_ID,
                        }
                    ],
                },
            ],
        )

from segment_rules.base_rule.BaseRule import BaseRule

FIELD_ID = "d41d8cd98f00b204e9800998ecf8427e"
FIELD_OPTIONS = ["tags", "created_at", "updated_at"]

TYPE_ID = "a8813615737bd1f2009692a74ea57afb"


class LeadDataRule(BaseRule):
    def run(self, lead_data, values={}):
        if FIELD_ID in values and values[FIELD_ID] == FIELD_OPTIONS[0]:
            return self.validate_tag(lead_data, values)
        return False

    def validate_tag(self, lead_data, values):
        if TYPE_ID in values and "tags" in lead_data:
            return values[TYPE_ID] in lead_data["tags"]

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
            ],
        )

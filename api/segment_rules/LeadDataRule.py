from segment_rules.base_rule.BaseRule import BaseRule


class LeadDataRule(BaseRule):
    def run(self, lead_data):
        result = True  # Replace with your logic
        return result

    @staticmethod
    def params(self, lead_data):
        return (
            [
                {
                    "id": "HASH_ALEATORIO_1",
                    "name": "ssss",
                    "type": "select",
                    "options": ["1", "2"],
                },
            ],
        )

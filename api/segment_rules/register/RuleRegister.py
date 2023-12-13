from segment_rules.ConversionRule import ConversionRule
from segment_rules.LeadDataRule import LeadDataRule


class RuleRegister:
    REGISTER_RULES = {
        "ConversionRule": {
            "group": "Conversão",
            "class": ConversionRule,
            "filters": ConversionRule.params,
        },
        "LeadDataRule": {
            "group": "Dados do Lead",
            "class": LeadDataRule,
            "filters": LeadDataRule.params,
        },
    }

    def get_rule(self, rule_type):
        return self.REGISTER_RULES[rule_type]

    def get_rules_registers(self, organization_id, no_class=False):
        result = []
        for rule_name, rule_info in self.REGISTER_RULES.items():
            rule_display_name = rule_info["group"]
            rule_class = rule_info["class"]

            rule_params = rule_info["filters"]
            result.append(
                {
                    "group": rule_display_name,
                    "class": rule_class.__name__,
                    "filters": rule_params(
                        rule_class(), {"organization_id": organization_id}
                    )[0],
                }
            )

        return result

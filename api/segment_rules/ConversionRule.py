from segment_rules.base_rule.BaseRule import BaseRule

from appservice.EventsAppService import EventsAppService
from constants.event_type import OPPORTUNITY

CONVERT_FIELD_ID = "8350e5a3e24c153df2275c9f80692773"
CONVERT_TYPE_ID = "d41d8cd98f00b204e9800998ecf8427e"

CONVERT_FIELD_OPTIONS = ["Converteu", "Não Converteu"]


class ConversionRule(BaseRule):
    def __init__(self):
        self._appservice_events = EventsAppService()

    def run(self, lead_data, values={}):
        form = self.params(lead_data)[0]
        response = [
            self.verify_convert(form[0], lead_data, values),
            self.verify_form_cov(form[1], lead_data, values),
        ]
        result = all(response)
        return result

    def verify_form_cov(self, form, lead_data, values):
        actual_value = values.get(CONVERT_FIELD_ID, "___ERRO___")
        for i in lead_data.get("events", []):
            if (
                i.type_event == values[CONVERT_TYPE_ID]
                and actual_value == CONVERT_FIELD_OPTIONS[0]
            ):
                return True
            if (
                i.type_event == values[CONVERT_TYPE_ID]
                and actual_value == CONVERT_FIELD_OPTIONS[1]
            ):
                return False
        return False

    def verify_convert(self, form, lead_data, values):
        for i in lead_data.get("events", []):
            if i.type_event == values[CONVERT_TYPE_ID]:
                return True
            if i.type_event == values[CONVERT_TYPE_ID]:
                return False
        return False

    def params(self, lead_data):
        events_types = self._appservice_events.get_type_events(
            lead_data["organization_id"]
        )
        return (
            [
                {
                    "id": CONVERT_FIELD_ID,
                    "name": "Conversão",
                    "type": "select",
                    "options": CONVERT_FIELD_OPTIONS,
                },
                {
                    "id": CONVERT_TYPE_ID,
                    "name": "Tipo de Envento",
                    "type": "select",
                    "options": events_types,
                    "restrict": [
                        {
                            "value": CONVERT_FIELD_OPTIONS,
                            "id": CONVERT_FIELD_ID,
                        }
                    ],
                },
            ],
        )

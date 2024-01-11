from settings import EMAIL_FIELD, NAME_FIELD


class SystemVariablesAppService:
    def list_form_types(self):
        return {
            "operations": [
                EMAIL_FIELD,
                NAME_FIELD,
                "text",
                "checkbox",
                "date",
                "number",
                "password",
                "radio",
                "time",
            ],
        }

    def list_form_types_private(self):
        return [
            EMAIL_FIELD,
            NAME_FIELD,
        ]

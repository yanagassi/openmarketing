from settings import DEFAULT_EVENT
from datetime import datetime


class Email:
    def __init__(self, organization_id="", name="", html="", id=0):
        self._organization_id = organization_id
        self._id = id
        self._html = html
        self._name = name

    def get_jwt_safe_data(self):
        return {
            "_id": self._id,
            "organization_id": self._organization_id,
            "html": self._html,
            "name": self._name,
        }

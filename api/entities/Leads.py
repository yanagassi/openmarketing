from settings import DEFAULT_EVENT
from datetime import datetime


class Leads:
    def __init__(
        self, organization_id="", name="", email="", lead_id="", data={}, notes="", id=0
    ):
        self._email = email
        self._organization_id = organization_id
        self._name = name
        self._data = data
        self._id = id
        self._lead_id = lead_id
        self._notes = notes

    def get_jwt_safe_data(self):
        return {
            "_id": self._id,
            "email": self._email,
            "lead_id": self._lead_id,
            "name": self._name,
            "organization_id": self._organization_id,
            "data": self._data,
            "notes": self._notes,
        }

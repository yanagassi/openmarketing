from settings import DEFAULT_EVENT
from datetime import datetime


class Segments:
    def __init__(self, organization_id="", name="", data={}, id=0):
        self._organization_id = organization_id
        self._name = name
        self._data = data
        self._id = id

    def get_jwt_safe_data(self):
        return {
            "_id": self._id,
            "name": self._name,
            "organization_id": self._organization_id,
            "data": self._data,
        }

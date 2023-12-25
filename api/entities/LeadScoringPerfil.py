from settings import DEFAULT_EVENT
from datetime import datetime


class LeadScoringPerfil:
    def __init__(self, organization_id="", id=0):
        self._organization_id = organization_id
        self._id = id

    def get_jwt_safe_data(self):
        return {
            "_id": self._id,
            "organization_id": self._organization_id,
        }

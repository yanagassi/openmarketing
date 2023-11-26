from settings import DEFAULT_EVENT
from datetime import datetime


class LandingPages:
    def __init__(
        self,
        organization_id="",
        title="",
        event={},
        mobile={},
        desktop={},
        updated_data="",
        id=0,
    ):
        self._id = id
        self._organization_id = organization_id
        self._desktop = desktop
        self._mobile = mobile
        self._event = event
        self._title = title
        self._updated_data = updated_data

    def get_jwt_safe_data(self):
        return {
            "_id": str(self._id),
            "organization_id": str(self._organization_id),
            "title": self._title,
            "event": self._event,
            "mobile": self._mobile,
            "desktop": self._desktop,
        }

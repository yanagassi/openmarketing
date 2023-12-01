from settings import DEFAULT_EVENT
from datetime import datetime


class Events:
    def __init__(
        self,
        organization_id="",
        email="",
        data={},
        cookies=[],
        href="",
        type_event=DEFAULT_EVENT,
        event_date=datetime.now(),
        deleted_date=False,
        id=0,
    ):
        self._email = email
        self._cookies = cookies
        self._data = data
        self._id = id
        self._type_event = type_event
        self._event_date = event_date
        self._href = href
        self._organization_id = organization_id
        self._deleted_date = deleted_date

    def get_jwt_safe_data(self):
        return {
            "_id": self._id,
            "cookies": self._cookies,
            "email": self._email,
            "type_event": self._type_event,
            "data": self._data,
            "href": self._href,
            "event_date": self._event_date,
            "organization_id": self._organization_id,
            "deleted_date": self._deleted_date,
        }

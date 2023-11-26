from entities.CollectionsRegister import CollectionsRegister
from .Base.BaseRepository import BaseRepository

from bson.objectid import ObjectId


class LandingPageRepository:
    def __init__(self):
        self._repository = BaseRepository()

    def insert_event(self, event_data):
        return self._repository.insert(CollectionsRegister.LANDINGPAGES[1], event_data)

    def get_by_filter(self, filter={}):
        return self._repository.get_all(CollectionsRegister.LANDINGPAGES[1], filter)

    def get_by_id(self, event_id):
        return self._repository.get_one(
            CollectionsRegister.LANDINGPAGES[1], {"_id": ObjectId(event_id)}
        )

    def update(self, event_id, updated_data):
        return self._repository.update_by_id(
            CollectionsRegister.LANDINGPAGES[1], event_id, updated_data
        )

    def delete_event(self, event_id):
        return self._repository.delete(CollectionsRegister.LANDINGPAGES[1], event_id)

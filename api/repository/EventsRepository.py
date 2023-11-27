from entities.CollectionsRegister import CollectionsRegister
from .Base.BaseRepository import BaseRepository
from bson.objectid import ObjectId


class EventsRepository:
    def __init__(self):
        self._repository = BaseRepository()

    def insert_event(self, event_data):
        return self._repository.insert(CollectionsRegister.EVENTS[1], event_data)

    def get_by_filter(self, filter={}):
        return self._repository.get_all(CollectionsRegister.EVENTS[1], filter)

    def get_event_by_id(self, event_id):
        return self._repository.get_one(
            CollectionsRegister.EVENTS[1], {"_id": ObjectId(event_id)}
        )

    def update_event(self, event_id, updated_at):
        return self._repository.update_by_id(
            CollectionsRegister.EVENTS[1], {"_id": event_id}, updated_at
        )

    def delete_event(self, event_id):
        return self._repository.delete(CollectionsRegister.EVENTS[1], {"_id": event_id})

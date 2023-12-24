from entities.CollectionsRegister import CollectionsRegister
from .Base.BaseRepository import BaseRepository
from bson.objectid import ObjectId


class LeadsRepository:
    def __init__(self):
        self._repository = BaseRepository()

    def insert_lead(self, lead_data):
        return self._repository.insert(CollectionsRegister.LEADS[1], lead_data)

    def get_leads_by_filter(self, filter={}):
        return self._repository.get_all(CollectionsRegister.LEADS[1], filter)

    def get_lead_by_id(self, lead_id):
        return self._repository.get_one(
            CollectionsRegister.LEADS[1], {"_id": ObjectId(str(lead_id))}
        )

    def update_lead(self, lead_id, updated_at):
        return self._repository.update_by_id(
            CollectionsRegister.LEADS[1], lead_id, updated_at
        )

    def delete_lead(self, lead_id):
        return self._repository.delete(CollectionsRegister.LEADS[1], lead_id)

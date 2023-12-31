from entities.CollectionsRegister import CollectionsRegister
from .Base.BaseRepository import BaseRepository

from bson.objectid import ObjectId


class EmailRepository:
    def __init__(self):
        self._repository = BaseRepository()

    def insert_email(self, email_data):
        return self._repository.insert(CollectionsRegister.EMAIL[1], email_data)

    def get_by_filter(self, filter={}, excluded=False):
        if "deleted_date" not in filter:
            filter["deleted_date"] = {"$exists": excluded}

        return self._repository.get_all(CollectionsRegister.EMAIL[1], filter)

    def get_by_id(self, email_id):
        return self._repository.get_one(
            CollectionsRegister.EMAIL[1], {"_id": ObjectId(email_id)}
        )

    def update(self, email_id, updated_at):
        return self._repository.update_by_id(
            CollectionsRegister.EMAIL[1], email_id, updated_at
        )

    def delete_email(self, email_id):
        return self._repository.delete(CollectionsRegister.EMAIL[1], email_id)

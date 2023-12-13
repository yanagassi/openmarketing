from entities.CollectionsRegister import CollectionsRegister
from .Base.BaseRepository import BaseRepository
from bson.objectid import ObjectId


class SegmentsRepository:
    def __init__(self):
        self._repository = BaseRepository()

    def insert_segment(self, segment_data):
        return self._repository.insert(CollectionsRegister.SEGMENTS[1], segment_data)

    def get_segments_by_filter(self, filter={}):
        if "organization_id" in filter:
            filter["organization_id"] = ObjectId(str(filter["organization_id"]))
        return self._repository.get_all(CollectionsRegister.SEGMENTS[1], filter)

    def get_segment_by_id(self, segment_id):
        return self._repository.get_one(
            CollectionsRegister.SEGMENTS[1], {"_id": ObjectId(str(segment_id))}
        )

    def update_segment(self, segment_id, updated_at):
        return self._repository.update_by_id(
            CollectionsRegister.SEGMENTS[1], segment_id, updated_at
        )

    def delete_segment(self, segment_id):
        return self._repository.delete(CollectionsRegister.SEGMENTS[1], segment_id)

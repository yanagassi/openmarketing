from entities.CollectionsRegister import CollectionsRegister
from .Base.BaseRepository import BaseRepository

from bson.objectid import ObjectId


class LeadScoringPerfilRepository:
    def __init__(self):
        self._repository = BaseRepository()

    def insert_ld_scoring_perfil(self, ld_scoring_perfil_data):
        return self._repository.insert(
            CollectionsRegister.LEADSCORINGPERFIL[1], ld_scoring_perfil_data
        )

    def get_by_filter(self, filter={}):
        return self._repository.get_all(
            CollectionsRegister.LEADSCORINGPERFIL[1], filter
        )

    def get_by_id(self, ld_scoring_perfil_id):
        return self._repository.get_one(
            CollectionsRegister.LEADSCORINGPERFIL[1],
            {"_id": ObjectId(ld_scoring_perfil_id)},
        )

    def update(self, ld_scoring_perfil_id, updated_at):
        return self._repository.update_by_id(
            CollectionsRegister.LEADSCORINGPERFIL[1], ld_scoring_perfil_id, updated_at
        )

    def delete_ld_scoring_perfil(self, ld_scoring_perfil_id):
        return self._repository.delete(
            CollectionsRegister.LEADSCORINGPERFIL[1], ld_scoring_perfil_id
        )

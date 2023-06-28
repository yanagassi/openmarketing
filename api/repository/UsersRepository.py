from entities.CollectionsRegister import CollectionsRegister

from .Base.BaseRepository import BaseRepository


class UsersRepository(): 
    def __init__(self):
        self._repository = BaseRepository()
        
    def get_all_users(self):
        return self._repository.get_all(CollectionsRegister.USERS[1])
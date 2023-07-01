from entities.CollectionsRegister import CollectionsRegister

from .Base.BaseRepository import BaseRepository


class UsersRepository(): 
    def __init__(self):
        self._repository = BaseRepository()
        
    def get_all_users(self):
        return self._repository.get_all(CollectionsRegister.USERS[1])
    
    def get_user_by_email(self, email):
        return self._repository.get_one(CollectionsRegister.USERS[1], {
            "email": email
        }) 
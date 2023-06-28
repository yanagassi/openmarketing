from repository.UsersRepository import UsersRepository

from .Base.BaseAppService import BaseAppService


class UsersAppService(BaseAppService):
    def __init__(self) :
        self._user_repository = UsersRepository()
        
    
    def get_all_users(self):
        result = self._user_repository.get_all_users()
        return self.class_to_json(result)
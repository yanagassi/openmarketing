from repository.UsersRepository import UsersRepository
import json
from hashlib import sha256
from .Base.BaseAppService import BaseAppService
import jwt
from settings import JWT_SECRETE
class UsersAppService(BaseAppService):
    def __init__(self) :
        self._user_repository = UsersRepository()
        
    def get_all_users(self):
        result = self._user_repository.get_all_users()
        return self.class_to_json(result)
    
    def login(self, email, password):
        result = self._user_repository.get_user_by_email(email)
        
        if(
            result == False or 
            result.password != sha256(password.encode('utf-8')).hexdigest()
        ):
            return False
        
        jwt_body = result.get_jwt_safe_data()
        
        token = jwt.encode(
            payload=jwt_body,
            key=JWT_SECRETE
        )
        return token
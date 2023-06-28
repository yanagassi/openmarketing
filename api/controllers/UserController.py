import json

from appservice.UsersAppService import UsersAppService
from flask_restful import Resource


class UserController(Resource):
    def __init__(self):
        self._appservice = UsersAppService()
        
    def get(self): 
        res = self._appservice.get_all_users()
        return res


    def post(self): 
        return {
            "message": "User created successfully"
        }


from appservice.UsersAppService import UsersAppService
from flask import request
from flask_restful import Resource
from helpers.comun import verify_json
from constants.messages import ERRO_LOGIN 
from middlewares.jwt_middleware import jwt_required

class UserController(Resource):
    def __init__(self):
        self._appservice = UsersAppService()
    
    @jwt_required
    def get(self): 
        res = self._appservice.get_all_users()
        return res

    def post(self): 
        body = request.get_json()
        if(
            verify_json(body, "email")      == False and
            verify_json(body, "password")   == False 
        ):
            return { "msg": ERRO_LOGIN }
        
        result = self._appservice.login(body["email"], body["password"])
        
        if(result == False):
            return { "msg": ERRO_LOGIN }
        
        return { "token" : result }
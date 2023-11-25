from appservice.UsersAppService import UsersAppService
from appservice.EventsAppService import EventsAppService
from flask import request
from flask_restful import Resource 
from middlewares.jwt_middleware import jwt_required

class LeadsController(Resource):
    def __init__(self):
        self._appservice = UsersAppService()
        self._events_appservice = EventsAppService()

    '''
        Movimentação de Lead (Criação e Atualização)
    ''' 
 
    def post(self):   
        body = request.get_json()
        if("Organizationid" not in request.headers):
            return "É necessário header `Organizationid` com o id de sua organização.", 401
        
        body["organization_id"] = request.headers["Organizationid"]
        
        insert_id = self._events_appservice.register_event(body)
        if(insert_id != None):
            body["id"] = insert_id
            
            return body, 200
        else:
            return {
                "msg": "Já existe na base, tente novamente em um segundo."
            }, 203

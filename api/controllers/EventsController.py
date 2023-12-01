from flask_restful import Resource
from helpers.comun import verify_json
from flask import jsonify
from constants.messages import ERRO_LOGIN
from middlewares.jwt_middleware import jwt_required
import json


from appservice.EventsAppService import EventsAppService


class EventsController(Resource):
    def __init__(self):
        self._appservice = EventsAppService()

    def delete_event(self, id_event):
        res = self._appservice.delete_event(id_event)
        return jsonify(res)

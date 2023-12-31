from flask_restful import Resource
from helpers.comun import verify_json
from flask import jsonify, request
from constants.messages import ERRO_LOGIN
from middlewares.jwt_middleware import jwt_required
import json


from appservice.EventsAppService import EventsAppService


class EventsController(Resource):
    def __init__(self):
        self._appservice = EventsAppService()

    @jwt_required
    def delete_event(self, id_event):
        res = self._appservice.delete_event(id_event)
        return jsonify(res)

    @jwt_required
    def list_event(self):
        organization_id = request.headers.get("Organizationid")
        res = self._appservice.get_type_events(organization_id)
        return jsonify(res)

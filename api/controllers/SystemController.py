from flask_restful import Resource
from helpers.comun import verify_json
from flask import jsonify, request
from constants.messages import ERRO_LOGIN
from middlewares.jwt_middleware import jwt_required
import json


from appservice.SystemVariablesAppService import SystemVariablesAppService


class SystemController(Resource):
    def __init__(self):
        self._appservice = SystemVariablesAppService()

    def list_form_types(self):
        res = self._appservice.list_form_types()
        return jsonify(res)

    def list_form_types_private(self):
        res = self._appservice.list_form_types_private()
        return jsonify(res)

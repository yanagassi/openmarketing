from flask_restful import Resource
from helpers.comun import verify_json
from flask import jsonify, request
from constants.messages import ERRO_LOGIN
from middlewares.jwt_middleware import jwt_required
import json

from appservice.EmailAppService import EmailAppService


class EmailController(Resource):
    def __init__(self):
        self._appservice = EmailAppService()

    @jwt_required
    def list_all(self):
        organization_id = request.headers.get("Organizationid")
        res = self._appservice.list_all(organization_id)
        return jsonify(res)

    @jwt_required
    def create(self):
        organization_id = request.headers.get("Organizationid")
        body = request.get_json()
        if "name" not in body:
            return False, 500

        res = self._appservice.create_email(organization_id, body["name"])
        return jsonify({"id": str(res)})

    @jwt_required
    def delete_email(self, id):
        organization_id = request.headers.get("Organizationid")
        res = self._appservice.delete(organization_id, id)
        if res:
            return jsonify(res)
        else:
            return False, 500

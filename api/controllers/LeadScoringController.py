from flask_restful import Resource
from helpers.comun import verify_json
from flask import jsonify, request
from constants.messages import ERRO_LOGIN
from middlewares.jwt_middleware import jwt_required
import json


from appservice.LeadScoringAppService import LeadScoringAppService


class LeadScoringController(Resource):
    def __init__(self):
        self._appservice = LeadScoringAppService()

    @jwt_required
    def create_perfil(self):
        body = request.get_json()
        body["organization_id"] = request.headers.get("Organizationid")
        if "id" in body:
            del body["id"]

        res = self._appservice.save_perfil(body)
        return jsonify({"id": str(res)})

    @jwt_required
    def update_perfil(self):
        body = request.get_json()
        body["organization_id"] = request.headers.get("Organizationid")
        res = self._appservice.save_perfil(body)
        return jsonify(res)

    @jwt_required
    def list_all_perfil(self):
        organization_id = request.headers.get("Organizationid")
        res = self._appservice.list_all(organization_id)
        return jsonify(res)

    @jwt_required
    def create_interesse(self):
        body = request.get_json()
        body["organization_id"] = request.headers.get("Organizationid")
        if "id" in body:
            del body["id"]

        res = self._appservice.save_interesse(body)
        return jsonify({"id": str(res)})

    @jwt_required
    def update_interesse(self):
        body = request.get_json()
        body["organization_id"] = request.headers.get("Organizationid")
        res = self._appservice.save_interesse(body)
        return jsonify(res)

    @jwt_required
    def list_all_interesse(self):
        organization_id = request.headers.get("Organizationid")
        res = self._appservice.list_all_interesse(organization_id)
        return jsonify(res)

from flask_restful import Resource
from helpers.comun import verify_json
from flask import jsonify, request
from constants.messages import ERRO_LOGIN
from middlewares.jwt_middleware import jwt_required
import json
import threading
from appservice.EmailAppService import EmailAppService
from datetime import datetime


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

    @jwt_required
    def get_email(self, id, email_data=True):
        organization_id = request.headers.get("Organizationid")
        res = self._appservice.get_email(organization_id, id, email_data)
        if res:
            return jsonify(res)
        else:
            return False, 500

    @jwt_required
    def update_by_id(self, id):
        organization_id = request.headers.get("Organizationid")
        body = request.get_json()

        res = self._appservice.update_email(organization_id, id, body)
        return jsonify(res)

    @jwt_required
    def send_email(self):
        organization_id = request.headers.get("Organizationid")
        body = request.get_json()

        if "id" not in body or "from" not in body:
            return False

        worker = threading.Thread(
            target=self._appservice.send_email, args=[organization_id, body]
        )
        worker.name = "EMAIL_SEND | %s | %s" % (body["id"], datetime.now())
        worker.daemon = True
        worker.start()

        return jsonify(True)

    @jwt_required
    def list_all_variables(self):
        organization_id = request.headers.get("Organizationid")
        return jsonify(self._appservice.list_all_variables(organization_id))

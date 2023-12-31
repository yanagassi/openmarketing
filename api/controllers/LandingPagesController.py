from appservice.LandingPagesAppService import LandingPagesAppService
from flask import Flask, jsonify
from flask import request

from flask_restful import Resource
from helpers.comun import verify_json
from constants.messages import ERRO_LOGIN
from middlewares.jwt_middleware import jwt_required
import json


class LandingPagesController(Resource):
    def __init__(self):
        self._appservice = LandingPagesAppService()

    @jwt_required
    def parse_lp(self, res):
        res = res.__dict__

        result = {"id": res["_id"]}
        for name, value in res.items():
            if "_" not in name[0]:
                result[name] = value

        result["organization_id"] = str(res["organization_id"])
        result["desktop"]["organization_id"] = result["organization_id"]
        result["mobile"]["organization_id"] = result["organization_id"]
        return result

    @jwt_required
    def get_by_id(self, id):
        res = self._appservice.get_landing_pages(id)
        result = self.parse_lp(res)
        return jsonify(result)

    @jwt_required
    def create_or_edit(self):
        body = request.get_json()
        body["organization_id"] = request.headers.get("Organizationid")
        if "id" in body:
            return {"res": self._appservice.update_landing_page(body["id"], body)}
        else:
            return self._appservice.create_landing_page(body)

    @jwt_required
    def get_all_lps(self):
        organization_id = request.headers.get("Organizationid")
        resposnse = self._appservice.get_all_landing_pages(organization_id)
        result = []

        # Para não sobrecarregar a request ;)
        for i in resposnse:
            i = self.parse_lp(i)
            i["mobile"] = {}
            i["desktop"] = {}
            i["organization_id"] = str(organization_id)
            result.append(i)

        return jsonify(result)

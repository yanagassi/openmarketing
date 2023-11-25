from appservice.LandingPagesAppService import LandingPagesAppService
from flask import Flask, jsonify
from flask_restful import Resource
from helpers.comun import verify_json
from constants.messages import ERRO_LOGIN
from middlewares.jwt_middleware import jwt_required
import json


class LandingPagesController(Resource):
    def __init__(self):
        self._appservice = LandingPagesAppService()

    @staticmethod
    def serialize(obj):
        """
        Método de classe estático para serializar objetos para JSON.
        """
        if hasattr(obj, "__dict__"):
            return obj.__dict__
        return str(obj)

    @jwt_required
    def get(self, id):
        res = self._appservice.get_landing_pages(id)
        res = json.loads(jsonify(json.dumps(res, default=self.serialize)).response[0])
        res = json.loads(str(res))

        result = {"id": res["_id"]}
        for name, value in res.items():
            if "_" not in name:
                result[name] = value

        result["desktop"]["organization_id"] = res["organization_id"]
        result["mobile"]["organization_id"] = res["organization_id"]

        return (
            result,
            200,
        )

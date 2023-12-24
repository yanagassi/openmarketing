from flask_restful import Resource
from helpers.comun import verify_json
from flask import jsonify
from constants.messages import ERRO_LOGIN
from middlewares.jwt_middleware import jwt_required
import json


from appservice.LeadScoringAppService import LeadScoringAppService


class LeadScoringAppService(Resource):
    def __init__(self):
        self._appservice = LeadScoringAppService()

    def save(self):
        res = self._appservice.save()
        return jsonify(res)

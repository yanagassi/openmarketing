from flask import request
from flask_restful import Resource
from middlewares.jwt_middleware import jwt_required

from appservice.UsersAppService import UsersAppService
from appservice.LeadsAppService import LeadsAppService
from appservice.EventsAppService import EventsAppService

from constants.messages import LEAD_EXISTS, ERRO_NO_ORG
from constants.event_type import CREATED


class LeadsController(Resource):
    def __init__(self):
        self._users_appservice = UsersAppService()
        self._events_appservice = EventsAppService()
        self._leads_appservice = LeadsAppService()

    def create_lead(self):
        body = request.get_json()
        organization_id = request.headers.get("Organizationid")

        if not organization_id:
            return ERRO_NO_ORG, 401

        body["organization_id"] = organization_id

        result_lead, inserted = self._leads_appservice.get_or_insert_update_lead(body)

        if result_lead and "_id" in result_lead:
            body["lead_id"] = result_lead["_id"]

        # Caso seja a primeira vez que o lead é criado, adiciona um evento de CREATED
        if inserted:
            temp_type = body.get("type", "")
            body["type"] = CREATED
            self._events_appservice.register_event(body)
            body["type"] = temp_type

        insert_id = self._events_appservice.register_event(body)

        if insert_id is not None:
            body["id"] = insert_id
            return body, 200
        else:
            return {"msg": LEAD_EXISTS}, 203

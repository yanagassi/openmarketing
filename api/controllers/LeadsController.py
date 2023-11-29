from flask import request
from flask_restful import Resource
from middlewares.jwt_middleware import jwt_required

from appservice.UsersAppService import UsersAppService
from appservice.LeadsAppService import LeadsAppService
from appservice.EventsAppService import EventsAppService

from constants.messages import LEAD_EXISTS, ERRO_NO_ORG
from constants.event_type import CREATED, ACCESS
from datetime import datetime, timedelta


class LeadsController(Resource):
    def __init__(self):
        self._users_appservice = UsersAppService()
        self._events_appservice = EventsAppService()
        self._leads_appservice = LeadsAppService()

    @jwt_required
    def get_leads(self):
        organization_id = request.headers.get("Organizationid")
        return self._leads_appservice.get_my_leads(organization_id)

    @jwt_required
    def get_lead_by_id(self, id):
        organization_id = request.headers.get("Organizationid")
        return self._leads_appservice.get_lead_by_id(id, organization_id)

    @jwt_required
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

    @jwt_required
    def get_dash_home(self):
        organization_id = request.headers.get("Organizationid")

        tam_event = self._events_appservice.get_events(organization_id, ACCESS)

        leads_len = self._leads_appservice.get_leads_filter(organization_id, {})

        return {
            "event_len": len(tam_event),
            "leads_len": len(leads_len),
            "opportunities_len": 0,
            "sales_len": 0,
        }

    @jwt_required
    def alter_lead(self, id):
        organization_id = request.headers.get("Organizationid")
        body = request.get_json()
        result = self._leads_appservice.alter_lead(body, id, organization_id)
        if result:
            return {"status": True}

        return {"status": False}

from flask import request, jsonify
from flask_restful import Resource
from middlewares.jwt_middleware import jwt_required

from appservice.SegmentsAppService import SegmentsAppService


class SegmentsController(Resource):
    def __init__(self):
        self._segments_appservice = SegmentsAppService()

    @jwt_required
    def run_segments(self):
        organization_id = request.headers.get("Organizationid")
        body = request.get_json()

        res = self._segments_appservice.run(organization_id, body["rule_type"])

        return res

    @jwt_required
    def get_segments(self):
        organization_id = request.headers.get("Organizationid")
        result = self._segments_appservice.get_segments(organization_id)
        return jsonify(result)

    @jwt_required
    def get_rules(self):
        organization_id = request.headers.get("Organizationid")
        result = self._segments_appservice.list_rules(organization_id)
        return jsonify(result)

    @jwt_required
    def test_run_segments(self):
        organization_id = request.headers.get("Organizationid")
        body = request.get_json()

        res = self._segments_appservice.teste_segments(
            organization_id, body.get("filters", []), body.get("values", {})
        )

        return jsonify(res)

    @jwt_required
    def save_segment(self):
        organization_id = request.headers.get("Organizationid")
        body = request.get_json()

        res = self._segments_appservice.save_segment(
            organization_id,
            body.get("id", ""),
            body.get("form", []),
            body.get("values", {}),
        )

        return jsonify(res)

    @jwt_required
    def get_segment(self, id_segment):
        organization_id = request.headers.get("Organizationid")
        res = self._segments_appservice.get_segment_by_id(organization_id, id_segment)

        return jsonify(res)

    @jwt_required
    def create_new_segment(self):
        organization_id = request.headers.get("Organizationid")
        body = request.get_json()

        res = self._segments_appservice.create_new_segment(
            organization_id, body.get("name", "")
        )

        return jsonify({"id": str(res)})

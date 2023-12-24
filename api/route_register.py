import yaml
from flask import Flask


class RouteRegister:
    def __init__(self, app):
        self.app = app

    def register_routes_from_yaml(self, file_path):
        with open(file_path, "r") as file:
            routes_data = yaml.safe_load(file)

        for route_data in routes_data:
            controller_module, controller_class_name = route_data["controller"].rsplit(
                ".", 1
            )
            controller_module = __import__(
                controller_module, fromlist=[controller_class_name]
            )
            controller_class = getattr(controller_module, controller_class_name)
            controller_instance = controller_class()

            for route_info in route_data["routes"]:
                self.app.add_url_rule(
                    route_info["route"],
                    view_func=getattr(controller_instance, route_info["endpoint"]),
                    methods=route_info.get("methods", ["GET"]),
                )

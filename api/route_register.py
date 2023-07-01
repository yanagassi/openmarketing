import yaml
from flask import current_app


class RouteRegister:
    def __init__(self, api):
        self.api = api

    def register_from_file(self, file_path):
        with open(file_path, "r") as file:
            routes = yaml.safe_load(file)

        for route in routes:
            controller_parts = route["controller"].split(".")
            controller_module = __import__(
                ".".join(controller_parts[:-1]), fromlist=[controller_parts[-1]]
            )
            controller_class = getattr(controller_module, controller_parts[-1])
            controller_instance = controller_class()

            for route_info in route["routes"]:
                self.api.add_resource(
                    controller_instance,
                    route_info["route"],
                    endpoint=route_info["endpoint"],
                    methods=route_info.get("methods", ["GET"]),
                )

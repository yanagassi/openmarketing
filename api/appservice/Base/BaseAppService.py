import array
import json


class BaseAppService:
    def class_to_dict(self, cls):
        return cls.__dict__

    def class_to_json(self, objeto):
        if type(objeto) == list:
            return json.loads(json.dumps(objeto, default=self.class_to_dict))
        else:
            return json.loads(json.dumps(objeto.__dict__))

    @staticmethod
    def serialize(obj):
        """
        Método de classe estático para serializar objetos para JSON.
        """
        if hasattr(obj, "__dict__"):
            return obj.__dict__
        return str(obj)

    @staticmethod
    def manual_serialize(res):
        result = {}
        for name, value in res.items():
            if "_id" == name:
                result["id"] = str(res["_id"])
            if "_" not in name[0]:
                result[name] = value

        return result

import json


def verify_json(jsonRes, field):
    try:
        if field in jsonRes:
            return True
        else:
            return False
    except ValueError:
        return False


def parse_entity(res):
    result = {}
    for name, value in res.items():
        if "_id" == name:
            result["id"] = str(res["_id"])
        if "organization_id" == name:
            result["organization_id"] = str(res["organization_id"])
        if "_" not in name[0]:
            result[name] = value

    return result

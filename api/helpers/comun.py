import json
from settings import RULES_SEED
import random
import hashlib


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

        if "_" not in name[0]:
            result[name] = value

        if "organization_id" == name:
            result["organization_id"] = str(res["organization_id"])

    return result


def hash_gen_seed(item_name):
    return str(hashlib.md5(f"{RULES_SEED}-{item_name}".encode("utf-8")).hexdigest())

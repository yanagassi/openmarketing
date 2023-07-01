import json

def verify_json(jsonRes, field):
    try: 
        if field in jsonRes:
            return True
        else:
            return False
    except ValueError:
        return False
from functools import wraps
from flask import request, jsonify
import jwt
from settings import JWT_SECRETE
from constants.messages import ERRO_AUTH, ERRO_AUTH_EXP

def jwt_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            token = auth_header.split()[1] if len(auth_header.split()) > 1 else None

        if not token:
            return {'message' : ERRO_AUTH}, 401

        try:
            decoded_token = jwt.decode(token, JWT_SECRETE, algorithms=['HS256']) 
        except jwt.ExpiredSignatureError:
            return { 'message' : ERRO_AUTH_EXP }, 401
        except jwt.InvalidTokenError:
            return { 'message' : ERRO_AUTH }, 401

        # return f(decoded_token, *args, **kwargs)
        return f(*args)

    return decorated

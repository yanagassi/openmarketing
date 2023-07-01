import os

from flask import Flask
from flask_restful import Api
from flask_swagger_ui import get_swaggerui_blueprint
from route_register import RouteRegister
from settings import JWT_SECRETE
from flask_cors import CORS

# Criar o aplicativo Flask
app = Flask(__name__)
cors = CORS(app)  # Configuração básica para permitir CORS em todas as rotas

# Configuração do Swagger
SWAGGER_URL = "/swagger"
API_URL = "/swagger.json"

swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        "app_name": "API Documentation"
    }
)

app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)
app.config['SECRET_KEY'] = JWT_SECRETE

api = Api(app)
route_register = RouteRegister(api)

route_register.register_from_file(os.path.join(os.path.dirname(os.path.abspath(__file__)), "routes.yaml"))

if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=5050)

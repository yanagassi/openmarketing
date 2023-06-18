from controller.default import DefaultController
from flask import Flask

# Cria uma instância do Flask
app = Flask(__name__)


@app.route("/")
def index():
    return DefaultController.index()


if __name__ == "__main__":
    app.run()

from flask import Blueprint
from flask_restful import Api

from .resources import CarItemResource, CarResource

bp = Blueprint("restapi", __name__, url_prefix="/v1")
api = Api(bp)


def init_app(app):
    api.add_resource(CarResource, "/car/")
    api.add_resource(CarItemResource, "/car/<car_id>")
    app.register_blueprint(bp)

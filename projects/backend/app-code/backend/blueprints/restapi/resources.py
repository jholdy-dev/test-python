from flask import abort, jsonify
from flask_restful import Resource

from backend.models import Car


class CarResource(Resource):
    def get(self):
        cars = Car.query.all() or abort(204)

        return jsonify(
            {"products": [product.to_dict() for product in cars]}
        )


class CarItemResource(Resource):
    def get(self, car_id):
        car = Car.query.filter_by(id=car_id).first() or abort(404)
        return jsonify(car.to_dict())

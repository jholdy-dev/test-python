from flask import abort, jsonify, request
from flask_restful import Resource

from backend.models import Car


class CarResource(Resource):
    def get(self):
        cars = Car.query.all() or abort(204)

        return jsonify(
            {"products": [car.to_dict() for car in cars]}
        )

    def post(self):
        print('AQUI')
        data = request.json
        print(data)
        car = Car(**data)
        print(car)
        car.save()
        return car.to_dict(), 201


class CarItemResource(Resource):
    def get(self, car_id):
        car = Car.query.filter_by(id=car_id).first() or abort(404)
        return car.to_dict()

    def put(self, car_id):
        data = request.json
        car = Car.query.filter_by(id=car_id).first() or abort(404)
        car.update(**data)
        return car.to_dict()

    def delete(self, car_id):
        car = Car.query.filter_by(id=car_id).first() or abort(404)
        car.delete()
        return car.to_dict()

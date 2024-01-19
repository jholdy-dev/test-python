from backend.ext.database import db
from sqlalchemy_serializer import SerializerMixin


class Car(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140))
    brand = db.Column(db.String(140))
    model = db.Column(db.String(140))
    photo = db.Column(db.String(140))


class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(140))
    password = db.Column(db.String(512))

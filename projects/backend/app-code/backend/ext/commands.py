import click
from backend.ext.database import db
from backend.ext.auth import create_user
from backend.models import Car, User


def createdb():
    db.create_all()


def dropdb():
    db.drop_all()


def populatedb():
    data = [
        Car(name="Fusca", brand="Volkswagen", model="Fusca",
            photo="https://www.carroantigo.com/portugues/volkswagen/fusca1300_1967_1.jpg"),
        Car(name="Gol", brand="Volkswagen", model="Gol",
            photo="https://www.carroantigo.com/portugues/volkswagen/gol_1980_1.jpg"),
        Car(name="Uno", brand="Fiat", model="Uno",
            photo="https://www.carroantigo.com/portugues/fiat/uno_1984_1.jpg"),
        Car(name="147", brand="Fiat", model="147",
            photo="https://www.carroantigo.com/portugues/fiat/147_1976_1.jpg"),
        Car(name="Corcel", brand="Ford", model="Corcel",
            photo="https://www.carroantigo.com/portugues/ford/corcel_1970_1.jpg"),
        Car(name="Opala", brand="Chevrolet", model="Opala",
            photo="https://www.carroantigo.com/portugues/chevrolet/opala_1970_1.jpg"),
    ]
    db.session.bulk_save_objects(data)
    db.session.commit()

    user = User(username="admin", password="admin")

    db.session.add(user)
    db.session.commit()


def init_app(app):
    for command in [createdb, dropdb, populatedb]:
        app.cli.add_command(app.cli.command()(command))

    @app.cli.command()
    @click.option('--username', '-u')
    @click.option('--password', '-p')
    def add_user(username, password):
        return create_user(username, password)

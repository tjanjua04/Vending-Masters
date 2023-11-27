from contextlib import contextmanager

import flask
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy.session import Session

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///mydb.db'
db = SQLAlchemy(app)
CORS(app)


@contextmanager
def db_session():
    with app.app_context():
        s = Session(db)
        s.expire_on_commit = False
        try:
            yield s
            s.commit()
        except:
            s.rollback()
            raise
        finally:
            s.close()


class InventoryModel(db.Model):
    __tablename__ = "inventory"

    inventory_id = db.Column(db.Integer, primary_key=True)
    capacity = db.Column("capacity", db.Integer)
    items = db.relationship("ItemModel", back_populates="inventory")
    transactions_list = db.relationship("TransactionsListModel", back_populates="inventory")


class ItemModel(db.Model):
    __tablename__ = "item"

    item_id = db.Column(db.Integer, primary_key=True)
    name = db.Column("name", db.String)
    quantity = db.Column("quantity", db.Integer)
    capacity = db.Column("capacity", db.Integer)
    exp_date = db.Column("exp_date", db.String)
    price = db.Column("price", db.Float)
    inventory_id = db.Column(db.Integer, db.ForeignKey("inventory.inventory_id"))
    inventory = db.relationship("InventoryModel", back_populates="items")


class TransactionsListModel(db.Model):
    __tablename__ = "transactions_list"

    transactions_list_id = db.Column(db.Integer, db.ForeignKey("inventory.inventory_id"), primary_key=True)
    inventory = db.relationship("InventoryModel", back_populates="transactions_list")
    transaction = db.relationship("TransactionModel", back_populates="transactions_list")


class TransactionModel(db.Model):
    __tablename__ = "transaction"

    transaction_id = db.Column(db.Integer, primary_key=True)
    transactions_list = db.relationship("TransactionsListModel", back_populates="transaction")
    transactions_list_id = db.Column(db.Integer, db.ForeignKey("transactions_list.transactions_list_id"))
    item_id = db.Column(db.Integer, db.ForeignKey("item.item_id"))
    time = db.Column("time", db.String)


with app.app_context():
    db.create_all()
    db.session.commit()



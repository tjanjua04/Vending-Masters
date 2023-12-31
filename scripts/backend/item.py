import itertools
from helpers.error_handling import *
from backend.db import tabledef
from backend.db.tabledef import db_session


class Item:
    def __init__(self, name: str, capacity: int, exp_date: str, price: float, inventory_id: int, id=-1):
        if price < 0:
            raise InvalidPriceException(price, name)

        if capacity <= 0:
            raise InvalidQuantityException(capacity, name)

        self.name = name
        self.quantity = capacity
        self.capacity = capacity
        self.price = price
        self.expiration_date = exp_date
        self.inventory_id = inventory_id

        if id == -1:
            with db_session() as s:
                u = tabledef.ItemModel(name=self.name, quantity=self.quantity, capacity=self.capacity,
                                       exp_date=self.expiration_date, price=self.price,
                                       inventory_id=self.inventory_id)
                s.add(u)
                s.commit()

                self.id = u.item_id
        else:
            self.id = id

    def set_quantity(self, quantity: int):
        if quantity < 0 or quantity > self.capacity:
            raise InvalidQuantityException(quantity, self.name)

        with db_session() as s:
            model = tabledef.ItemModel
            item = s.query(model).filter(model.item_id == self.id).first()
            setattr(item, 'quantity', quantity)
            s.commit()
        self.quantity = quantity
        return self

    def set_price(self, price: float):
        if price < 0:
            raise InvalidPriceException(price, self.name)

        with db_session() as s:
            model = tabledef.ItemModel
            item = s.query(model).filter(model.item_id == self.id).first()
            setattr(item, 'price', price)
            s.commit()

        self.price = price
        return self

    def item_to_json(self):
        item_json = {'id': self.id, 'name': self.name,
                     'quantity': self.quantity, 'capacity': self.capacity,
                     'price': self.price, 'exp_date': self.expiration_date}
        return item_json

    def get_name(self) -> str:
        return self.name

    def get_id(self) -> int:
        return self.id

    def get_quantity(self) -> int:
        return self.quantity

    def get_price(self) -> float:
        return self.price

    def check_expired(self) -> bool:
        pass

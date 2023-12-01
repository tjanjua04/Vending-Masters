from helpers.error_handling import InvalidPriceException
from backend.db.tabledef import db_session
from item import Item
from db import tabledef
from db.tabledef import ItemModel, TransactionModel
from flask import session


class Transaction:
    def __init__(self, item_name: str, item_id: int, time: str, price: float, transactions_list_id: int, method: str,
                 id=-1):
        if price < 0:
            raise InvalidPriceException(price, item_name)

        self.item_name = item_name
        self.item_id = item_id
        self.time = time
        self.price = price
        self.method = method
        self.transactions_list_id = transactions_list_id

        # new transaction row in db
        if id == -1:
            with db_session() as s:
                u = tabledef.TransactionModel(time=self.time,
                                              item_id=self.item_id,
                                              transactions_list_id=transactions_list_id,
                                              method=method)
                s.add(u)
                s.commit()

                self.id = u.transaction_id
        else:
            self.id = id

    def transaction_to_json(self):
        return {'item_id': self.item_id, 'item_name': self.item_name,
                'time': self.time, 'price': self.price, 'method': self.method,
                'inventory_id': self.transactions_list_id}

    def get_price(self) -> float:
        return self.price

    def get_time(self) -> str:
        return self.time

    def get_transaction_id(self) -> int:
        return self.id

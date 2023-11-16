import itertools

from sqlalchemy import and_

from helpers.error_handling import InvalidPriceException

from item import Item
from db import tabledef
from db.tabledef import ItemModel, TransactionModel


class Transaction:
    # incremental static id
    id_iter = itertools.count()

    def __init__(self, item_name: str, item_id: int, time: str, price: float):
        if price < 0:
            raise InvalidPriceException(price, item_name)

        self.item_name = item_name
        self.item_id = item_id
        self.time = time
        self.price = price

        with tabledef.session_scope() as s:
            u = tabledef.TransactionModel(time=self.time,
                                          item_id=self.item_id)
            """item = (
                s.query(ItemModel)
                .join(TransactionModel)
                .filter(ItemModel.item_id == self.item_id)
                ).one_or_none()

            u.item = item """
            s.add(u)
            s.commit()

            self.id = u.transaction_id

    def get_price(self) -> float:
        return self.price

    def get_time(self) -> str:
        return self.time

    def get_transaction_id(self) -> int:
        return self.id




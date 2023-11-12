import itertools
from helpers.error_handling import *
from item import Item
from db import tabledef


def handle_invalid_item(f):
    def decorator(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except KeyError:
            raise ItemNotFoundException(args[0])
    return decorator


class Inventory:
    def __init__(self, capacity):
        self.capacity = capacity
        # initialize slots to none
        # instantiate items dictionary
        self.items_dict = dict[int, Item]()

        with tabledef.session_scope() as s:
            u = tabledef.InventoryModel(capacity=capacity)
            s.add(u)
            s.commit()

            self.id = u.inventory_id

    # mutators
    def create_item(self, name: str, capacity: int, exp_date: str, price: float):
        if len(self.items_dict.keys()) >= self.capacity:
            raise InventoryFullException(self.id)

        new_item = Item(name, capacity, exp_date, price, self.id)
        self.items_dict[new_item.id] = new_item

        return new_item

    @handle_invalid_item
    def add_item(self, item_id: int, add_amount: int):
        item = self.items_dict[item_id]
        if item is not None:
            amount = item.get_quantity() + add_amount
            item.set_quantity(amount)
        return item

    @handle_invalid_item
    def subtract_item(self, item_id: int, sub_amount: int):
        item = self.items_dict[item_id]
        if item is not None:
            amount = item.get_quantity() - sub_amount
            item.set_quantity(amount)
        return item

    @handle_invalid_item
    def set_item_quantity(self, item_id: int, quantity: int):
        item = self.items_dict[item_id]
        if item is not None:
            item.set_quantity(quantity)
        return item

    @handle_invalid_item
    def delete_item(self, item_id: int):
        item = self.items_dict[item_id]
        if item is not None:
            self.items_dict.pop(item_id)
        return item

    # getters
    def get_inventory_dict(self) -> dict[int, Item]:
        return self.items_dict

    @handle_invalid_item
    def get_item_price(self, item_id: int) -> float:
        return self.items_dict[item_id].get_price()

    @handle_invalid_item
    def get_item_quantity(self, item_id: int) -> int:
        return self.items_dict[item_id].get_quantity()

    @handle_invalid_item
    def get_item_name(self, item_id: int) -> str:
        return self.items_dict[item_id].get_name()

    def get_expired_items(self) -> list[Item]:
        pass





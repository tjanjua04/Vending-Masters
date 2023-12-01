from backend.db import tabledef
from backend.db.tabledef import db_session
from helpers.error_handling import ItemNotFoundException, InventoryFullException
from backend.item import Item
from backend.transactions_list import TransactionsList


def handle_invalid_item(f):
    def decorator(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except KeyError:
            raise ItemNotFoundException(args[1])
    return decorator


class Inventory:
    # do not put entry for id unless the id is a known inventory in the database
    def __init__(self, capacity: int, location: str, items_dict: dict[int, Item] = None, id: int = -1):
        self.capacity = capacity
        self.location = location

        if items_dict is None:
            self.items_dict = dict[int, Item]()
        else:
            self.items_dict = items_dict

        # create new table entry
        if id == -1:
            with db_session() as s:
                u = tabledef.InventoryModel(capacity=capacity, location=location)
                s.add(u)
                s.commit()
                self.id = u.inventory_id
        else:
            self.id = id

        self.transactions_list = TransactionsList(self.id)

    # mutators
    def create_item(self, name: str, capacity: int, exp_date: str, price: float):
        if len(self.items_dict.keys()) >= self.capacity:
            raise InventoryFullException(self.id)

        new_item = Item(name, capacity, exp_date, price, self.id)
        self.items_dict[new_item.id] = new_item

        return new_item

    def create_transaction(self, item_name: str, item_id: int, time: str, price: float, method: str):
        transaction = self.transactions_list.create_transaction(item_name, item_id, time, price, method)
        return transaction

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

    # converts the inventory dictionary to json format
    def inventory_to_json(self):
        inventory_json = {'items': []}
        for item in self.items_dict.values():
            item_json = item.item_to_json()
            inventory_json['items'].append(item_json)
        return inventory_json

    @handle_invalid_item
    def get_item_price(self, item_id: int) -> float:
        return self.items_dict[item_id].get_price()

    @handle_invalid_item
    def get_item_quantity(self, item_id: int) -> int:
        return self.items_dict[item_id].get_quantity()

    @handle_invalid_item
    def get_item_name(self, item_id: int) -> str:
        return self.items_dict[item_id].get_name()

    @handle_invalid_item
    def get_item(self, item_id: int) -> Item:
        return self.items_dict[item_id]

    def get_expired_items(self) -> list[Item]:
        expired = []
        for item in self.items_dict.values():
            if item.check_expired():
                expired.append(item)
        return expired






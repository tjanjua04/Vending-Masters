from transactions_list import TransactionsList
from inventory_controller import InventoryController
from inventory import Inventory
from item import Item

from helpers.error_handling import InvalidQuantityException, InvalidPriceException


class ManagerInventoryController(InventoryController):
    def __init__(self, inventory: Inventory, transactions_list: TransactionsList):
        super().__init__(inventory)
        self.transactions_list = transactions_list

    def create_item(self, name: str, capacity: int, exp_date: str, price: float):
        item = Item(name, capacity, exp_date, price)
        self.inventory.create_item(item)

    def delete_item(self, item_id: int):
        self.inventory.delete_item(item_id)

    def view_transaction(self, transaction_id: int):
        return self.transactions_list
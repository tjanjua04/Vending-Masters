from transactions_list import TransactionsList
from inventory_controller import InventoryController
from inventory import Inventory
from item import Item


class ManagerInventoryController(InventoryController):
    def __init__(self, inventories: list[Inventory]):
        super().__init__(inventories)

    def create_item(self, inventory_id: int, name: str, capacity: int, exp_date: str, price: float):
        self.inventories[inventory_id-1].create_item(name, capacity, exp_date, price)

    def delete_item(self, inventory_id: int, item_id: int):
        self.inventories[inventory_id-1].delete_item(item_id)

    def view_transactions(self, inventory_id: int, transaction_id: int):
        return self.transactions_list
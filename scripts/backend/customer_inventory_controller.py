from inventory import Inventory
from item import Item
from inventory_controller import InventoryController
from transactions_list import TransactionsList

from datetime import datetime


class CustomerInventoryController(InventoryController):
    def __init__(self, inventory: Inventory, transactions_list: TransactionsList):
        super().__init__(inventory)
        self.transactions_list = transactions_list

    def handle_input(self, item_id: int):
        item = self.inventory.subtract_item(item_id)
        if item is not None:
            self.handle_transaction(item)

    def handle_transaction(self, item: Item):
        time = datetime.now()
        time.strftime('%d-%m-%y_%H:%M:%S')
        self.transactions_list.create_transaction(item.get_name(), item.get_id(),
                                                  str(time), item.price)


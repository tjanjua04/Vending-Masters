from transactions_list import TransactionsList
from inventory_controller import InventoryController
from inventory import Inventory
from item import Item


class RestockerInventoryController(InventoryController):
    def __init__(self, inventories: list[Inventory]):
        super().__init__(inventories)

    def generate_instructions(self, inventory_id):
        instructions = []

        for item in self.inventories[inventory_id-1].get_expired_items():
            msg = ''
            if item.check_expired() is True:
                msg += f'Item {item.name} id: {item.id} has expired. Please remove {item.quantity} amount\n'
            if item.quantity < item.capacity:
                refill_amount = item.capacity - item.quantity
                msg += f'Item {item.name} id: {item.id} needs to be refilled with a quantity of {refill_amount}\n'
            instructions.append(msg)
        return instructions

    def add_item(self, item_id: int, amount: int):
        return self.inventory.add_item(item_id, amount)

    def remove_item(self, item_id: int, amount: int):
        return self.inventory.subtract_item(item_id, amount)

from abc import ABC

from inventory import Inventory


class InventoryController(ABC):
    def __init__(self, inventory: Inventory):
        self.inventory = inventory

    def get_inventory(self) -> Inventory:
        return self.inventory


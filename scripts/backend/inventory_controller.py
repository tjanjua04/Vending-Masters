from abc import ABC

from inventory import Inventory


class InventoryController(ABC):
    def __init__(self, inventories: list[Inventory]):
        self.inventories = inventories

    def get_inventories(self) -> list[Inventory]:
        return self.inventories


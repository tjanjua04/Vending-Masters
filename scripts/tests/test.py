import unittest
from backend.item import Item
from backend.inventory import Inventory
from backend.transactions_list import TransactionsList
from db.tabledef import ItemModel
from db.tabledef import session_scope


class TestVending(unittest.TestCase):
    with session_scope() as s:
        s.query(ItemModel).delete()
        s.commit()

    def test_inventory_add_item_then_get_name(self):
        inventory = Inventory(5)

        item = inventory.create_item("item1", 4, "exp", 2.00)
        name = inventory.get_item_name(item.id)

        self.assertEqual("item1", name)

    def test_inventory_set_item_quantity(self):
        inventory = Inventory(5)
        item = inventory.create_item("item2", 5, "exp", 3.00)
        inventory.set_item_quantity(item.id, 3)
        quantity = inventory.get_item_quantity(item.id)

        self.assertEqual(3, quantity)

    def test_inventory_subtract_item_quantity(self):
        inventory = Inventory(5)
        item = inventory.create_item("item3", 5, "exp", 4.00)
        inventory.subtract_item(item.id, 1)
        quantity = inventory.get_item_quantity(item.id)

        self.assertEqual(4, quantity)

    def test_transaction(self):
        transactions_list = TransactionsList(1)
        inventory = Inventory(5)
        item = inventory.create_item("item4", 5, "exp", 5.00)

        transactions_list.create_transaction(item.name, item.id, "time", item.price)
        transaction = transactions_list.get_latest_transaction()

        self.assertEqual(transaction.item_id, item.id)


if __name__ == '__main__':
    unittest.main()

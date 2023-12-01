import unittest
from db.tabledef import ItemModel, InventoryModel, TransactionsListModel, TransactionModel, db_session, db
from helpers.load_database_data import load_inventories_from_db
from backend.inventory import Inventory
from backend.item import Item


inventory1 = Inventory(5, 'LA')
inventory2 = Inventory(5, 'SD')
inventory3 = Inventory(5, 'SF')


inventory1.create_item("item1", 1, "exp", 1.00)
inventory1.create_item("item2", 2, "exp", 2.00)
inventory2.create_item("item3", 3, "exp", 3.00)
inventory3.create_item("item4", 4, "exp", 4.00)

inventories = load_inventories_from_db()


class TestVending(unittest.TestCase):
    def test_get_inventory_ids(self):
        inventory_ids = []
        for inventory in inventories:
            inventory_ids.append(inventory.id)

        self.assertEqual([1, 2, 3], inventory_ids)

    def test_get_inventory_items(self):
        inventory_id = 1
        valid_inventory_json = {
            1: {'id': 1, 'name': 'item1',
                'quantity': 1, 'capacity': 1,
                'price': 1, 'exp_date': 'exp'},
            2: {'id': 2, 'name': 'item2',
                'quantity': 2, 'capacity': 2,
                'price': 2, 'exp_date': 'exp'}
        }

        target_inventory = inventories[inventory_id - 1]

        items_dict = target_inventory.inventory_to_json()
        self.assertEqual(valid_inventory_json, items_dict)

    def test_update_item_quantity(self):
        inventory_id = 2
        item_id = 3
        item_quantity = 1

        target_inventory = inventories[inventory_id - 1]
        target_inventory.set_item_quantity(item_id, item_quantity)
        new_quantity = target_inventory.get_item_quantity(item_id)
        self.assertEqual(1, new_quantity)

    def test_create_item(self):
        inventory_id = 2
        item_name = 'item5'
        item_capacity = 5
        item_exp_date = 'exp'
        item_price = 5

        valid_item_json = {'id': 5, 'name': 'item5',
                           'quantity': 5, 'capacity': 5,
                           'price': 5, 'exp_date': 'exp'}

        target_inventory = inventories[inventory_id - 1]
        new_item = target_inventory.create_item(item_name, item_capacity, item_exp_date, item_price)

        self.assertEqual(valid_item_json, new_item.item_to_json())

    def test_create_transaction(self):
        inventory_id = 3
        item_id = 4
        method = 'cash'

        target_inventory = inventories[inventory_id - 1]
        item = target_inventory.get_item(item_id)
        transaction = target_inventory.create_transaction(item.name, item.id, 'time', item.price, method)
        json_transaction = transaction.transaction_to_json()

        self.assertEqual({4, 'item4', 'time', 'cash'}, json_transaction)

    def test_inventory_location(self):
        inventory_id = 1
        target_inventory = inventories[inventory_id - 1]

        self.assertEqual(target_inventory.location, 'LA')

    def test_get_all_transactions(self):
        for inventory in inventories:
            key = list(inventory.items_dict.keys())[0]
            item = inventory.items_dict[key]
            for i in range(50):
                inventory.create_transaction(item.name, item.id, 'time', item.price, 'cash')

        all_transactions = []
        for inventory in inventories:
            transactions_list = inventory.transactions_list.transactions_to_json()
            all_transactions.extend(transactions_list)
        print(all_transactions)


if __name__ == '__main__':
    unittest.main()

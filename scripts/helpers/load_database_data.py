from sqlalchemy import select
from flask import session

from backend.db.tabledef import ItemModel, InventoryModel, TransactionsListModel, TransactionModel, db_session
from backend.item import Item
from backend.transaction import Transaction
from backend.inventory import Inventory


def load_inventories_from_db():
    with db_session() as s:
        db_inventories = s.query(InventoryModel).all()
        inventories = get_inventories(s, db_inventories)
        return inventories


def get_inventories(s, db_inventories):
    inventories = []
    # search through existing inventory databases
    for db_inventory in db_inventories:
        items_dict = get_items_dict(s, db_inventory)
        # create new inventory objects and populate it with
        inventory = Inventory(db_inventory.capacity, items_dict=items_dict, id=db_inventory.inventory_id)
        inventories.append(inventory)
    return inventories


def get_items_dict(s, db_inventory):
    items_dict = {}

    db_items = s.query(ItemModel).filter(ItemModel.inventory_id == db_inventory.inventory_id).all()

    for db_item in db_items:
        item = Item(db_item.name, db_item.capacity, db_item.exp_date,
                    db_item.price, db_item.inventory_id, id=db_item.item_id)
        items_dict[item.id] = item
    return items_dict


def get_transactions_dict(s, db_transactions_list: TransactionsListModel):
    transactions_dict = {}

    db_transactions = s.query(TransactionModel).filter(
        TransactionModel.transactions_list_id == db_transactions_list.transactions_list_id
    ).all()

    for db_transaction in db_transactions:
        db_item = s.query(ItemModel).filter(
            ItemModel.item_id == db_transaction.item_id
        ).first()
        transaction = Transaction(db_item.name, db_item.item_id, db_transaction.time, db_item.price, -1)
        transactions_dict[transaction.id] = transaction

    return transactions_dict















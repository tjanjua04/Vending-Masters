# -*- coding: utf-8 -*-

from flask import Flask, Response, request
from helpers.error_handling import *
from backend.db.tabledef import app, ItemModel, InventoryModel, TransactionsListModel, TransactionModel, db_session, db
from helpers.load_database_data import load_inventories_from_db
from backend.inventory import Inventory
import json
import sys
import os

restocker_dict = {'michael': '123', 'ted': '321'}

def create_inventories():
    inventory1 = Inventory(10, 'LA')
    inventory2 = Inventory(10, 'SD')
    inventory3 = Inventory(10, 'SF')
    ret = [inventory1, inventory2, inventory3]
    return ret


def populate_inventories(inventories):
    inventories[0].create_item("Chips", 1, "exp", 1.00)
    inventories[0].create_item("Candy", 2, "exp", 2.00)
    inventories[1].create_item("Soda", 3, "exp", 3.00)
    inventories[2].create_item("Water", 4, "exp", 4.00)


def populate_transactions(inventories):
    for inventory in inventories:
        key = list(inventory.items_dict.keys())[0]
        item = inventory.items_dict[key]
        for i in range(50):
            inventory.create_transaction(item.name, item.id, 'time', item.price, 'cash')


temp_inventories = create_inventories()
populate_inventories(temp_inventories)
populate_transactions(temp_inventories)

inventories = load_inventories_from_db()


# ======== Routing =========================================================== #

@app.route('/restocker/login', methods=['POST'])
def restocker_login():
    username = request.args.get('username')
    password = request.args.get('password')

    if restocker_dict[username] is not None:
        if restocker_dict[username] == password:
            return username
        else:
            return Response(response=f'Invalid password for {username}', status=401)
    return Response(response=f'Invalid username: {username}', status=401)


@app.route('/inventory/', methods=['GET'])
def get_inventory_ids():
    inventory_ids = []
    for inventory in inventories:
        inventory_ids.append(inventory.id)
    return inventory_ids


@app.route('/inventory/<inventory_id>', methods=['GET'])
def get_inventory_items(inventory_id):
    target_inventory = inventories[int(inventory_id)-1]
    if target_inventory is None:
        return f'No Inventory of id {inventory_id}'
    return target_inventory.inventory_to_json()


@app.route('/inventory/<inventory_id>', methods=['PUT'])
def update_item_quantity(inventory_id):
    target_inventory = inventories[inventory_id-1]
    target_item_id = request.args.get("item_id")
    quantity = request.args.get("quantity")

    try:
        target_inventory.set_item_quantity(target_item_id, quantity)
    except Exception as e:
        return Response(response=getattr(e, 'message'), status=404)

    new_quantity = target_inventory.get_item_quantity(target_item_id)
    return new_quantity


@app.route('/inventory/<inventory_id>', methods=['POST'])
def create_item(inventory_id):
    target_inventory = inventories[inventory_id-1]
    name = request.args.get("item_name")
    capacity = request.args.get("item_capacity")
    exp_date = request.args.get("item_exp_date")
    price = request.args.get("item_price")

    try:
        target_inventory.create_item(name, capacity, exp_date, price)
    except Exception as e:
        return Response(response=getattr(e, 'message'), status=404)


@app.route('/transaction', methods=['POST'])
def create_transaction():
    inventory_id = int(request.args.get("inventory_id"))
    item_id = int(request.args.get("item_id"))
    time = request.args.get("time")
    method = request.args.get("method")
    price = request.args.get("price")
    target_inventory = inventories[inventory_id-1]

    try:
        item = target_inventory.get_item(item_id)
        transaction = target_inventory.create_transaction(item.name, item.id, time, price, method)
    except Exception as e:
        return Response(response=getattr(e, 'message'), status=404)

    json_transaction = transaction.transaction_to_json()
    return json_transaction


@app.route('/transaction', methods=['GET'])
def get_all_transactions():
    all_transactions = []
    for inventory in inventories:
        transactions_list = inventory.transactions_list.transactions_to_json()
        all_transactions.extend(transactions_list)
    return all_transactions


# ======== Main ============================================================== #
if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)

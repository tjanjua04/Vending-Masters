# -*- coding: utf-8 -*-

from flask import Flask, redirect, url_for, render_template, request, session, jsonify
from backend.db import tabledef
from db.tabledef import app, ItemModel, InventoryModel, TransactionsListModel, TransactionModel, db_session, db
from helpers.load_database_data import load_inventories_from_db
from backend.inventory import Inventory
import json
import sys
import os

restocker_dict = {'michael': '123'}

inventory1 = Inventory(5)
inventory2 = Inventory(5)
inventory3 = Inventory(5)
inventory4 = Inventory(5)

inventory1.create_item("item1", 1, "exp", 1.00)
inventory1.create_item("item2", 2, "exp", 2.00)
inventory2.create_item("item3", 3, "exp", 3.00)
inventory3.create_item("item4", 4, "exp", 4.00)
inventory4.create_item("item5", 5, "exp", 5.00)


inventories = load_inventories_from_db()


# ======== Routing =========================================================== #
@app.route('/inventory/', methods=['GET'])
def get_inventory_ids():
    inventory_ids = []
    for inventory in inventories:
        inventory_ids.append(inventory.id)
    print(len(inventory_ids))
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

    target_inventory.set_item_quantity(target_item_id, quantity)
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
        if e is <name of exception>
            # go to 404 with message of exception


@app.route('/transaction', methods=['POST'])
def create_transaction():
    inventory_id = int(request.args.get("inventory_id"))
    item_id = int(request.args.get("item_id"))
    time = request.args.get("time")
    target_inventory = inventories[inventory_id-1]

    item = target_inventory.get_item(item_id)
    transaction = target_inventory.create_transaction(item.name, item.id, time, item.price)
    json_transaction = transaction.transaction_to_json()
    return json_transaction

[{'time': 123, id: 1}, {} , {} ,{}]


# ======== Main ============================================================== #
if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)

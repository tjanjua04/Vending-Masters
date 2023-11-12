# -*- coding: utf-8 -*-

from backend.inventory import Inventory
from flask import Flask, redirect, url_for, render_template, request, session, jsonify
from flask_cors import CORS
import json
import sys
import os

app = Flask(__name__)
CORS(app)

"""myDict[id] = ["name", "price", "expdate"]
myDict[id2]= ["name", "price", "expdate"]"""


# ======== Routing =========================================================== #
@app.route('/restocker/login/<inventory_id>}', methods=['GET', 'POST'])
def get_item_attributes(id):
    print("this was called")
    return {1: ['item_name', 5, 5.00]}


# ======== Main ============================================================== #
if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)

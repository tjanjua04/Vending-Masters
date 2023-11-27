from helpers.error_handling import TransactionNotFoundException
from backend.db.tabledef import db_session
from transaction import Transaction
from backend.db import tabledef
from backend.db.tabledef import TransactionsListModel
from helpers import load_database_data


def handle_invalid_transaction(f):
    def decorator(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except KeyError:
            raise TransactionNotFoundException(args[0])

    return decorator


class TransactionsList:
    # transactions_list_id is id of inventory
    def __init__(self, inventory_id: int):
        self.id = inventory_id
        self.transactions_dict = dict[int, Transaction]()

        with db_session() as s:
            db_transactions_list = s.query(TransactionsListModel).filter(
                TransactionsListModel.transactions_list_id == inventory_id).first()

            # if db entry exists
            if db_transactions_list is not None:
                self.transactions_dict = load_database_data.get_transactions_dict(s, db_transactions_list)
            else:  # create new entry
                u = tabledef.TransactionsListModel(transactions_list_id=self.id)
                s.add(u)
                s.commit()

        self.profit = 0

    def create_transaction(self, item_name: str, item_id: int, time: str, price: float):
        transaction = Transaction(item_name, item_id, time, price, self.id)
        self.transactions_dict[transaction.get_transaction_id()] = transaction
        self.profit += price
        return transaction

    def get_latest_transaction(self) -> Transaction:
        latest_key = max(self.transactions_dict, key=self.transactions_dict.get)
        return self.transactions_dict[latest_key]

    @handle_invalid_transaction
    def get_transaction(self, transaction_id: int):
        return self.transactions_dict[transaction_id]

    def get_profit(self):
        return self.profit

    def get_transactions_list(self):
        return self.transaction_dict

    def transactions_to_json(self):
        json_dict = {}
        for id, transaction in self.transaction_dict.items():
            item = {'id': id, 'item': transaction.item_name,
                    'time': transaction.time, 'price': transaction.price}
            json_dict[id] = item
        return json_dict

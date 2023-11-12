from helpers.error_handling import TransactionNotFoundException

from transaction import Transaction


def handle_invalid_transaction(f):
    def decorator(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except KeyError:
            raise TransactionNotFoundException(args[0])
    return decorator


class TransactionsList:
    # transactions_list_id is id of inventory
    def __init__(self, transactions_list_id: int):
        self.id = transactions_list_id
        self.transaction_dict = dict[int, Transaction]()

        self.profit = 0

    def create_transaction(self, item_name: str, item_id: int, time: str, price: float):
        transaction = Transaction(item_name, item_id, time, price)
        self.transaction_dict[transaction.get_transaction_id()] = transaction
        self.profit += price

    def get_latest_transaction(self) -> Transaction:
        latest_key = max(self.transaction_dict, key=self.transaction_dict.get)
        return self.transaction_dict[latest_key]

    @handle_invalid_transaction
    def get_transaction(self, transaction_id: int):
        return self.transaction_dict[transaction_id]

    def get_profit(self):
        return self.profit

    def get_transactions_list(self):
        return self.transaction_dict

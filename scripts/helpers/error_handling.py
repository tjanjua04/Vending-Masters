class CustomException(Exception):
    def __init__(self):
        self.message = self.generate_message() + "\nProcess not completed"
        super().__init__(self.message)

    def generate_message(self) -> str:
        pass


class InvalidQuantityException(CustomException):
    def __init__(self, quantity: int, item_name: str):
        self.quantity = quantity
        self.item_name = item_name
        super().__init__()

    def generate_message(self):
        return f'Invalid quantity detected of: {self.quantity} for item: {self.item_name}'


class InvalidPriceException(CustomException):
    def __init__(self, price: float, item_name: str):
        self.price = price
        self.item_name = item_name
        super().__init__()

    def generate_message(self):
        return f'Price of: {self.price} is invalid'


class TransactionNotFoundException(CustomException):
    def __init__(self, transaction_id: int):
        self.transaction_id = transaction_id
        super().__init__()

    def generate_message(self):
        return f'Transaction not found for transaction of id: {self.transaction_id}'


class ItemNotFoundException(CustomException):
    def __init__(self, item_id: int):
        self.item_id = item_id
        super().__init__()

    def generate_message(self):
        return f'Item not found for item of id: {self.item_id}'


class InvalidTransactionAmountException(CustomException):
    def __init__(self, amount: float, item_name: str):
        self.amount = amount
        self.item_name = item_name
        super().__init__()

    def generate_message(self):
        return (f'Amount of {self.amount} is an invalid transaction '
                f'amount for item: {self.item_name}')


class InventoryFullException(CustomException):
    def __init__(self, inventory_id: id):
        self.inventory_id = inventory_id
        super().__init__()

    def generate_message(self):
        return f'Inventory of id: {self.inventory_id} is full'




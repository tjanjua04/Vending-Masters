from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Float, Table, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, backref

# Local
SQLALCHEMY_DATABASE_URI = 'sqlite:///mydb.db'
Base = declarative_base()


@contextmanager
def session_scope():
    s = get_session()
    s.expire_on_commit = True
    try:
        yield s
        s.commit()
    except:
        s.rollback()
        raise
    finally:
        s.close()


def get_session():
    return sessionmaker(bind=engine)()


class InventoryModel(Base):
    __tablename__ = "inventory"

    inventory_id = Column(Integer, primary_key=True)
    capacity = Column("capacity", Integer)
    items = relationship('ItemModel', back_populates='inventory')

class ItemModel(Base):
    __tablename__ = "item"

    item_id = Column(Integer, primary_key=True)
    name = Column("item_name", String)
    quantity = Column("quantity", Integer)
    exp_date = Column("exp_date", String)
    price = Column("price", Float)
    inventory_id = Column(Integer, ForeignKey("inventory.inventory_id"))
    inventory = relationship("InventoryModel", back_populates="items")


    def __repr__(self):
        return f"{self.id}, {self.name}, {self.quantity}, {self.exp_date}"


class TransactionModel(Base):
    __tablename__ = "transaction"

    transaction_id = Column(Integer, primary_key=True)
    time = Column("time", String)
    item_id = Column(Integer, ForeignKey("item.item_id"))


engine = create_engine(SQLALCHEMY_DATABASE_URI)
Base.metadata.create_all(bind=engine)

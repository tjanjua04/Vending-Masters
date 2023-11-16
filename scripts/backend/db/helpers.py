from contextlib import contextmanager
from sqlalchemy.orm import sessionmaker
import tabledef


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
    return sessionmaker(bind=tabledef.engine)()



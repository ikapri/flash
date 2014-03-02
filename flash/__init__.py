__author__ = 'ishaan'

from flask import Flask

app = Flask(__name__)
app.secret_key = 'vZ2\xcf\x03&\x01z\x16\xeeJ\x1b\x0c\xe0\xa5x\x1bj=\x19\xfd\xc0J\xe5'

from flash import views
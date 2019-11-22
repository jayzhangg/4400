import pymysql
from flask import Flask

app = Flask(__name__)
hostname = '104.155.149.149'
username = 'root'
password = 'dinodb'
database = 'AtlantaMovie'

@app.route('/')
def index():
    conn = pymysql.connect( host=hostname, user=username, passwd=password, db=database)
    cur = conn.cursor()
    cur.execute( "SELECT * FROM user")
    result = cur.fetchall()
    conn.close()
    return str(result)

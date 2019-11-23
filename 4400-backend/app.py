import pymysql
from flask import Flask, g
from flask_api import status

app = Flask(__name__)

@app.before_request
def before_request():
    hostname = '104.155.149.149'
    username = 'root'
    password = 'dinodb'
    database = 'AtlantaMovie'
    g.conn = pymysql.connect(host=hostname, user=username, passwd=password, db=database)

@app.route('/login/<username>/<password>', methods=['GET'])
def validate_login(username, password):
    cur = g.conn.cursor()
    query = "SELECT * FROM user where user_name=%s and user_password=%s"
    cur.execute(query, (username, password))
    count = cur.rowcount
    cur.close()
    if (count > 0):
        content = {'success': 'true', 'msg': ''}
        return content, status.HTTP_200_OK
    else:
        content = {'success': 'false', 'error_msg': 'invalid credentials'}
        return content, status.HTTP_401_UNAUTHORIZED

@app.route('/register/user/<fname>/<lname>/<username>/<password>/<password2>', methods=['GET'])
def register_user(fname, lname, username, password, password2):
    cur = g.conn.cursor()
    query = "SELECT * FROM user where user_name=%s"
    cur.execute(query, (username))
    count = cur.rowcount
    cur.close()
    if (count > 0):
        content = {'success': 'false', 'error_msg': 'username alredy exists in database'}
        return content, status.HTTP_400_BAD_REQUEST
    if (len(password) < 8):
        content = {'success': 'false', 'error_msg': 'password must have at least 8 characters'}
        return content, status.HTTP_400_BAD_REQUEST
    if (password != password2):
        content = {'success': 'false', 'error_msg': 'password and confirm password should match'}
        return content, status.HTTP_400_BAD_REQUEST
    
    cur = g.conn.cursor()
    query = "INSERT INTO user VALUES (%s,'PENDING',%s,%s,%s)"
    cur.execute(query, (username, password, fname, lname))
    count = cur.rowcount
    cur.close()
    if (count > 0):
        g.conn.commit()
        content = {'success': 'true', 'msg': ''}
        return content, status.HTTP_200_OK
    else:
        content = {'success': 'false', 'error_msg': 'could not add to database'}
        return content, status.HTTP_400_BAD_REQUEST

@app.after_request
def after_request(response):
    g.conn.close()
    return response
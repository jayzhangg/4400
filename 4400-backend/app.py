import pymysql
from flask import Flask, g
from flask_api import status

app = Flask(__name__)
SUCCESS_MSG = {'success': 'true', 'msg': ''}
FAIL_MSG = {'success': 'false', 'error_msg': ''}

def execute_query(query, params):
    cur = g.conn.cursor()
    cur.execute(query, params)
    count = cur.rowcount
    cur.close()
    return count

@app.before_request
def before_request():
    hostname = '104.155.149.149'
    username = 'root'
    password = 'dinodb'
    database = 'AtlantaMovie'
    g.conn = pymysql.connect(host=hostname, user=username, passwd=password, db=database)

@app.route('/login/<username>/<password>', methods=['GET'])
def validate_login(username, password):
    count = execute_query("SELECT * FROM user where user_name=%s and user_password=%s", (username, password))
    if (count <= 0):
        FAIL_MSG['error_msg'] = 'invalid credentials'
        return FAIL_MSG, status.HTTP_401_UNAUTHORIZED
    return SUCCESS_MSG, status.HTTP_200_OK

@app.route('/register/user/<fname>/<lname>/<username>/<password>/<password2>', methods=['GET'])
def register_user(fname, lname, username, password, password2):
    count = execute_query("SELECT * FROM user where user_name=%s", (username))
    if (count > 0):
        FAIL_MSG['error_msg'] = 'username alredy exists in database'
        return FAIL_MSG, status.HTTP_400_BAD_REQUEST
    if (len(password) < 8):
        FAIL_MSG['error_msg'] = 'password must have at least 8 characters'
        return FAIL_MSG, status.HTTP_400_BAD_REQUEST
    if (password != password2):
        FAIL_MSG['error_msg'] = 'password and confirm password should match'
        return FAIL_MSG, status.HTTP_400_BAD_REQUEST
    count = execute_query("INSERT INTO user VALUES (%s,'PENDING',%s,%s,%s)", (username, password, fname, lname))
    if (count <= 0):
        FAIL_MSG['err_msg'] = 'could not add user to database'
        return FAIL_MSG, status.HTTP_400_BAD_REQUEST
    return SUCCESS_MSG, status.HTTP_200_OK

# @app.route('/register/customer/<fname>/<lname>/<username>/<password>/<password2>/<c1>', methods=['GET'])
# @app.route('/register/customer/<fname>/<lname>/<username>/<password>/<password2>/<c1>/<c2>', methods=['GET'])
# @app.route('/register/customer/<fname>/<lname>/<username>/<password>/<password2>/<c1>/<c2>/<c3>', methods=['GET'])
# @app.route('/register/customer/<fname>/<lname>/<username>/<password>/<password2>/<c1>/<c2>/<c3>/<c4>', methods=['GET'])
# @app.route('/register/customer/<fname>/<lname>/<username>/<password>/<password2>/<c1>/<c2>/<c3>/<c4>/<c5>', methods=['GET'])
# def register_customer(fname, lname, username, password, password2, c1, c2=None, c3=None, c4=None, c5=None): 
#     content, status = add_creditcard(c1, username)
#     if (content != {'success': 'true', 'msg': ''}):
#         return content, status
#     if (c2 is not None):
#         content, status = add_creditcard(c2, username)
#         if (content != {'success': 'true', 'msg': ''}):
#             return content, status
#     if (c3 is not None):
#         content, status = add_creditcard(c3, username)
#         if (content != {'success': 'true', 'msg': ''}):
#             return content, status
#     if (c4 is not None):
#         content, status = add_creditcard(c4, username)
#         if (content != {'success': 'true', 'msg': ''}):
#             return content, status
#     if (c5 is not None):
#         content, status = add_creditcard(c5, username)
#         if (content != {'success': 'true', 'msg': ''}):
#             return content, status
#     content, status = register_user(fname, lname, username, password, password2)
#     if (content != {'success': 'true', 'msg': ''}):
#         return content, status
#     cur = g.conn.cursor()
#     query = "INSERT INTO customer VALUES (%s)"
#     cur.execute(query, (username))
#     cur.close()
#     count = cur.rowcount
#     if (count <= 0):
#         content = {'success': 'false', 'error_msg': 'could not add customer to database'}
#         return content, status.HTTP_400_BAD_REQUEST
#     g.conn.commit()
#     content = {'success': 'true', 'msg': ''}
#     return content, status.HTTP_200_OK

# def add_creditcard(cc_num, cc_owner):
#     if (len(cc_num) != 16):
#         content = {'success': 'false', 'error_msg': 'creditcard must have 16 digits'}
#         return content, status.HTTP_400_BAD_REQUEST
#     cur = g.conn.cursor()
#     query = "SELECT * FROM creditcard where creditcard_num=%s"
#     cur.execute(query, (cc_num))
#     count = cur.rowcount
#     cur.close()
#     if (count > 0):
#         content = {'success': 'false', 'error_msg': 'credit card num alredy exists in database'}
#         return content, status.HTTP_400_BAD_REQUEST
#     cur = g.conn.cursor()
#     query = "INSERT INTO creditcard VALUES (%s, %s)"
#     cur.execute(query, (cc_num, cc_owner))
#     count = cur.rowcount
#     cur.close()
#     if (count > 0):
#         content = {'success': 'true', 'msg': ''}
#         return content, status.HTTP_200_OK
#     else:
#         content = {'success': 'false', 'error_msg': 'could not add credit card num to database'}
#         return content, status.HTTP_400_BAD_REQUEST

@app.after_request
def after_request(response):
    if (response.status_code == 200): 
        g.conn.commit()
    g.conn.close()
    return response
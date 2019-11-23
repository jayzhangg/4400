import pymysql
from flask import Flask, g
from flask_api import status

app = Flask(__name__)
SUCCESS_MSG = {'success': 'true', 'msg': ''}
FAIL_MSG = {'success': 'false', 'err_msg': ''}

def execute_query(query, params):
    cur = g.conn.cursor()
    cur.execute(query, params)
    count = cur.rowcount
    cur.close()
    return count

def get_results(query, params):
    cur = g.conn.cursor()
    cur.execute(query, params)
    res = cur.fetchall()
    cur.close()
    return res

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
        FAIL_MSG['err_msg'] = 'invalid credentials'
        return FAIL_MSG, status.HTTP_401_UNAUTHORIZED
    return SUCCESS_MSG, status.HTTP_200_OK

@app.route('/register/user/<fname>/<lname>/<username>/<password>/<password2>', methods=['GET'])
def register_user(fname, lname, username, password, password2):
    count = execute_query("SELECT * FROM user where user_name=%s", (username))
    if (count > 0):
        FAIL_MSG['err_msg'] = 'username alredy exists in database'
        return FAIL_MSG, status.HTTP_400_BAD_REQUEST
    if (len(password) < 8):
        FAIL_MSG['err_msg'] = 'password must have at least 8 characters'
        return FAIL_MSG, status.HTTP_400_BAD_REQUEST
    if (password != password2):
        FAIL_MSG['err_msg'] = 'password and confirm password should match'
        return FAIL_MSG, status.HTTP_400_BAD_REQUEST
    count = execute_query("INSERT INTO user VALUES (%s,'PENDING',%s,%s,%s)", (username, password, fname, lname))
    if (count <= 0):
        FAIL_MSG['err_msg'] = 'could not add user to database'
        return FAIL_MSG, status.HTTP_400_BAD_REQUEST
    return SUCCESS_MSG, status.HTTP_200_OK

@app.route('/register/customer/<fname>/<lname>/<username>/<password>/<password2>/<c1>', methods=['GET'])
@app.route('/register/customer/<fname>/<lname>/<username>/<password>/<password2>/<c1>/<c2>', methods=['GET'])
@app.route('/register/customer/<fname>/<lname>/<username>/<password>/<password2>/<c1>/<c2>/<c3>', methods=['GET'])
@app.route('/register/customer/<fname>/<lname>/<username>/<password>/<password2>/<c1>/<c2>/<c3>/<c4>', methods=['GET'])
@app.route('/register/customer/<fname>/<lname>/<username>/<password>/<password2>/<c1>/<c2>/<c3>/<c4>/<c5>', methods=['GET'])
def register_customer(fname, lname, username, password, password2, c1, c2=None, c3=None, c4=None, c5=None): 
    msg, code = register_user(fname, lname, username, password, password2)
    if (msg != SUCCESS_MSG):
        return msg, code
    count = execute_query("INSERT INTO customer VALUES (%s)", (username))
    if (count <= 0):
        FAIL_MSG['err_msg'] = 'could not add customer to database'
        return FAIL_MSG, status.HTTP_400_BAD_REQUEST
    msg, code = add_creditcard(c1, username)
    if (msg != SUCCESS_MSG):
        return msg, code
    if (c2 is not None):
        msg, code = add_creditcard(c2, username)
        if (msg != SUCCESS_MSG):
            return msg, code
    if (c3 is not None):
        msg, code = add_creditcard(c3, username)
        if (msg != SUCCESS_MSG):
            return msg, code
    if (c4 is not None):
        msg, code = add_creditcard(c4, username)
        if (msg != SUCCESS_MSG):
            return msg, code
    if (c5 is not None):
        msg, code = add_creditcard(c5, username)
        if (msg != SUCCESS_MSG):
            return msg, code
    return SUCCESS_MSG, status.HTTP_200_OK

def add_creditcard(cc_num, cc_owner):
    if (len(cc_num) != 16):
        FAIL_MSG['err_msg'] = 'creditcard must have 16 digits'
        return FAIL_MSG, status.HTTP_400_BAD_REQUEST
    count = execute_query("SELECT * FROM creditcard where creditcard_num=%s", (cc_num))
    if (count > 0):
        FAIL_MSG['err_msg'] = 'credit card num alredy exists in database'
        return FAIL_MSG, status.HTTP_400_BAD_REQUEST
    count = execute_query("INSERT INTO creditcard VALUES (%s, %s)", (cc_num, cc_owner))
    if (count <= 0):
        FAIL_MSG['err_msg'] = 'could not add credit card num to database'
        return FAIL_MSG, status.HTTP_400_BAD_REQUEST
    return SUCCESS_MSG, status.HTTP_200_OK

@app.route('/register/manager/<fname>/<lname>/<username>/<password>/<password2>/<company>/<street>/<city>/<state>/<zipcode>', methods=['GET'])
def register_manager(fname, lname, username, password, password2, company, street, city, state, zipcode):
    msg, code = register_user(fname, lname, username, password, password2)
    if (msg != SUCCESS_MSG):
        return msg, code
    count = execute_query("SELECT * FROM manager where manager_street=%s and manager_city=%s and manager_zipcode=%s and manager_state=%s", (street, city, zipcode, state))
    if (count > 0):
        FAIL_MSG['err_msg'] = 'manager address alredy exists in database'
        return FAIL_MSG, status.HTTP_400_BAD_REQUEST
    if (len(zipcode) != 5):
        FAIL_MSG['err_msg'] = 'zipcode must have 5 digits'
        return FAIL_MSG, status.HTTP_400_BAD_REQUEST
    count = execute_query("INSERT INTO manager VALUES(%s, %s, %s, %s, %s, %s)", (username, street, city, zipcode, state, company))
    if (count <= 0):
        FAIL_MSG['err_msg'] = 'could not add manager to database'
        return FAIL_MSG, status.HTTP_400_BAD_REQUEST
    return SUCCESS_MSG, status.HTTP_200_OK

@app.route('/companies', methods=['GET'])
def get_companies():
    res = get_results("SELECT * FROM company", ())
    SUCCESS_MSG['msg'] = res
    return SUCCESS_MSG, status.HTTP_200_OK

@app.after_request
def after_request(response):
    if (response.status_code == 200): 
        g.conn.commit()
    g.conn.close()
    return response
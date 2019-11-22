import pymysql
from flask import Flask
from flask_api import status

app = Flask(__name__)
hostname = '104.155.149.149'
username = 'root'
password = 'dinodb'
database = 'AtlantaMovie'
conn = pymysql.connect(host=hostname, user=username, passwd=password, db=database)

@app.route('/login/<username>/<password>', methods=['GET'])
def validate_login(username, password):
    cur = conn.cursor()
    query = "SELECT * FROM user where user_name=%s and user_password=%s"
    cur.execute(query, (username, password))
    result = cur.fetchall()
    conn.close()
    if (cur.rowcount > 0):
        content = {'success': 'true', 'error_msg': ''}
        return content, status.HTTP_200_OK
    else:
        content = {'success': 'false', 'error_msg': 'invalid credentials'}
        return content, status.HTTP_401_UNAUTHORIZED

@app.route('/register/<fname>/<lname>/<username>/<password>/<password2>', methods=['POST'])
def register_user(fname, lname, username, password, password2):
    cur = conn.cursor()
    query = "SELECT * FROM user where user_name=%s"
    cur.execute(query, (username))
    result = cur.fetchall()
    conn.close()
    if (cur.rowcount > 0):
        content = {'success': 'false', 'error_msg': 'username alredy exists in database'}
        return content, status.HTTP_200_OK
    if (len(password) < 8):
        content = {'success': 'false', 'error_msg': 'password must have at least 8 characters'}
        return content, status.HTTP_400_BAD_REQUEST
    if (password != password2):
        content = {'success': 'false', 'error_msg': 'password and confirm password should match'}
        return content, status.HTTP_400_BAD_REQUEST
    
    content = {'success': 'true', 'error_msg': ''}
    return content, status.HTTP_200_OK
import pytest
import json
from app import app

@pytest.fixture
def client():
  client = app.test_client()
  return client

# def test_validate_login(client):
#     # invalid credentials
#     res = client.get('/login/georgep/11111111')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'err_msg': 'invalid credentials'}
#     assert res.status_code == 401

#     # valid credentials
#     res = client.get('/login/georgep/111111111')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'true', 'msg': ''}
#     assert res.status_code == 200

# def test_register_user(client):
#     # username exists
#     res = client.get('/register/user/george/p/georgep/12345678/12345678')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'err_msg': 'username alredy exists in database'}
#     assert res.status_code == 400

#     # password not 8 chars
#     res = client.get('/register/user/george/p/georgepp/1234567/1234567')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'err_msg': 'password must have at least 8 characters'}
#     assert res.status_code == 400

#     # password does not match confirm password
#     res = client.get('/register/user/george/p/georgepp/12345678/1234567')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'err_msg': 'password and confirm password should match'}
#     assert res.status_code == 400

#     # valid user
#     res = client.get('/register/user/shreya/keshive/sk123/12345678/12345678')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'true', 'msg': ''}
#     assert res.status_code == 200

# def test_register_customer(client):
#     # username exists
#     res = client.get('/register/customer/george/p/georgep/12345678/12345678/4444444444444444')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'err_msg': 'username alredy exists in database'}
#     assert res.status_code == 400

#     # password not 8 chars
#     res = client.get('/register/customer/shreya/keshive/sk123/1234567/1234567/4444444444444444')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'err_msg': 'password must have at least 8 characters'}
#     assert res.status_code == 400

#     # password does not match confirm password
#     res = client.get('/register/customer/shreya/keshive/sk123/12345678/12345679/4444444444444444')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'err_msg': 'password and confirm password should match'}
#     assert res.status_code == 400

#     # valid user/customer, credit card num not unique
#     res = client.get('/register/customer/shreya/keshive/sk123/12345678/12345678/1111111111111111')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'err_msg': 'credit card num alredy exists in database'}
#     assert res.status_code == 400

#     # valid user/customer, credit card num not 16 chars
#     res = client.get('/register/customer/shreya/keshive/sk123/12345678/12345678/444444444444444')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'err_msg': 'creditcard must have 16 digits'}
#     assert res.status_code == 400

#     # valid user/customer, valid c1
#     res = client.get('/register/customer/shreya/keshive/sk123/12345678/12345678/4444444444444444')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'true', 'msg': ''}
#     assert res.status_code == 200

#     # valid user/customer, valid c1, invalid c2
#     res = client.get('/register/customer/shreya/keshive/sk123/12345678/12345678/4444444444444444/4444444444444444')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'err_msg': 'credit card num alredy exists in database'}
#     assert res.status_code == 400

#     # valid user/customer, valid c1, valid c2
#     res = client.get('/register/customer/shreya/keshive/sk123/12345678/12345678/4444444444444444/5555555555555555')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'true', 'msg': ''}
#     assert res.status_code == 200

# def test_register_manager(client):
#     # username exists
#     res = client.get('/register/manager/george/p/georgep/12345678/12345678/GOOG/5 Dogwood/Atlanta/GA/30332')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'err_msg': 'username alredy exists in database'}
#     assert res.status_code == 400

#     # password not 8 chars
#     res = client.get('/register/manager/shreya/keshive/sk123/1234567/1234567/GOOG/5 Dogwood/Atlanta/GA/30332')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'err_msg': 'password must have at least 8 characters'}
#     assert res.status_code == 400

#     # password does not match confirm password
#     res = client.get('/register/manager/shreya/keshive/sk123/12345678/12345679/GOOG/5 Dogwood/Atlanta/GA/30332')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'err_msg': 'password and confirm password should match'}
#     assert res.status_code == 400

#     # manager address already exists
#     res = client.get('/register/manager/shreya/keshive/sk123/12345678/12345678/GOOG/200 Cool Place/San Francisco/CA/94016')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'err_msg': 'manager address alredy exists in database'}
#     assert res.status_code == 400

#     # zipcode not 5 digits
#     res = client.get('/register/manager/shreya/keshive/sk123/12345678/12345678/GOOG/200 Cool Place/San Francisco/CA/9401')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'err_msg': 'zipcode must have 5 digits'}
#     assert res.status_code == 400

#     # valid manager
#     res = client.get('/register/manager/shreya/keshive/sk123/12345678/12345678/AI Theater Company/5 Dogwood/Atlanta/GA/30332')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'true', 'msg': ''}
#     assert res.status_code == 200

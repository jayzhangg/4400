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
#     assert data == {'success': 'false', 'error_msg': 'invalid credentials'}
#     assert res.status_code == 401

#     # valid credentials
#     res = client.get('/login/georgep/111111111')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'true', 'msg': ''}
#     assert res.status_code == 200

# def test_register_user(client):
#     # username exists
#     res = client.get('/register/george/p/georgep/12345678/12345678')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'error_msg': 'username alredy exists in database'}
#     assert res.status_code == 400

#     # password not 8 chars
#     res = client.get('/register/george/p/georgepp/1234567/1234567')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'error_msg': 'password must have at least 8 characters'}
#     assert res.status_code == 400

#     # password does not match confirm password
#     res = client.get('/register/george/p/georgepp/12345678/1234567')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'false', 'error_msg': 'password and confirm password should match'}
#     assert res.status_code == 400

#     # valid
#     res = client.get('/register/george/p/georgepp/12345678/12345678')
#     data = json.loads(res.data.decode('utf-8'))
#     assert data == {'success': 'true', 'msg': ''}
#     assert res.status_code == 200
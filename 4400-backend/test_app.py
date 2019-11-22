import pytest
from app import app

@pytest.fixture
def client():
  client = app.test_client()
  return client

def test_home_page(client):
  response = client.get('/')
  assert response.status_code == 200

def test_validate_login(client):
    response = client.get('/login/sk123/123')
    assert response.status_code == 200

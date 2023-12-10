import requests
from unittest import TestCase

URL = "http://127.0.0.1:8000"

class TestEndpoints(TestCase):
    def test_login_success(self): # test login with correct credentials
        response = requests.get(URL + "/login?username=test&password=test")
        assert response.status_code == 200
        assert response.json() == {"username": "test"}

    def test_login_fail_creds(self): # test login with incorrect credentials
        response = requests.get(URL + "/login?username=test&password=wrong")
        assert response.status_code == 200
        assert response.json() == {"msg": "incorrect password"}

    def test_login_fail_user(self): # test login with incorrect username
        response = requests.get(URL + "/login?username=wrong&password=test")
        assert response.status_code == 200
        assert response.json() == {"msg": "incorrect username"}

    def test_register_fail(self): # test register with existing username
        response = requests.post(URL + "/register?username=test&password=test")
        assert response.status_code == 200
        assert response.json() == {"msg": "username already exists"}

    def test_search_track(self): # test search for track
        response = requests.get(URL + "/search?query=hello&search_type=track")
        assert response.status_code == 200
        assert response.json()['0'] == {
        "id": "62PaSfnXSMyLshYJrlTuL3",
        "name": "Hello",
        "artist": "Adele",
        "album": "25",
        "image": "https://i.scdn.co/image/ab67616d0000b27347ce408fb4926d69da6713c2"
    }
        
    def test_search_album(self): # test search for album
        response = requests.get(URL + "/search?query=hello&search_type=album")
        assert response.status_code == 200
        assert response.json()['0'] == {
        "id": "7D8GwKhqPfHGG9zmz8U6Eq",
        "name": "Hello, Dolly!",
        "artist": "Jerry Herman",
        "image": "https://i.scdn.co/image/ab67616d0000b273ff47cd27d409588ecc01d81f"
    }
        
    def test_search_artist(self): # test search for artist
        response = requests.get(URL + "/search?query=hello&search_type=artist")
        assert response.status_code == 200
        assert response.json()['0'] == {
        "id": "6GH0NzpthMGxu1mcfAkOde",
        "name": "Hellogoodbye",
        "image": "https://i.scdn.co/image/ab6761610000e5eb9e362c45d22e594e532969d9"
    }
        
    def test_search_fail(self): # test search for invalid type
        response = requests.get(URL + "/search?query=hello&search_type=invalid")
        assert response.status_code == 404
        assert response.json() == {"detail": "Not a valid search type"}

    def test_search_no_pictures(self): # test search for artist with no pictures - we had a problem with this early on
        response = requests.get(URL + "/search?query=macmiller&search_type=artist")
        assert response.status_code == 200
        assert response.json()['3'] == {
        "id": "4Oxnz92P2gKL1nit6Us2jI",
        "name": "Mac Miller & The Atlanta Playground Singers",
        "image": ""
    }

    def test_submit_review_fail_type(self): # test submit review with invalid type
        response = requests.post(URL + "/submit-review?username=test&music_id=XXXXX&rating=1&review_type=invalid")
        assert response.status_code == 404
        assert response.json() == {"detail": "Not a valid review type"}

    def test_submit_review_fail_user(self): # test submit review with invalid user
        response = requests.post(URL + "/submit-review?username=wrong&music_id=XXXXX&rating=1&review_type=track")
        assert response.status_code == 404
        assert response.json() == {"detail": "User does not exist"}


from flask import Flask, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

WEB_ROOT = 'D:/learn/web'
USERS_FILE = os.path.join(WEB_ROOT, 'users.txt')

@app.route('/add-user', methods=['POST'])
def add_user():
    username = request.form.get('user')

    if username:
        try:
            with open(USERS_FILE, "a") as f:
                f.write(username + "\n")
            return "User added via Python", 200
        except Exception as e:
            return f"File system error: {str(e)}", 500
    
    return "No user provided", 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)
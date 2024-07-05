from flask import Flask, request, jsonify, session
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from config import Config
import mysql.connector

app = Flask(__name__)

app.config.from_object(Config)

mysql = MySQL(app)
bcrypt = Bcrypt(app)

cors = CORS(app, supports_credentials=True, origins='http://localhost:5173')


def options():
    response = app.response_class()
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.status_code = 200
    return response


@app.route('/register', methods=['POST', 'OPTIONS'])
def register():
    try:
        if request.method == 'OPTIONS':
            return options()
        
        data = request.get_json()
        cursor = mysql.connection.cursor()

        email = data['email']
        password = bcrypt.generate_password_hash(data['password'])

        
        cursor.execute("SELECT email FROM usuario WHERE email = %s", (email,))
        user = cursor.fetchone()

        if user:
            cursor.close()
            return jsonify({'message': 'Email already exists'}), 409

        
        cursor.execute("INSERT INTO usuario (email, senha) VALUES (%s, %s)", (email, password))
        mysql.connection.commit()

        cursor.close()

        return jsonify({'message': 'User registered successfully'}), 200
    
    except Exception as e:
        print(f"Error: {e}") 
        return jsonify({'message': str(e)}), 500

    

@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    try:
        if request.method == 'OPTIONS':
            return options()
        
        data = request.get_json()
        email = data['email']
        password = data['password']
        
        cursor = mysql.connection.cursor()

        cursor.execute("SELECT * FROM usuario WHERE email = %s", (email,))
        user = cursor.fetchone()

        cursor.close()
        
        if user:
            if bcrypt.check_password_hash(user[2], password):

                session['logged_in'] = True
                session['username'] = email

                return jsonify({'message': 'Login successful', 'session': 'true'}), 200
            else:
                return jsonify({'message': 'Invalid password'}), 401
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug=True)

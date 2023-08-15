from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://web:123123@Brhom/students?driver=ODBC+Driver+17+for+SQL+Server'

db = SQLAlchemy(app)
CORS(app)

class Students(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    birthdate = db.Column(db.Date)
    photo = db.Column(db.String(255))
    password = db.Column(db.String(255))

@app.route('/register', methods=['POST'])
def register():
    required_fields = ['email', 'first_name', 'last_name', 'birthdate', 'password']

    # Check if all fields are provided
    for field in required_fields:
        if not request.form.get(field):
            return jsonify({'error': f'{field} is required'}), 400

    email = request.form['email']
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    birthdate = request.form['birthdate']
    password = request.form['password']
    photo = request.files['photo']

    if not photo:
        return jsonify({'error': 'photo is required'}), 400

    # Check if the email is already registered
    existing_student = Students.query.filter_by(email=email).first()
    if existing_student:
        return jsonify({'error': 'Email already registered'}), 400

    # password hash
    hashed_password = generate_password_hash(password)

    filename = secure_filename(photo.filename)
    photo_path = os.path.join('FrontEnd/student-registration-app/src/assets/Photos', filename)
    photo.save(photo_path)

    new_student = Students(
        email=email,
        first_name=first_name,
        last_name=last_name,
        birthdate=birthdate,
        photo=photo_path,
        password=hashed_password
    )

    db.session.add(new_student)
    db.session.commit()

    return jsonify({'message': 'Registration successful'}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    required_fields = ['email', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing {field} field'}), 400

    student = Students.query.filter_by(email=data['email']).first()
    if student is None or not check_password_hash(student.password, data['password']):
        return jsonify({'error': 'Incorrect email or password'}), 401

    return jsonify({'message': 'Login successful'}), 200

if __name__ == '__main__':
    app.run(debug=True)

#!/usr/bin/env python3
"""
Serveur API simple pour tester Postman - MyBankManager
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Données de test
users = [
    {
        "id": 1,
        "fullName": "Admin MyBank",
        "email": "admin@mybank.com",
        "password": "admin123",
        "role": "ADMIN",
        "createdAt": "2024-01-01T00:00:00"
    },
    {
        "id": 2,
        "fullName": "Ahmed Ben Ali",
        "email": "ahmed@email.com",
        "password": "password123",
        "role": "CLIENT",
        "createdAt": "2024-01-02T00:00:00"
    }
]

bank_accounts = [
    {
        "id": 1,
        "accountNumber": "MA123456789012345678901234",
        "accountType": "COURANT",
        "balance": 15420.00,
        "userId": 2,
        "status": "ACTIVE"
    }
]

@app.route('/')
def home():
    return jsonify({
        "message": "✅ API MyBankManager fonctionne !",
        "status": "success",
        "endpoints": [
            "GET /api/users",
            "POST /api/users/login",
            "GET /bankaccounts",
            "GET /api/test"
        ]
    })

@app.route('/api/test')
def test():
    return jsonify({
        "message": "✅ API MyBankManager fonctionne !",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(users)

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = next((u for u in users if u['id'] == user_id), None)
    if user:
        return jsonify(user)
    return jsonify({"error": "Utilisateur non trouvé"}), 404

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = {
        "id": len(users) + 1,
        "fullName": data.get('fullName'),
        "email": data.get('email'),
        "password": data.get('password'),
        "role": data.get('role', 'CLIENT'),
        "createdAt": datetime.now().isoformat()
    }
    users.append(new_user)
    return jsonify(new_user), 201

@app.route('/api/users/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = next((u for u in users if u['email'] == email and u['password'] == password), None)
    if user:
        return jsonify(user)
    return jsonify({"error": "Email ou mot de passe incorrect"}), 401

@app.route('/bankaccounts', methods=['GET'])
def get_bank_accounts():
    return jsonify(bank_accounts)

@app.route('/api/creditcards', methods=['GET'])
def get_credit_cards():
    return jsonify([
        {
            "id": 1,
            "cardNumber": "1234567890123456",
            "cardType": "VISA",
            "userId": 2,
            "status": "ACTIVE"
        }
    ])

@app.route('/api/loans', methods=['GET'])
def get_loans():
    return jsonify([
        {
            "id": 1,
            "loanType": "PERSONNEL",
            "amount": 50000.00,
            "status": "APPROUVE",
            "userId": 2
        }
    ])

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    return jsonify([
        {
            "id": 1,
            "transactionType": "DEPOT",
            "amount": 5000.00,
            "status": "COMPLETE",
            "userId": 2
        }
    ])

if __name__ == '__main__':
    print("🚀 Démarrage du serveur API MyBankManager...")
    print("📍 URL: http://localhost:8081")
    print("📋 Endpoints disponibles:")
    print("   - GET  http://localhost:8081/api/users")
    print("   - POST http://localhost:8081/api/users/login")
    print("   - GET  http://localhost:8081/bankaccounts")
    print("   - GET  http://localhost:8081/api/creditcards")
    print("   - GET  http://localhost:8081/api/loans")
    print("   - GET  http://localhost:8081/api/transactions")
    print("")
    print("✅ Prêt pour les tests Postman !")
    app.run(host='0.0.0.0', port=8081, debug=True) 
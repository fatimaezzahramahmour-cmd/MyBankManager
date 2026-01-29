# ✅ Guide Simple - Test Postman avec Java

## 🚀 **Démarrage du serveur :**

### **Option 1 : Script automatique**
```bash
# Double-cliquez sur start_simple_server.bat
```

### **Option 2 : Manuel**
```bash
javac SimpleBankApp.java
java SimpleBankApp
```

## 📋 **Test Postman - Endpoints**

### **Base URL :** `http://localhost:8081`
### **Headers :** `Content-Type: application/json`

### **1. Test de connexion**
```
GET http://localhost:8081/api/users
```

### **2. Connexion utilisateur**
```
POST http://localhost:8081/api/users/login
Content-Type: application/json

{
  "email": "admin@mybank.com",
  "password": "admin123"
}
```

### **3. Comptes bancaires**
```
GET http://localhost:8081/bankaccounts
```

### **4. Cartes de crédit**
```
GET http://localhost:8081/api/creditcards
```

### **5. Prêts**
```
GET http://localhost:8081/api/loans
```

### **6. Transactions**
```
GET http://localhost:8081/api/transactions
```

### **7. Test simple**
```
GET http://localhost:8081/api/test
```

## 🔧 **Vérifications**

### **Vérifier que le serveur fonctionne :**
```bash
# Vérifier le port 8081
netstat -an | findstr :8081

# Test rapide
curl -X GET http://localhost:8081/api/users
```

## 🎉 **Résultat attendu**

Une fois le serveur Java démarré, vous devriez voir :
```
🚀 Démarrage du serveur API MyBankManager...
📍 URL: http://localhost:8081
✅ Serveur démarré sur le port 8081
```

**Puis dans Postman, tous les endpoints devraient fonctionner !**

**Le serveur Java simple est maintenant prêt pour Postman !** 🎉 
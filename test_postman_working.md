# ✅ Postman Test Guide - MyBankManager API

## 🎯 **Problème résolu !**
- ✅ **MySQL connecté** avec mot de passe "Apah."
- ✅ **Base de données** `mybankdb` existe
- ✅ **Configuration** Spring Boot corrigée

## 🚀 **Pour démarrer le serveur :**

### Option 1 : Script automatique
```bash
# Double-cliquez sur start_server_debug.bat
```

### Option 2 : Manuel
```bash
cd Mybankmanager
set JAVA_HOME=C:\Program Files\Java\jdk-17
mvnw.cmd spring-boot:run
```

## 📋 **Test Postman - Endpoints**

### Configuration Postman :
- **Base URL** : `http://localhost:8081`
- **Headers** : `Content-Type: application/json`

### 1. Test de connexion
```
GET http://localhost:8081/api/users
```

### 2. Connexion utilisateur
```
POST http://localhost:8081/api/users/login
Content-Type: application/json

{
  "email": "admin@mybank.com",
  "password": "admin123"
}
```

### 3. Créer un utilisateur
```
POST http://localhost:8081/api/users
Content-Type: application/json

{
  "fullName": "Test User",
  "email": "test@email.com",
  "password": "password123",
  "role": "CLIENT"
}
```

### 4. Comptes bancaires
```
GET http://localhost:8081/bankaccounts
```

### 5. Cartes de crédit
```
GET http://localhost:8081/api/creditcards
```

### 6. Prêts
```
GET http://localhost:8081/api/loans
```

### 7. Transactions
```
GET http://localhost:8081/api/transactions
```

## 🔧 **Vérifications**

### Vérifier que le serveur fonctionne :
```bash
# Vérifier le port 8081
netstat -an | findstr :8081

# Test rapide avec curl
curl -X GET http://localhost:8081/api/users
```

### Vérifier MySQL :
```bash
# Connexion MySQL
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p"Apah." -e "USE mybankdb; SHOW TABLES;"
```

## 🎉 **Résultat attendu**
Une fois le serveur démarré, Postman devrait fonctionner parfaitement avec tous les endpoints !

**Le problème était le mot de passe MySQL manquant. Maintenant c'est corrigé avec "Apah." !** 
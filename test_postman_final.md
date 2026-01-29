# ✅ Guide Final - Test Postman avec Java

## 🎯 **Solution Java Spring Boot**

### **Pour démarrer le serveur :**
```bash
# Double-cliquez sur start_java_server.bat
# Ou manuellement :
cd Mybankmanager
set JAVA_HOME=C:\Program Files\Java\jdk-17
mvnw.cmd spring-boot:run
```

## 📋 **Endpoints Postman - Configuration**

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

### **3. Créer un utilisateur**
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

### **4. Comptes bancaires**
```
GET http://localhost:8081/bankaccounts
```

### **5. Cartes de crédit**
```
GET http://localhost:8081/api/creditcards
```

### **6. Prêts**
```
GET http://localhost:8081/api/loans
```

### **7. Transactions**
```
GET http://localhost:8081/api/transactions
```

## 🔧 **Vérifications**

### **Vérifier que le serveur fonctionne :**
```bash
# Vérifier le port 8081
netstat -an | findstr :8081

# Test rapide
curl -X GET http://localhost:8081/api/users
```

### **Vérifier MySQL :**
```bash
# Connexion MySQL
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p"Apah." -e "USE mybankdb; SHOW TABLES;"
```

## 🎉 **Résultat attendu**

Une fois le serveur Java démarré, Postman devrait fonctionner parfaitement !

**Le serveur Spring Boot avec Java est maintenant configuré correctement avec :**
- ✅ **MySQL** connecté avec mot de passe "Apah."
- ✅ **Contrôleurs** dans le bon package
- ✅ **Entités** et **Repositories** configurés
- ✅ **CORS** activé pour Postman

**Utilisez `start_java_server.bat` pour démarrer facilement !** 
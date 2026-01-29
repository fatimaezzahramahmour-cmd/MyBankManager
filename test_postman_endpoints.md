# Test Postman - Endpoints MyBankManager API

## Configuration Postman
- **Base URL**: `http://localhost:8081`
- **Headers**: `Content-Type: application/json`

## Endpoints à tester

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

### 4. Obtenir tous les utilisateurs
```
GET http://localhost:8081/api/users
```

### 5. Obtenir un utilisateur par ID
```
GET http://localhost:8081/api/users/1
```

### 6. Comptes bancaires
```
GET http://localhost:8081/bankaccounts
```

### 7. Cartes de crédit
```
GET http://localhost:8081/api/creditcards
```

### 8. Prêts
```
GET http://localhost:8081/api/loans
```

### 9. Transactions
```
GET http://localhost:8081/api/transactions
```

## Problèmes possibles et solutions

### 1. Serveur ne démarre pas
- Vérifier que MySQL est démarré
- Vérifier les credentials MySQL dans `application.properties`
- Vérifier que le port 8081 est libre

### 2. Erreur CORS
- Ajouter dans Postman: `Origin: http://localhost:8081`
- Ou modifier `@CrossOrigin(origins = "*")` dans les contrôleurs

### 3. Erreur de base de données
- Exécuter le script `setup_database.sql` dans MySQL
- Vérifier que la base `mybankdb` existe

### 4. Erreur de compilation
- Vérifier que Java 17 est installé
- Vérifier que Maven est installé
- Exécuter: `mvn clean compile`

## Test rapide avec curl
```bash
# Test de connexion
curl -X GET http://localhost:8081/api/users

# Test de login
curl -X POST http://localhost:8081/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mybank.com","password":"admin123"}'
```

## Vérification du serveur
```bash
# Vérifier si le port 8081 est utilisé
netstat -an | findstr :8081

# Vérifier les services Java
jps -l
``` 
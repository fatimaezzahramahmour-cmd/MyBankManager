# 🏦 Backend MyBankManager - Spring Boot

## 📋 Vue d'ensemble

Backend complet pour l'application bancaire MyBankManager, développé avec **Spring Boot** et **MySQL**. Ce backend fournit toutes les fonctionnalités demandées pour la gestion des utilisateurs, des prêts, des cartes de crédit et l'administration.

## 🏗️ Architecture

### Structure du projet
```
src/main/java/com/mybank/
├── MyBankApplication.java          # Classe principale Spring Boot
├── model/                          # Entités JPA
│   ├── User.java                   # Utilisateur
│   ├── BankAccount.java            # Compte bancaire
│   ├── Loan.java                   # Prêt
│   ├── CreditCard.java             # Carte de crédit
│   └── Transaction.java            # Transaction
├── repository/                     # Repositories JPA
│   ├── UserRepository.java
│   ├── BankAccountRepository.java
│   ├── LoanRepository.java
│   ├── CreditCardRepository.java
│   └── TransactionRepository.java
├── service/                        # Services métier
│   ├── UserService.java            # Gestion utilisateurs
│   ├── LoanService.java            # Gestion prêts
│   └── CreditCardService.java      # Gestion cartes
├── controller/                     # Contrôleurs REST
│   ├── AuthController.java         # Authentification
│   ├── LoanController.java         # API prêts
│   ├── CreditCardController.java   # API cartes
│   └── AdminController.java        # API admin
└── dto/                           # Data Transfer Objects
    ├── UserDTO.java
    ├── LoginRequest.java
    ├── RegisterRequest.java
    ├── LoanRequest.java
    └── CreditCardRequest.java
```

## 🚀 Fonctionnalités

### 🔐 Authentification
- **Inscription** : Création de compte utilisateur
- **Connexion** : Authentification sécurisée
- **Gestion des rôles** : CLIENT et ADMIN

### 💰 Gestion des Prêts
- **Soumission de demande** : Formulaire complet
- **Suivi des statuts** : EN_ATTENTE, APPROUVE, REFUSE
- **Validation** : Montant, taux, durée, paiements
- **Approbation/Refus** : Interface admin

### 💳 Gestion des Cartes de Crédit
- **Demande de carte** : Type, compte associé
- **Génération automatique** : Numéro de carte unique
- **Validation** : CVV, date d'expiration
- **Approbation/Refus** : Interface admin

### 👨‍💼 Administration
- **Dashboard complet** : Statistiques, utilisateurs
- **Gestion des demandes** : Prêts et cartes
- **Suivi des utilisateurs** : Liste, statistiques
- **Statistiques** : Compteurs par statut

## 🛠️ Technologies

- **Spring Boot 2.7.0** : Framework principal
- **Spring Data JPA** : Persistance des données
- **MySQL 8.0** : Base de données
- **Maven** : Gestion des dépendances
- **Java 17** : Langage de programmation

## 📦 Installation

### Prérequis
1. **Java 17** ou supérieur
2. **Maven 3.6** ou supérieur
3. **MySQL 8.0** ou supérieur
4. **Git** (optionnel)

### Étapes d'installation

#### 1. Configuration de la base de données
```sql
-- Créer la base de données
CREATE DATABASE mybankdb;
USE mybankdb;

-- Exécuter le script setup_database.sql
-- (déjà fourni dans le projet)
```

#### 2. Configuration de l'application
Modifier `src/main/resources/application.properties` :
```properties
# Adapter selon votre configuration MySQL
spring.datasource.username=votre_utilisateur
spring.datasource.password=votre_mot_de_passe
```

#### 3. Compilation et démarrage
```bash
# Compiler le projet
mvn clean compile

# Démarrer le serveur
mvn spring-boot:run
```

#### 4. Scripts automatiques
```bash
# Démarrer avec vérifications
start_backend_spring.bat

# Tester les endpoints
test_api_endpoints.bat
```

## 🌐 API Endpoints

### Authentification
```
POST /api/auth/register     # Inscription
POST /api/auth/login        # Connexion
GET  /api/auth/test         # Test API
```

### Prêts
```
GET    /api/loans                    # Tous les prêts
POST   /api/loans                    # Créer un prêt
GET    /api/loans/pending            # Prêts en attente
GET    /api/loans/user/{userId}      # Prêts d'un utilisateur
GET    /api/loans/{id}               # Détails d'un prêt
PUT    /api/loans/{id}/approve       # Approuver un prêt
PUT    /api/loans/{id}/reject        # Refuser un prêt
GET    /api/loans/stats              # Statistiques prêts
```

### Cartes de Crédit
```
GET    /api/creditcards                    # Toutes les cartes
POST   /api/creditcards                   # Créer une carte
GET    /api/creditcards/pending           # Cartes en attente
GET    /api/creditcards/user/{userId}     # Cartes d'un utilisateur
GET    /api/creditcards/{id}              # Détails d'une carte
PUT    /api/creditcards/{id}/approve      # Approuver une carte
PUT    /api/creditcards/{id}/reject       # Refuser une carte
GET    /api/creditcards/stats             # Statistiques cartes
```

### Administration
```
GET /api/admin/users        # Tous les utilisateurs
GET /api/admin/users/recent # Utilisateurs récents
GET /api/admin/stats        # Statistiques admin
GET /api/admin/test         # Test API admin
```

## 📊 Exemples d'utilisation

### Inscription d'un utilisateur
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Ahmed Ben Ali",
    "email": "ahmed@email.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Connexion
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmed@email.com",
    "password": "password123"
  }'
```

### Création d'un prêt
```bash
curl -X POST "http://localhost:8080/api/loans?userId=1" \
  -H "Content-Type: application/json" \
  -d '{
    "loanType": "PERSONNEL",
    "amount": 50000.00,
    "interestRate": 5.5,
    "durationMonths": 24,
    "monthlyPayment": 2200.00,
    "totalAmount": 52800.00
  }'
```

### Création d'une carte de crédit
```bash
curl -X POST "http://localhost:8080/api/creditcards?userId=1" \
  -H "Content-Type: application/json" \
  -d '{
    "cardType": "VISA",
    "bankAccountId": 1,
    "cvv": "123",
    "expiryDate": "2025-12-31"
  }'
```

## 🔧 Configuration

### Variables d'environnement
```properties
# Base de données
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mybankdb
DB_USER=root
DB_PASSWORD=

# Serveur
SERVER_PORT=8080
SERVER_CONTEXT=/api

# Logging
LOG_LEVEL=DEBUG
```

### Sécurité (Production)
- **Hachage des mots de passe** : BCrypt
- **JWT Tokens** : Authentification stateless
- **CORS** : Configuration restrictive
- **Validation** : Bean Validation
- **Rate Limiting** : Protection contre les attaques

## 🧪 Tests

### Tests unitaires
```bash
mvn test
```

### Tests d'intégration
```bash
# Démarrer le serveur
mvn spring-boot:run

# Dans un autre terminal
test_api_endpoints.bat
```

### Tests Postman
Collection disponible : `MyBankManager_API.postman_collection.json`

## 📈 Monitoring

### Logs
```bash
# Logs en temps réel
tail -f logs/application.log
```

### Métriques
- **Actuator** : Endpoints de monitoring
- **Health checks** : État du système
- **Metrics** : Performance et utilisation

## 🚀 Déploiement

### Développement
```bash
mvn spring-boot:run
```

### Production
```bash
# Build JAR
mvn clean package

# Exécution
java -jar target/mybankmanager-0.0.1-SNAPSHOT.jar
```

### Docker
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/mybankmanager-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
```

## 🔄 Intégration Frontend

### Configuration CORS
```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

### Appels API depuis le frontend
```javascript
// Exemple d'appel pour créer un prêt
async function createLoan(loanData) {
    try {
        const response = await fetch('http://localhost:8080/api/loans?userId=1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loanData)
        });
        
        const result = await response.json();
        if (result.success) {
            console.log('Prêt créé avec succès:', result.loan);
        } else {
            console.error('Erreur:', result.message);
        }
    } catch (error) {
        console.error('Erreur réseau:', error);
    }
}
```

## 📝 Documentation API

### Swagger/OpenAPI
```java
@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("MyBankManager API")
                        .version("1.0")
                        .description("API pour la gestion bancaire"));
    }
}
```

## 🐛 Dépannage

### Problèmes courants

#### 1. Erreur de connexion MySQL
```
Error: Communications link failure
```
**Solution** : Vérifier que MySQL est démarré et accessible

#### 2. Erreur de compilation
```
Error: Cannot resolve symbol
```
**Solution** : Nettoyer et recompiler
```bash
mvn clean compile
```

#### 3. Port déjà utilisé
```
Error: Web server failed to start. Port 8080 was already in use
```
**Solution** : Changer le port dans `application.properties`
```properties
server.port=8081
```

## 📞 Support

Pour toute question ou problème :
1. Vérifier les logs dans la console
2. Consulter la documentation Spring Boot
3. Tester les endpoints avec Postman
4. Vérifier la configuration de la base de données

## 🎯 Prochaines étapes

- [ ] Implémentation de JWT pour l'authentification
- [ ] Ajout de validation Bean Validation
- [ ] Tests unitaires complets
- [ ] Documentation Swagger
- [ ] Monitoring avec Actuator
- [ ] Sécurisation des endpoints
- [ ] Cache Redis pour les performances
- [ ] Notifications en temps réel

---

**✅ Backend Spring Boot complet et fonctionnel !**

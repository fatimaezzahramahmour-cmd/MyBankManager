# 🏦 MyBankManager - Système Bancaire Complet

## 📋 Vue d'ensemble

MyBankManager est une application bancaire complète avec :
- **Frontend** : Interface utilisateur moderne en HTML/CSS/JavaScript
- **Backend** : API REST avec Spring Boot
- **Base de données** : MySQL avec données de test

## 🚀 Démarrage Rapide

### Option 1 : Démarrage automatique
```bash
# Double-cliquez sur le fichier
start_complete_system.bat
```

### Option 2 : Démarrage manuel

#### 1. Base de données
```bash
# Créer la base de données
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS mybankdb;"

# Importer les données
mysql -u root -p mybankdb < fix_sql_error.sql
```

#### 2. Backend Spring Boot
```bash
cd Mybankmanager
mvnw.cmd spring-boot:run
```

#### 3. Frontend
Ouvrez `index.html` dans votre navigateur

## 🔗 URLs d'accès

- **Site principal** : http://localhost:8081
- **API Backend** : http://localhost:8081/api
- **Dashboard Admin** : http://localhost:8081/admin-dashboard.html
- **Page de connexion** : http://localhost:8081/connexion.html

## 👤 Comptes de test

### Administrateur
- **Email** : admin@mybank.com
- **Mot de passe** : admin123
- **Rôle** : ADMIN

### Client
- **Email** : ahmed@email.com
- **Mot de passe** : password123
- **Rôle** : CLIENT

## 🏗️ Architecture

### Frontend
```
📁 Pages HTML
├── index.html (Accueil)
├── connexion.html (Connexion)
├── inscription.html (Inscription)
├── admin-dashboard.html (Dashboard Admin)
├── comptes.html (Gestion des comptes)
├── prets.html (Demande de prêts)
└── cartes.html (Cartes bancaires)

📁 Styles CSS
├── style.css (Styles principaux)
├── new-styles.css (Styles modernes)
└── script.js (JavaScript frontend)
```

### Backend Spring Boot
```
📁 Contrôleurs
├── UserController.java (Gestion utilisateurs)
├── BankAccountController.java (Comptes bancaires)
├── LoanController.java (Prêts)
├── CreditCardController.java (Cartes de crédit)
├── TransactionController.java (Transactions)
└── AdminController.java (Administration)

📁 Entités
├── User.java (Utilisateur)
├── BankAccount.java (Compte bancaire)
├── Loan.java (Prêt)
├── CreditCard.java (Carte de crédit)
└── Transaction.java (Transaction)

📁 Repositories
├── UserRepository.java
├── BankAccountRepository.java
├── LoanRepository.java
├── CreditCardRepository.java
└── TransactionRepository.java
```

### Base de données MySQL
```
📊 Tables
├── users (Utilisateurs)
├── bank_accounts (Comptes bancaires)
├── credit_cards (Cartes de crédit)
├── loans (Prêts)
└── transactions (Transactions)
```

## 🔧 API Endpoints

### Utilisateurs
- `GET /api/users` - Liste des utilisateurs
- `POST /api/users/login` - Connexion
- `POST /api/users` - Créer un utilisateur
- `GET /api/users/{id}` - Utilisateur par ID
- `PUT /api/users/{id}` - Modifier un utilisateur
- `DELETE /api/users/{id}` - Supprimer un utilisateur

### Comptes bancaires
- `GET /bankaccounts` - Liste des comptes
- `POST /bankaccounts` - Créer un compte
- `GET /bankaccounts/{id}` - Compte par ID
- `PUT /bankaccounts/{id}` - Modifier un compte
- `DELETE /bankaccounts/{id}` - Supprimer un compte

### Administration
- `GET /api/admin/dashboard` - Statistiques dashboard
- `GET /api/admin/users` - Tous les utilisateurs
- `GET /api/admin/loans/pending` - Prêts en attente
- `PUT /api/admin/loans/{id}/approve` - Approuver un prêt
- `PUT /api/admin/loans/{id}/reject` - Refuser un prêt

## 🛠️ Configuration

### Base de données
```properties
# application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/mybankdb
spring.datasource.username=root
spring.datasource.password=Apah.
spring.jpa.hibernate.ddl-auto=validate
server.port=8081
```

### Frontend
```javascript
// api.js
const API_BASE_URL = 'http://localhost:8081';
```

## 📊 Fonctionnalités

### ✅ Implémentées
- [x] Connexion utilisateur
- [x] Gestion des comptes bancaires
- [x] Demande de prêts
- [x] Dashboard administrateur
- [x] API REST complète
- [x] Base de données MySQL
- [x] Interface utilisateur responsive

### 🔄 En cours
- [ ] Système de paiement
- [ ] Notifications push
- [ ] Rapports PDF
- [ ] Sécurité renforcée

## 🐛 Dépannage

### Problème : Base de données non accessible
```bash
# Vérifier MySQL
mysql --version

# Redémarrer MySQL
net start mysql
```

### Problème : Backend ne démarre pas
```bash
# Vérifier Java
java --version

# Nettoyer et recompiler
cd Mybankmanager
mvnw.cmd clean compile
```

### Problème : Erreurs CORS
```java
// Ajouter dans les contrôleurs
@CrossOrigin(origins = "*")
```

## 📝 Notes de développement

### Structure des données
- Les mots de passe sont stockés en clair (à améliorer en production)
- Les IDs sont auto-incrémentés
- Les timestamps sont automatiques

### Sécurité
- CORS activé pour le développement
- Validation côté client et serveur
- Gestion des erreurs HTTP appropriée

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

**MyBankManager** - Votre partenaire bancaire de confiance 🏦 
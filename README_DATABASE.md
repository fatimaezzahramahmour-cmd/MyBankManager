# 🏦 MyBankManager - Configuration Base de Données

## 📋 Prérequis

1. **MySQL** installé sur votre machine
2. **Java 17+** installé
3. **Maven** installé

## 🚀 Installation Rapide

### 1. Démarrer la Base de Données

```bash
# Windows
start_database.bat

# Linux/Mac
mysql -u root -pApah. < database_setup.sql
```

### 2. Démarrer l'Application

```bash
cd Mybankmanager
mvn spring-boot:run
```

### 3. Accéder à l'Application

- **Site principal :** http://localhost:8081
- **Dashboard Admin :** http://localhost:8081/admin-dashboard.html

## 📊 Structure de la Base de Données

### Tables Principales

#### 1. **users** - Utilisateurs
- `id` - Identifiant unique
- `full_name` - Nom complet
- `email` - Email (unique)
- `password` - Mot de passe
- `role` - Rôle (ADMIN/CLIENT)
- `created_at` - Date de création

#### 2. **bank_accounts** - Comptes Bancaires
- `id` - Identifiant unique
- `account_number` - Numéro de compte (unique)
- `account_type` - Type (COURANT/EPARGNE)
- `balance` - Solde
- `user_id` - Référence utilisateur
- `status` - Statut (ACTIVE/INACTIVE)

#### 3. **loans** - Prêts
- `id` - Identifiant unique
- `loan_type` - Type (PERSONNEL/IMMOBILIER/AUTO)
- `amount` - Montant
- `interest_rate` - Taux d'intérêt
- `duration_months` - Durée en mois
- `monthly_payment` - Mensualité
- `total_amount` - Montant total
- `user_id` - Référence utilisateur
- `status` - Statut (EN_ATTENTE/APPROUVE/REFUSE)

#### 4. **transactions** - Transactions
- `id` - Identifiant unique
- `transaction_type` - Type (DEPOT/RETRAIT/VIREMENT)
- `amount` - Montant
- `description` - Description
- `from_account_id` - Compte source
- `to_account_id` - Compte destination
- `user_id` - Référence utilisateur
- `status` - Statut (EN_COURS/COMPLETE/ECHEC)

## 🔧 Configuration

### Fichier `application.properties`

```properties
# Base de données MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/mybankdb
spring.datasource.username=root
spring.datasource.password=Apah.

# Configuration Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Port du serveur
server.port=8081
```

## 👥 Utilisateurs par Défaut

### Admin
- **Email :** admin@mybank.com
- **Mot de passe :** admin123
- **Rôle :** ADMIN

### Utilisateurs de Test
1. **Ahmed Ben Ali** - ahmed@email.com
2. **Fatima Zahra** - fatima@email.com  
3. **Mohammed Alami** - mohammed@email.com

## 📈 Fonctionnalités Admin

### Dashboard Admin
- **Statistiques générales** (utilisateurs, comptes, prêts, transactions)
- **Utilisateurs récents**
- **Prêts en attente**
- **Transactions récentes**

### Actions Disponibles
- ✅ **Voir tous les utilisateurs**
- ✅ **Approuver/Refuser des prêts**
- ✅ **Voir les détails des comptes**
- ✅ **Suivre les transactions**

## 🔗 API Endpoints

### Admin API (`/api/admin`)
- `GET /dashboard` - Statistiques générales
- `GET /users` - Liste de tous les utilisateurs
- `GET /users/{id}` - Détails d'un utilisateur
- `PUT /loans/{id}/status` - Mettre à jour le statut d'un prêt
- `GET /accounts/stats` - Statistiques des comptes
- `GET /transactions/recent` - Transactions récentes

## 🛠️ Dépannage

### Erreur de Connexion MySQL
```bash
# Vérifier que MySQL est démarré
net start mysql80

# Vérifier la connexion
mysql -u root -pApah.
```

### Erreur de Port
```bash
# Vérifier que le port 8081 est libre
netstat -an | findstr 8081

# Changer le port dans application.properties si nécessaire
server.port=8082
```

### Erreur de Base de Données
```bash
# Recréer la base de données
mysql -u root -pApah. -e "DROP DATABASE IF EXISTS mybankdb;"
mysql -u root -pApah. < database_setup.sql
```

## 📱 Interface Utilisateur

### Pages Disponibles
- **index.html** - Page d'accueil
- **connexion.html** - Connexion utilisateur
- **inscription.html** - Inscription utilisateur
- **comptes.html** - Gestion des comptes
- **prets.html** - Simulation de prêts
- **admin-dashboard.html** - Dashboard administrateur

## 🔐 Sécurité

- ✅ **Mots de passe hashés** (à implémenter)
- ✅ **Validation des données**
- ✅ **Gestion des rôles** (ADMIN/CLIENT)
- ✅ **Protection CORS**

## 📞 Support

Pour toute question ou problème :
1. Vérifiez les logs de l'application
2. Consultez la console du navigateur
3. Vérifiez la connexion à la base de données

---

**🎯 Votre base de données est maintenant prête ! Quand quelqu'un s'inscrit, les données apparaîtront automatiquement chez l'admin !** 
# 🔗 Guide de connexion MySQL Workbench

## 📋 Prérequis

### 1. Installation MySQL Workbench
- Téléchargez MySQL Workbench depuis : https://dev.mysql.com/downloads/workbench/
- Installez-le sur votre système

### 2. Vérification MySQL Server
Assurez-vous que MySQL Server est installé et en cours d'exécution.

## 🔧 Configuration de la connexion

### Étape 1 : Créer une nouvelle connexion

1. **Ouvrir MySQL Workbench**
2. **Cliquer sur le "+"** à côté de "MySQL Connections"
3. **Remplir les informations :**
   ```
   Connection Name: MyBankManager
   Hostname: localhost
   Port: 3306
   Username: root
   Password: Apah.
   ```

### Étape 2 : Tester la connexion

1. **Cliquer sur "Test Connection"**
2. **Vérifier que vous obtenez :**
   ```
   Successfully made the MySQL connection
   ```

### Étape 3 : Se connecter

1. **Double-cliquer sur la connexion "MyBankManager"**
2. **Entrer le mot de passe si demandé**

## 🧪 Test de la base de données

### Étape 1 : Vérifier la base de données

```sql
-- Vérifier que mybankdb existe
SHOW DATABASES;
```

### Étape 2 : Utiliser la base de données

```sql
-- Se connecter à la base de données
USE mybankdb;
```

### Étape 3 : Vérifier les tables

```sql
-- Voir toutes les tables
SHOW TABLES;
```

Vous devriez voir :
- `users`
- `bank_accounts`
- `credit_cards`
- `loans`
- `transactions`

### Étape 4 : Exécuter le script de test

1. **Ouvrir le fichier `test_mysql_connection.sql`**
2. **Copier tout le contenu**
3. **Coller dans MySQL Workbench**
4. **Exécuter le script (Ctrl+Shift+Enter)**

## 📊 Vérification des données

### Test des utilisateurs
```sql
SELECT * FROM users;
```

Résultat attendu :
```
+----+----------------+---------------------+------------+--------+---------------------+
| id | full_name      | email               | password   | role   | created_at          |
+----+----------------+---------------------+------------+--------+---------------------+
|  1 | Admin MyBank   | admin@mybank.com    | admin123   | ADMIN  | 2024-01-01 00:00:00 |
|  2 | Ahmed Ben Ali  | ahmed@email.com     | password123| CLIENT | 2024-01-01 00:00:00 |
|  3 | Fatima Zahra   | fatima@email.com    | password123| CLIENT | 2024-01-01 00:00:00 |
|  4 | Mohammed Alami | mohammed@email.com  | password123| CLIENT | 2024-01-01 00:00:00 |
+----+----------------+---------------------+------------+--------+---------------------+
```

### Test des comptes bancaires
```sql
SELECT * FROM bank_accounts;
```

### Test des prêts
```sql
SELECT * FROM loans;
```

## 🔍 Diagnostic des problèmes

### Problème 1 : Connexion refusée
```
Error: Can't connect to MySQL server on 'localhost'
```

**Solution :**
1. Vérifier que MySQL Server est démarré
2. Vérifier le port (3306)
3. Vérifier le mot de passe

### Problème 2 : Base de données n'existe pas
```
Error: Unknown database 'mybankdb'
```

**Solution :**
```sql
-- Créer la base de données
CREATE DATABASE mybankdb;

-- Importer les données
SOURCE fix_sql_error.sql;
```

### Problème 3 : Tables vides
```
Query returned empty set
```

**Solution :**
```sql
-- Réimporter les données
SOURCE fix_sql_error.sql;
```

## 🎯 Tests avancés

### Test de connexion avec l'application
```sql
-- Vérifier que les comptes de connexion existent
SELECT email, password, role 
FROM users 
WHERE email IN ('admin@mybank.com', 'ahmed@email.com');
```

### Test des relations
```sql
-- Vérifier les comptes d'un utilisateur
SELECT u.full_name, ba.account_number, ba.balance
FROM users u
JOIN bank_accounts ba ON u.id = ba.user_id
WHERE u.email = 'ahmed@email.com';
```

### Test des contraintes
```sql
-- Vérifier les clés étrangères
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE TABLE_SCHEMA = 'mybankdb' 
AND REFERENCED_TABLE_NAME IS NOT NULL;
```

## 📈 Monitoring en temps réel

### Vérifier les nouvelles données
```sql
-- Voir les dernières transactions
SELECT * FROM transactions ORDER BY created_at DESC LIMIT 5;

-- Voir les nouveaux utilisateurs
SELECT * FROM users ORDER BY created_at DESC LIMIT 5;
```

### Statistiques en temps réel
```sql
-- Statistiques générales
SELECT 
    'Utilisateurs' as type, COUNT(*) as nombre FROM users
UNION ALL
SELECT 'Comptes', COUNT(*) FROM bank_accounts
UNION ALL
SELECT 'Prêts', COUNT(*) FROM loans
UNION ALL
SELECT 'Transactions', COUNT(*) FROM transactions;
```

## ✅ Checklist de vérification

- [ ] MySQL Workbench installé
- [ ] Connexion créée et testée
- [ ] Base de données `mybankdb` existe
- [ ] Toutes les tables sont présentes
- [ ] Les données de test sont importées
- [ ] Les comptes de connexion existent
- [ ] Les relations entre tables fonctionnent
- [ ] Le script de test s'exécute sans erreur

## 🎉 Résultat attendu

Si tout fonctionne correctement, vous devriez voir :
```
✅ CONNEXION MYSQL WORKBENCH RÉUSSIE !
```

Et pouvoir :
- ✅ Voir toutes les tables
- ✅ Voir les données de test
- ✅ Exécuter des requêtes
- ✅ Modifier les données
- ✅ Surveiller les changements

---

**Votre base de données est maintenant prête pour l'application MyBankManager ! 🏦** 
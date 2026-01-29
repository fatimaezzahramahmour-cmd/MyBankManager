# 🔧 Guide de dépannage Postman - MyBankManager API

## ❌ Problèmes courants et solutions

### 1. **Erreur "Connection refused" ou "Unable to connect"**

**Cause :** Le serveur n'est pas démarré

**Solution :**
```bash
# Démarrer le serveur
node simple_server.js
```

**Vérification :**
```bash
# Vérifier si le port 8081 est utilisé
netstat -an | findstr :8081
```

---

### 2. **Erreur "Invalid JSON"**

**Cause :** Format JSON incorrect dans le body

**Solution :**
- Vérifier que le Content-Type est `application/json`
- Vérifier la syntaxe JSON (guillemets doubles, virgules)

**Exemple correct :**
```json
{
  "email": "admin@mybank.com",
  "password": "admin123"
}
```

---

### 3. **Erreur "401 Unauthorized"**

**Cause :** Token d'authentification manquant ou incorrect

**Solution :**
- Ajouter le header : `Authorization: Bearer admin_token_12345`
- Vérifier que le token est correct

---

### 4. **Erreur "403 Forbidden"**

**Cause :** Droits insuffisants pour l'endpoint

**Solution :**
- Utiliser le token admin pour les endpoints protégés
- Vérifier que vous êtes connecté en tant qu'admin

---

### 5. **Erreur "404 Not Found"**

**Cause :** URL incorrecte

**Solution :**
- Vérifier l'URL complète : `http://localhost:8081/api/test`
- Vérifier que le serveur est sur le port 8081

---

## 🚀 Instructions étape par étape

### **Étape 1 : Vérifier que le serveur fonctionne**

1. Ouvrir PowerShell dans le dossier du projet
2. Exécuter : `node simple_server.js`
3. Vérifier le message : `✅ Serveur démarré sur le port 8081`

### **Étape 2 : Importer la collection Postman**

1. Ouvrir Postman
2. Cliquer sur "Import"
3. Sélectionner le fichier `postman_test_collection.json`
4. La collection sera importée avec toutes les requêtes

### **Étape 3 : Configurer les variables**

1. Dans Postman, aller dans "Variables"
2. Vérifier que `baseUrl` = `http://localhost:8081`
3. Vérifier que `adminToken` = `admin_token_12345`

### **Étape 4 : Tester dans l'ordre**

1. **Test de base :** `1. Test de connexion`
2. **Connexion :** `2. Connexion Admin`
3. **Dashboard :** `6. Dashboard Admin`
4. **Demande :** `10. Soumettre demande de prêt`
5. **Voir demandes :** `12. Liste des demandes (Admin)`

---

## 📋 Tests rapides avec curl (alternative)

Si Postman ne fonctionne pas, utilisez curl :

```bash
# Test de base
curl http://localhost:8081/api/test

# Connexion admin
curl -X POST http://localhost:8081/api/users/login -H "Content-Type: application/json" -d "{\"email\":\"admin@mybank.com\",\"password\":\"admin123\"}"

# Dashboard admin
curl http://localhost:8081/api/admin/dashboard
```

---

## 🔍 Vérifications de diagnostic

### **Vérifier le serveur :**
```bash
# Vérifier si Node.js est installé
node --version

# Vérifier si le port est libre
netstat -an | findstr :8081

# Vérifier les logs du serveur
# (dans la console où le serveur est démarré)
```

### **Vérifier Postman :**
1. Vérifier que l'URL est correcte
2. Vérifier les headers (Content-Type: application/json)
3. Vérifier le body JSON
4. Vérifier les variables de collection

---

## 🎯 Endpoints de test prioritaires

### **1. Test de connexion (GET)**
```
URL: http://localhost:8081/api/test
Méthode: GET
Headers: Aucun
```

**Réponse attendue :**
```json
{
  "status": "success",
  "message": "Server is running"
}
```

### **2. Connexion admin (POST)**
```
URL: http://localhost:8081/api/users/login
Méthode: POST
Headers: Content-Type: application/json
Body: {
  "email": "admin@mybank.com",
  "password": "admin123"
}
```

**Réponse attendue :**
```json
{
  "status": "success",
  "message": "Connexion réussie",
  "user": {
    "id": "admin",
    "email": "admin@mybank.com",
    "name": "Administrateur",
    "role": "admin"
  }
}
```

### **3. Dashboard admin (GET)**
```
URL: http://localhost:8081/api/admin/dashboard
Méthode: GET
Headers: Aucun
```

**Réponse attendue :**
```json
{
  "status": "success",
  "message": "Dashboard Admin",
  "data": {
    "totalUsers": 150,
    "totalAccounts": 320,
    "totalLoans": 45,
    "recentTransactions": 12
  }
}
```

---

## 🆘 Si rien ne fonctionne

### **Redémarrer complètement :**

1. **Arrêter tous les serveurs :**
   ```bash
   # Ctrl+C dans toutes les consoles
   # Ou utiliser le script
   stop_server.bat
   ```

2. **Vérifier qu'aucun processus n'utilise le port :**
   ```bash
   netstat -ano | findstr :8081
   ```

3. **Redémarrer le serveur :**
   ```bash
   node simple_server.js
   ```

4. **Tester avec curl d'abord :**
   ```bash
   curl http://localhost:8081/api/test
   ```

5. **Puis tester avec Postman**

---

## 📞 Support

Si les problèmes persistent :
1. Vérifier les logs du serveur
2. Vérifier que Node.js est installé
3. Vérifier que le port 8081 n'est pas utilisé par un autre service
4. Redémarrer Postman et le serveur

const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = 8081;

// Stockage en mémoire des connexions utilisateurs (en production, ce serait une base de données)
let userConnections = [];
let userSessions = [];
let adminDemandes = []; // Stockage des demandes côté serveur

// Fonction pour sauvegarder une connexion utilisateur
function saveUserConnection(userData) {
    const connection = {
        id: Date.now(),
        userId: userData.id,
        email: userData.email,
        fullName: userData.name,
        role: userData.role,
        connectionTime: new Date().toISOString(),
        status: 'ACTIVE',
        lastActivity: new Date().toISOString()
    };
    
    // Vérifier si l'utilisateur existe déjà
    const existingIndex = userConnections.findIndex(conn => conn.email === userData.email);
    if (existingIndex !== -1) {
        // Mettre à jour la connexion existante
        userConnections[existingIndex] = {
            ...userConnections[existingIndex],
            connectionTime: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            status: 'ACTIVE'
        };
    } else {
        // Ajouter une nouvelle connexion
        userConnections.push(connection);
    }
    
    console.log('📊 Connexion utilisateur enregistrée:', connection.email);
    return connection;
}

// Fonction pour sauvegarder une demande
function saveDemande(demandeData) {
    const demande = {
        id: Date.now().toString(),
        ...demandeData,
        dateSoumission: new Date().toISOString(),
        statut: 'en_attente',
        traitee: false
    };
    
    adminDemandes.push(demande);
    console.log('📝 Demande sauvegardée côté serveur:', demande.type, 'de', demande.email);
    
    return demande;
}

// Fonction pour obtenir toutes les demandes
function getAllDemandes() {
    return adminDemandes;
}

// Fonction pour mettre à jour l'activité d'un utilisateur
function updateUserActivity(email) {
    const userIndex = userConnections.findIndex(conn => conn.email === email);
    if (userIndex !== -1) {
        userConnections[userIndex].lastActivity = new Date().toISOString();
    }
}

// Fonction pour déconnecter un utilisateur
function disconnectUser(email) {
    const userIndex = userConnections.findIndex(conn => conn.email === email);
    if (userIndex !== -1) {
        userConnections[userIndex].status = 'INACTIVE';
        userConnections[userIndex].lastActivity = new Date().toISOString();
        console.log('📊 Déconnexion utilisateur enregistrée:', email);
    }
}

// Fonction pour servir les fichiers statiques
function serveStaticFile(res, filePath, contentType) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

// Fonction pour envoyer une réponse JSON
function sendJsonResponse(res, data) {
    const jsonData = JSON.stringify(data);
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(jsonData, 'utf8'),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(jsonData);
}

// Fonction pour lire le body de la requête
function readRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                resolve(data);
            } catch (error) {
                resolve(querystring.parse(body));
            }
        });
        req.on('error', reject);
    });
}

const server = http.createServer(async (req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    // Gestion des requêtes OPTIONS (CORS)
    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
            'Content-Length': '0'
        });
        res.end();
        return;
    }

    // API Endpoints
    if (req.url === '/api/test' && req.method === 'GET') {
        sendJsonResponse(res, { status: 'success', message: 'Server is running' });
        return;
    }

    // Endpoint de connexion (login)
    if (req.url === '/api/login' && req.method === 'POST') {
        try {
            const loginData = await readRequestBody(req);
            console.log('🔐 Tentative de connexion:', loginData.email);
            
            // Vérification des identifiants
            if (loginData.email === 'admin@mybank.com' && loginData.password === 'admin123') {
                const userData = {
                    id: 'admin',
                    email: 'admin@mybank.com',
                    fullName: 'Administrateur',
                    role: 'ADMIN',
                    status: 'ACTIVE'
                };
                
                const connection = saveUserConnection(userData);
                
                sendJsonResponse(res, {
                    success: true,
                    message: 'Connexion réussie',
                    user: userData,
                    token: 'admin_token_12345'
                });
                console.log('✅ Connexion admin réussie');
            } else if (loginData.email === 'client@example.com' && loginData.password === 'client123') {
                const userData = {
                    id: 'user1',
                    email: 'client@example.com',
                    fullName: 'Client Test',
                    role: 'CLIENT',
                    status: 'ACTIVE'
                };
                
                const connection = saveUserConnection(userData);
                
                sendJsonResponse(res, {
                    success: true,
                    message: 'Connexion réussie',
                    user: userData,
                    token: 'client_token_67890'
                });
                console.log('✅ Connexion client réussie');
            } else {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: false,
                    message: 'Email ou mot de passe incorrect',
                    error: 'INVALID_CREDENTIALS',
                    code: 401
                }));
                console.log('❌ Tentative de connexion échouée pour:', loginData.email);
            }
        } catch (error) {
            console.error('❌ Erreur lors de la connexion:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                message: 'Erreur serveur lors de la connexion',
                error: 'SERVER_ERROR',
                code: 500
            }));
        }
        return;
    }

    // Endpoint de déconnexion
    if (req.url === '/api/logout' && req.method === 'POST') {
        try {
            const logoutData = await readRequestBody(req);
            disconnectUser(logoutData.email);
            
            sendJsonResponse(res, {
                success: true,
                message: 'Déconnexion réussie'
            });
            console.log('✅ Déconnexion réussie pour:', logoutData.email);
        } catch (error) {
            console.error('❌ Erreur lors de la déconnexion:', error);
            sendJsonResponse(res, {
                success: false,
                message: 'Erreur lors de la déconnexion'
            });
        }
        return;
    }

    // Endpoint pour soumettre une demande
    if (req.url === '/api/submit-demande' && req.method === 'POST') {
        try {
            const demandeData = await readRequestBody(req);
            console.log('📨 Demande reçue:', demandeData);
            console.log('📊 Type de demande:', demandeData.type);
            console.log('📊 Détails complets:', JSON.stringify(demandeData, null, 2));
            
            const demande = saveDemande(demandeData);
            console.log('💾 Demande sauvegardée avec ID:', demande.id);
            
            sendJsonResponse(res, {
                status: 'success',
                message: 'Demande soumise avec succès',
                demande: demande
            });
            console.log('✅ Réponse envoyée au client');
        } catch (error) {
            console.error('❌ Erreur lors de la soumission:', error);
            sendJsonResponse(res, {
                status: 'error',
                message: 'Erreur lors de la soumission de la demande'
            });
        }
        return;
    }

    // Fonction pour vérifier les tokens admin
    function verifyAdminToken(req) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return false;
        }
        const token = authHeader.split(' ')[1];
        return token === 'admin_token_12345';
    }

    // Endpoint pour récupérer toutes les demandes (admin)
    if (req.url === '/api/admin-demandes' && req.method === 'GET') {
        if (!verifyAdminToken(req)) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                message: 'Accès refusé - Droits administrateur requis',
                error: 'FORBIDDEN',
                code: 403
            }));
            return;
        }
        
        sendJsonResponse(res, {
            success: true,
            demandes: getAllDemandes()
        });
        return;
    }

    // Endpoint pour récupérer les demandes admin (nouveau format)
    if (req.url === '/api/admin/demandes' && req.method === 'GET') {
        if (!verifyAdminToken(req)) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                message: 'Accès refusé - Droits administrateur requis',
                error: 'FORBIDDEN',
                code: 403
            }));
            return;
        }
        
        sendJsonResponse(res, {
            success: true,
            demandes: getAllDemandes()
        });
        return;
    }

    // Endpoint pour approuver une demande (admin)
    if (req.url.match(/^\/api\/admin\/demandes\/.*\/approve$/) && req.method === 'PUT') {
        if (!verifyAdminToken(req)) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                message: 'Accès refusé - Droits administrateur requis',
                error: 'FORBIDDEN',
                code: 403
            }));
            return;
        }
        
        try {
            const demandeId = req.url.split('/')[4];
            const updateData = await readRequestBody(req);
            
            const demande = adminDemandes.find(d => d.id === demandeId);
            if (demande) {
                demande.statut = 'approuvee';
                demande.dateTraitement = new Date().toISOString();
                demande.commentaire = updateData.commentaire || '';
                
                sendJsonResponse(res, {
                    success: true,
                    message: 'Demande approuvée avec succès',
                    demande: demande
                });
                console.log('✅ Demande approuvée:', demandeId);
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: false,
                    message: 'Demande non trouvée',
                    error: 'NOT_FOUND',
                    code: 404
                }));
            }
        } catch (error) {
            console.error('❌ Erreur lors de l\'approbation:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                message: 'Erreur serveur lors de l\'approbation',
                error: 'SERVER_ERROR',
                code: 500
            }));
        }
        return;
    }

    // Endpoint pour refuser une demande (admin)
    if (req.url.match(/^\/api\/admin\/demandes\/.*\/reject$/) && req.method === 'PUT') {
        if (!verifyAdminToken(req)) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                message: 'Accès refusé - Droits administrateur requis',
                error: 'FORBIDDEN',
                code: 403
            }));
            return;
        }
        
        try {
            const demandeId = req.url.split('/')[4];
            const updateData = await readRequestBody(req);
            
            const demande = adminDemandes.find(d => d.id === demandeId);
            if (demande) {
                demande.statut = 'refusee';
                demande.dateTraitement = new Date().toISOString();
                demande.raison = updateData.raison || '';
                demande.commentaire = updateData.commentaire || '';
                
                sendJsonResponse(res, {
                    success: true,
                    message: 'Demande refusée',
                    demande: demande
                });
                console.log('❌ Demande refusée:', demandeId);
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: false,
                    message: 'Demande non trouvée',
                    error: 'NOT_FOUND',
                    code: 404
                }));
            }
        } catch (error) {
            console.error('❌ Erreur lors du refus:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                message: 'Erreur serveur lors du refus',
                error: 'SERVER_ERROR',
                code: 500
            }));
        }
        return;
    }

    // Endpoint pour les statistiques admin
    if (req.url === '/api/admin/stats' && req.method === 'GET') {
        if (!verifyAdminToken(req)) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                success: false,
                message: 'Accès refusé - Droits administrateur requis',
                error: 'FORBIDDEN',
                code: 403
            }));
            return;
        }
        
        const demandes = getAllDemandes();
        const stats = {
            totalDemandes: demandes.length,
            enAttente: demandes.filter(d => d.statut === 'en_attente').length,
            approuvees: demandes.filter(d => d.statut === 'approuvee').length,
            refusees: demandes.filter(d => d.statut === 'refusee').length,
            parType: {
                pret: demandes.filter(d => d.type === 'pret').length,
                carte: demandes.filter(d => d.type === 'carte').length,
                assurance: demandes.filter(d => d.type === 'assurance').length
            },
            urgentes: demandes.filter(d => {
                const requestDate = new Date(d.dateSoumission);
                const threeDaysAgo = new Date();
                threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
                return d.statut === 'en_attente' && requestDate < threeDaysAgo;
            }).length
        };
        
        sendJsonResponse(res, {
            success: true,
            stats: stats
        });
        return;
    }

    // Endpoint pour les connexions utilisateurs
    if (req.url === '/api/user-connections' && req.method === 'GET') {
        sendJsonResponse(res, {
            status: 'success',
            connections: userConnections
        });
        return;
    }

    // Endpoint pour enregistrer une connexion
    if (req.url === '/api/connect' && req.method === 'POST') {
        try {
            const userData = await readRequestBody(req);
            const connection = saveUserConnection(userData);
            
            sendJsonResponse(res, {
                status: 'success',
                message: 'Connexion enregistrée',
                connection: connection
            });
        } catch (error) {
            console.error('❌ Erreur lors de l\'enregistrement de la connexion:', error);
            sendJsonResponse(res, {
                status: 'error',
                message: 'Erreur lors de l\'enregistrement de la connexion'
            });
        }
        return;
    }

    // Endpoint pour déconnecter un utilisateur
    if (req.url === '/api/disconnect' && req.method === 'POST') {
        try {
            const { email } = await readRequestBody(req);
            disconnectUser(email);
            
            sendJsonResponse(res, {
                status: 'success',
                message: 'Déconnexion enregistrée'
            });
        } catch (error) {
            console.error('❌ Erreur lors de la déconnexion:', error);
            sendJsonResponse(res, {
                status: 'error',
                message: 'Erreur lors de la déconnexion'
            });
        }
        return;
    }

    // Routes API
    if (req.url === '/api/test') {
        const response = {
            status: "success",
            message: "Backend connecté avec succès!",
            timestamp: new Date().toISOString(),
            server: "Node.js Simple Server"
        };
        sendJsonResponse(res, response);
        return;
    }

    if (req.url === '/api/users') {
        const response = {
            status: "success",
            message: "Liste des utilisateurs",
            data: ["Utilisateur 1", "Utilisateur 2", "Utilisateur 3"],
            count: 3
        };
        sendJsonResponse(res, response);
        return;
    }

    // Endpoints Admin
    if (req.url === '/api/admin/dashboard') {
        const response = {
            status: "success",
            message: "Dashboard Admin",
            data: {
                totalUsers: 150,
                totalAccounts: 320,
                totalLoans: 45,
                recentTransactions: 12
            }
        };
        sendJsonResponse(res, response);
        return;
    }

    if (req.url === '/api/admin/users') {
        const response = {
            status: "success",
            message: "Liste des utilisateurs admin",
            data: [
                { id: 1, name: "Admin User", email: "admin@mybank.com", role: "admin" },
                { id: 2, name: "Manager", email: "manager@mybank.com", role: "manager" }
            ]
        };
        sendJsonResponse(res, response);
        return;
    }

    if (req.url === '/api/admin/loans') {
        const response = {
            status: "success",
            message: "Liste des prêts",
            data: [
                { id: 1, amount: 50000, status: "pending", user: "User 1" },
                { id: 2, amount: 75000, status: "approved", user: "User 2" }
            ]
        };
        sendJsonResponse(res, response);
        return;
    }

    if (req.url === '/api/admin/transactions/recent') {
        const response = {
            status: "success",
            message: "Transactions récentes",
            data: [
                { id: 1, amount: 1000, type: "deposit", date: "2025-08-05" },
                { id: 2, amount: 500, type: "withdrawal", date: "2025-08-05" }
            ]
        };
        sendJsonResponse(res, response);
        return;
    }

    // Endpoint de connexion
    if (req.url === '/api/users/login' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const loginData = JSON.parse(body);
                console.log('🔐 Tentative de connexion:', loginData.email);
                
                // Vérification simple (en production, ceci serait une vraie base de données)
                if (loginData.email && loginData.password) {
                    const isAdmin = loginData.email === 'admin@mybank.com' || loginData.email === 'admin@mybankmanager.com';
                    
                    const userData = {
                        id: isAdmin ? 'admin' : Date.now(),
                        email: loginData.email,
                        name: isAdmin ? 'Administrateur' : loginData.email.split('@')[0],
                        role: isAdmin ? 'admin' : 'client'
                    };
                    
                    // Sauvegarder la connexion utilisateur (sauf pour l'admin)
                    if (!isAdmin) {
                        saveUserConnection(userData);
                    }
                    
                    const response = {
                        status: "success",
                        message: "Connexion réussie",
                        user: userData
                    };
                    console.log('✅ Connexion réussie pour:', loginData.email);
                    sendJsonResponse(res, response);
                } else {
                    const response = {
                        status: "error",
                        message: "Email ou mot de passe invalide"
                    };
                    console.log('❌ Connexion échouée pour:', loginData.email);
                    sendJsonResponse(res, response);
                }
            } catch (error) {
                console.error('❌ Erreur parsing login:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: "error", message: "Données invalides" }));
            }
        });
        return;
    }

    // Endpoint pour mettre à jour l'activité d'un utilisateur
    if (req.url === '/api/users/activity' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const activityData = JSON.parse(body);
                if (activityData.email) {
                    updateUserActivity(activityData.email);
                    sendJsonResponse(res, { status: "success", message: "Activité mise à jour" });
                } else {
                    sendJsonResponse(res, { status: "error", message: "Email requis" });
                }
            } catch (error) {
                console.error('❌ Erreur mise à jour activité:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: "error", message: "Données invalides" }));
            }
        });
        return;
    }

    // Endpoint d'inscription
    if (req.url === '/api/users/register' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const registerData = JSON.parse(body);
                console.log('📝 Tentative d\'inscription:', registerData.email);
                
                // Vérification simple
                if (registerData.email && registerData.password) {
                    // Empêcher l'inscription avec l'email admin
                    if (registerData.email === 'admin@mybank.com' || registerData.email === 'admin@mybankmanager.com') {
                        const response = {
                            status: "error",
                            message: "Cet email est réservé à l'administration"
                        };
                        console.log('❌ Inscription refusée (email admin):', registerData.email);
                        sendJsonResponse(res, response);
                        return;
                    }
                    
                    const response = {
                        status: "success",
                        message: "Inscription réussie",
                        user: {
                            id: Date.now(),
                            email: registerData.email,
                            name: registerData.fullName || registerData.email.split('@')[0],
                            role: 'client'
                        }
                    };
                    console.log('✅ Inscription réussie pour:', registerData.email);
                    sendJsonResponse(res, response);
                } else {
                    const response = {
                        status: "error",
                        message: "Données d'inscription invalides"
                    };
                    console.log('❌ Inscription échouée (données invalides):', registerData.email);
                    sendJsonResponse(res, response);
                }
            } catch (error) {
                console.error('❌ Erreur parsing register:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: "error", message: "Données invalides" }));
            }
        });
        return;
    }

    // Page d'accueil
    if (req.url === '/' || req.url === '/index.html') {
        const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyBankManager Backend</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 50px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            max-width: 800px;
            margin: 0 auto;
        }
        .success { color: #28a745; font-weight: bold; }
        .endpoint {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            border-left: 4px solid #28a745;
        }
        a { color: #fff; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <h1>✅ MyBankManager Backend - Connecté!</h1>
        <p class="success">Le serveur fonctionne correctement sur le port ${PORT}</p>
        
        <h2>🌐 Endpoints disponibles:</h2>
        <div class="endpoint">
            <strong><a href="/api/test">/api/test</a></strong> - Test de connexion
        </div>
        <div class="endpoint">
            <strong><a href="/api/users">/api/users</a></strong> - Liste des utilisateurs
        </div>
        <div class="endpoint">
            <strong><a href="/api/admin/dashboard">/api/admin/dashboard</a></strong> - Dashboard Admin
        </div>
        <div class="endpoint">
            <strong><a href="/api/admin/users">/api/admin/users</a></strong> - Utilisateurs Admin
        </div>
        <div class="endpoint">
            <strong><a href="/api/admin/loans">/api/admin/loans</a></strong> - Prêts
        </div>
        <div class="endpoint">
            <strong><a href="/api/admin/transactions/recent">/api/admin/transactions/recent</a></strong> - Transactions
        </div>
        
        <h2>🗄️ Configuration:</h2>
        <ul>
            <li><strong>Base de données:</strong> MySQL (mybankdb)</li>
            <li><strong>Frontend:</strong> Ouvrez test_connection_simple.html</li>
            <li><strong>Serveur:</strong> Node.js Simple Server</li>
        </ul>
        
        <h2>📱 Test de connexion:</h2>
        <p>Ouvrez <a href="test_connection_simple.html">test_connection_simple.html</a> pour tester la connexion frontend-backend.</p>
    </div>
</body>
</html>`;
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
        return;
    }

    // Servir les fichiers statiques
    const filePath = path.join(__dirname, req.url);
    const extname = path.extname(filePath);
    
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    serveStaticFile(res, filePath, contentType);
});

server.listen(PORT, () => {
    console.log('🚀 Démarrage du serveur MyBankManager...');
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log('🗄️ Base de données: MySQL (mybankdb)');
    console.log('📱 Frontend: test_connection_simple.html');
    console.log('💡 Pour arrêter: Ctrl+C');
    console.log('-'.repeat(50));
    console.log(`✅ Serveur démarré sur le port ${PORT}`);
});

// Gestion de l'arrêt propre
process.on('SIGINT', () => {
    console.log('\n🛑 Serveur arrêté');
    process.exit(0);
}); 
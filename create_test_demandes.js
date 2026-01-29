/**
 * Script pour créer des demandes de test
 * À exécuter dans la console du navigateur
 */

console.log('🔄 Création des demandes de test...');

// Fonction pour créer des demandes de test
function createTestDemandes() {
    const testDemandes = [
        // Demandes de prêts
        {
            id: 'PRET001',
            type: 'pret',
            statut: 'en_attente',
            clientName: 'Ahmed Benali',
            clientEmail: 'ahmed@example.com',
            clientPhone: '0612345678',
            montant: '50000',
            typePret: 'Prêt Personnel',
            dateSoumission: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 jours ago
            additionalInfo: 'Besoin urgent pour rénovation maison'
        },
        {
            id: 'PRET002',
            type: 'pret',
            statut: 'approuvee',
            clientName: 'Fatima Zahra',
            clientEmail: 'fatima@example.com',
            clientPhone: '0623456789',
            montant: '75000',
            typePret: 'Prêt Immobilier',
            dateSoumission: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 jours ago
            additionalInfo: 'Achat appartement'
        },
        {
            id: 'PRET003',
            type: 'pret',
            statut: 'refusee',
            clientName: 'Mohammed Alami',
            clientEmail: 'mohammed@example.com',
            clientPhone: '0634567890',
            montant: '100000',
            typePret: 'Prêt Auto',
            dateSoumission: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 jour ago
            additionalInfo: 'Achat voiture neuve'
        },
        
        // Demandes de cartes
        {
            id: 'CARTE001',
            type: 'carte',
            statut: 'en_attente',
            clientName: 'Amina Tazi',
            clientEmail: 'amina@example.com',
            clientPhone: '0645678901',
            montant: '5000',
            typeCarte: 'Carte Gold',
            dateSoumission: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 jours ago
            additionalInfo: 'Carte pour voyages professionnels'
        },
        {
            id: 'CARTE002',
            type: 'carte',
            statut: 'approuvee',
            clientName: 'Hassan El Fassi',
            clientEmail: 'hassan@example.com',
            clientPhone: '0656789012',
            montant: '3000',
            typeCarte: 'Carte Classic',
            dateSoumission: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 jours ago
            additionalInfo: 'Première carte bancaire'
        },
        {
            id: 'CARTE003',
            type: 'carte',
            statut: 'refusee',
            clientName: 'Leila Mansouri',
            clientEmail: 'leila@example.com',
            clientPhone: '0667890123',
            montant: '10000',
            typeCarte: 'Carte Platinum',
            dateSoumission: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 jours ago
            additionalInfo: 'Carte haut de gamme'
        },
        
        // Demandes d'assurances
        {
            id: 'ASSUR001',
            type: 'assurance',
            statut: 'en_attente',
            clientName: 'Karim Idrissi',
            clientEmail: 'karim@example.com',
            clientPhone: '0678901234',
            coverageAmount: '25000',
            insuranceType: 'Assurance Automobile',
            dateSoumission: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 jour ago
            additionalInfo: 'Assurance pour voiture familiale'
        },
        {
            id: 'ASSUR002',
            type: 'assurance',
            statut: 'approuvee',
            clientName: 'Nadia Benslimane',
            clientEmail: 'nadia@example.com',
            clientPhone: '0689012345',
            coverageAmount: '50000',
            insuranceType: 'Assurance Habitation',
            dateSoumission: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 jours ago
            additionalInfo: 'Assurance pour maison principale'
        },
        {
            id: 'ASSUR003',
            type: 'assurance',
            statut: 'refusee',
            clientName: 'Omar Cherkaoui',
            clientEmail: 'omar@example.com',
            clientPhone: '0690123456',
            coverageAmount: '100000',
            insuranceType: 'Assurance Vie',
            dateSoumission: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 jours ago
            additionalInfo: 'Assurance vie pour famille'
        },
        
        // Demandes urgentes (plus de 3 jours)
        {
            id: 'URGENT001',
            type: 'pret',
            statut: 'en_attente',
            clientName: 'Youssef Benjelloun',
            clientEmail: 'youssef@example.com',
            clientPhone: '0611223344',
            montant: '30000',
            typePret: 'Prêt Personnel',
            dateSoumission: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 jours ago
            additionalInfo: 'URGENT - Problème médical'
        },
        {
            id: 'URGENT002',
            type: 'carte',
            statut: 'en_attente',
            clientName: 'Sara El Khadiri',
            clientEmail: 'sara@example.com',
            clientPhone: '0622334455',
            montant: '2000',
            typeCarte: 'Carte Classic',
            dateSoumission: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 jours ago
            additionalInfo: 'URGENT - Voyage professionnel'
        }
    ];
    
    // Sauvegarder dans localStorage
    localStorage.setItem('admin-demandes', JSON.stringify(testDemandes));
    
    console.log('✅ Demandes de test créées avec succès !');
    console.log(`📊 Total: ${testDemandes.length} demandes`);
    
    // Afficher les statistiques
    const enAttente = testDemandes.filter(d => d.statut === 'en_attente').length;
    const approuvees = testDemandes.filter(d => d.statut === 'approuvee').length;
    const refusees = testDemandes.filter(d => d.statut === 'refusee').length;
    
    console.log(`⏳ En attente: ${enAttente}`);
    console.log(`✅ Approuvées: ${approuvees}`);
    console.log(`❌ Refusées: ${refusees}`);
    
    // Par type
    const prets = testDemandes.filter(d => d.type === 'pret').length;
    const cartes = testDemandes.filter(d => d.type === 'carte').length;
    const assurances = testDemandes.filter(d => d.type === 'assurance').length;
    
    console.log(`💰 Prêts: ${prets}`);
    console.log(`💳 Cartes: ${cartes}`);
    console.log(`🛡️ Assurances: ${assurances}`);
    
    return testDemandes;
}

// Exécuter la création
const demandes = createTestDemandes();

// Instructions pour l'utilisateur
console.log('');
console.log('🎯 INSTRUCTIONS:');
console.log('1. Rechargez la page du dashboard admin');
console.log('2. Allez dans l\'onglet "Demandes"');
console.log('3. Vous devriez maintenant voir les statistiques !');
console.log('');
console.log('🔄 Pour recharger: appuyez sur F5 ou Ctrl+R');

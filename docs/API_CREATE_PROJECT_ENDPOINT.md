# API Documentation - Endpoint de Création de Projet

## Endpoint: Créer un Nouveau Projet Agricole

### Informations Générales
- **URL**: `POST /api/projects`
- **Authentification**: Bearer Token requis
- **Content-Type**: `multipart/form-data` (pour les images) ou `application/json`
- **Permissions**: Utilisateur avec rôle "fermier" uniquement

---

### Description
Cet endpoint permet aux fermiers authentifiés de soumettre un nouveau projet agricole pour financement participatif. Le projet passera par un processus de validation avant d'être publié sur la plateforme.

---

### Headers Requis
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

---

### Corps de la Requête (FormData)

#### Champs Obligatoires
| Champ | Type | Description | Exemple |
|-------|------|-------------|---------|
| `title` | string | Titre du projet (max 100 caractères) | "Culture de tomates biologiques en serre" |
| `description` | string | Description détaillée du projet (max 1000 caractères) | "Projet de culture de tomates biologiques avec système d'irrigation automatisé..." |
| `category` | string | Catégorie du projet | "Agriculture", "Élevage", "Pêche", "Transformation" |
| `location` | string | Localisation du projet | "Kinshasa, RDC" |
| `targetAmount` | number | Montant cible en USD | 50000 |
| `duration` | number | Durée du projet en mois | 12 |
| `expectedReturn` | number | Retour attendu en pourcentage | 15 |
| `riskLevel` | string | Niveau de risque | "Faible", "Modéré", "Élevé" |
| `businessPlan` | string | Plan d'affaires détaillé (max 5000 caractères) | "Notre stratégie consiste à..." |
| `useOfFunds` | string | Utilisation prévue des fonds (max 2000 caractères) | "40% pour l'achat de semences, 30% pour l'équipement..." |

#### Champs Optionnels
| Champ | Type | Description | Exemple |
|-------|------|-------------|---------|
| `images` | File[] | Images du projet (max 5 fichiers, 5MB chacun) | [file1.jpg, file2.jpg] |
| `documents` | File[] | Documents annexes (PDF uniquement, max 10MB) | [business_plan.pdf] |

---

### Exemple de Requête

#### Avec JavaScript/Fetch
```javascript
const formData = new FormData();

// Données du projet
formData.append('title', 'Culture de tomates biologiques en serre');
formData.append('description', 'Projet innovant de culture de tomates biologiques avec système d\'irrigation automatisé dans la région de Kinshasa.');
formData.append('category', 'Agriculture');
formData.append('location', 'Kinshasa, RDC');
formData.append('targetAmount', '50000');
formData.append('duration', '12');
formData.append('expectedReturn', '15');
formData.append('riskLevel', 'Modéré');
formData.append('businessPlan', 'Notre stratégie consiste à développer une production de tomates biologiques...');
formData.append('useOfFunds', '40% pour l\'achat de semences biologiques, 30% pour l\'équipement de serre, 20% pour l\'irrigation, 10% pour la commercialisation');

// Images (si disponibles)
if (selectedImages.length > 0) {
  selectedImages.forEach((image, index) => {
    formData.append(`images`, image);
  });
}

// Requête
const response = await fetch('https://api.agrofinance-rdc.com/api/projects', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${userToken}`,
  },
  body: formData
});
```

#### Avec cURL
```bash
curl -X POST https://api.agrofinance-rdc.com/api/projects \
  -H "Authorization: Bearer your_jwt_token_here" \
  -F "title=Culture de tomates biologiques en serre" \
  -F "description=Projet innovant de culture..." \
  -F "category=Agriculture" \
  -F "location=Kinshasa, RDC" \
  -F "targetAmount=50000" \
  -F "duration=12" \
  -F "expectedReturn=15" \
  -F "riskLevel=Modéré" \
  -F "businessPlan=Notre stratégie..." \
  -F "useOfFunds=40% pour l'achat..." \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg"
```

---

### Réponses de l'API

#### Succès (201 Created)
```json
{
  "success": true,
  "message": "Projet créé avec succès et soumis pour validation",
  "data": {
    "project": {
      "id": "proj_123456789",
      "title": "Culture de tomates biologiques en serre",
      "slug": "culture-tomates-biologiques-serre-123",
      "description": "Projet innovant de culture de tomates biologiques...",
      "category": "Agriculture",
      "location": "Kinshasa, RDC",
      "targetAmount": 50000,
      "currentAmount": 0,
      "progress": 0,
      "duration": 12,
      "expectedReturn": 15,
      "riskLevel": "Modéré",
      "status": "pending_validation",
      "businessPlan": "Notre stratégie consiste à...",
      "useOfFunds": "40% pour l'achat de semences...",
      "createdBy": "user_789123456",
      "farmer": {
        "id": "user_789123456",
        "name": "Jean Mukendi",
        "profileImage": "https://api.agrofinance-rdc.com/uploads/profiles/user_789123456.jpg",
        "rating": 4.5,
        "projectsCount": 3,
        "location": "Kinshasa, RDC"
      },
      "images": [
        {
          "id": "img_001",
          "url": "https://api.agrofinance-rdc.com/uploads/projects/proj_123456789/image1.jpg",
          "caption": "Vue d'ensemble du terrain",
          "isMain": true
        },
        {
          "id": "img_002",
          "url": "https://api.agrofinance-rdc.com/uploads/projects/proj_123456789/image2.jpg",
          "caption": "Équipement existant",
          "isMain": false
        }
      ],
      "documents": [
        {
          "id": "doc_001",
          "name": "business_plan.pdf",
          "url": "https://api.agrofinance-rdc.com/uploads/projects/proj_123456789/business_plan.pdf",
          "size": 2048576,
          "type": "application/pdf"
        }
      ],
      "timeline": {
        "createdAt": "2025-07-11T10:30:00Z",
        "submittedAt": "2025-07-11T10:30:00Z",
        "validationExpectedAt": "2025-07-13T10:30:00Z",
        "fundingStartAt": null,
        "fundingEndAt": null
      },
      "validation": {
        "status": "pending",
        "submittedAt": "2025-07-11T10:30:00Z",
        "expectedReviewTime": "48 heures",
        "reviewer": null,
        "reviewedAt": null,
        "feedback": null
      }
    }
  },
  "meta": {
    "validationProcess": {
      "steps": [
        "Vérification des informations de base",
        "Validation du plan d'affaires",
        "Vérification de la faisabilité",
        "Approbation finale"
      ],
      "estimatedTime": "48 heures",
      "nextSteps": [
        "Notre équipe examinera votre projet dans les 48h",
        "Vous recevrez une notification par email du statut",
        "Si approuvé, votre projet sera publié sur la plateforme"
      ]
    }
  }
}
```

#### Erreur de Validation (400 Bad Request)
```json
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Données de projet invalides",
  "details": {
    "title": ["Le titre est requis"],
    "targetAmount": ["Le montant doit être supérieur à 1000 USD"],
    "images": ["Format d'image non supporté. Utilisez JPG, PNG ou WebP"]
  }
}
```

#### Erreur d'Authentification (401 Unauthorized)
```json
{
  "success": false,
  "error": "UNAUTHORIZED",
  "message": "Token d'authentification invalide ou expiré"
}
```

#### Erreur de Permission (403 Forbidden)
```json
{
  "success": false,
  "error": "INSUFFICIENT_PERMISSIONS",
  "message": "Seuls les utilisateurs avec le rôle 'fermier' peuvent créer des projets"
}
```

#### Erreur de Limite (429 Too Many Requests)
```json
{
  "success": false,
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Trop de projets soumis récemment. Limite: 3 projets par mois",
  "details": {
    "limitType": "projects_per_month",
    "limit": 3,
    "current": 3,
    "resetAt": "2025-08-01T00:00:00Z"
  }
}
```

#### Erreur Serveur (500 Internal Server Error)
```json
{
  "success": false,
  "error": "INTERNAL_SERVER_ERROR",
  "message": "Erreur interne du serveur lors de la création du projet",
  "requestId": "req_123456789"
}
```

---

### Règles de Validation

#### Titre du Projet
- **Requis**: Oui
- **Longueur**: 10 à 100 caractères
- **Format**: Texte libre, caractères alphanumériques et espaces
- **Unicité**: Doit être unique par utilisateur

#### Description
- **Requis**: Oui
- **Longueur**: 50 à 1000 caractères
- **Format**: Texte libre avec mise en forme basique

#### Montant Cible
- **Requis**: Oui
- **Minimum**: 1,000 USD
- **Maximum**: 1,000,000 USD
- **Format**: Nombre entier positif

#### Durée
- **Requis**: Oui
- **Minimum**: 3 mois
- **Maximum**: 60 mois
- **Format**: Nombre entier

#### Retour Attendu
- **Requis**: Oui
- **Minimum**: 5%
- **Maximum**: 50%
- **Format**: Nombre décimal

#### Images
- **Formats acceptés**: JPG, JPEG, PNG, WebP
- **Taille maximale**: 5MB par image
- **Nombre maximum**: 5 images
- **Résolution minimale**: 800x600 pixels

#### Documents
- **Formats acceptés**: PDF uniquement
- **Taille maximale**: 10MB par document
- **Nombre maximum**: 3 documents

---

### Processus de Validation

1. **Soumission Initiale**
   - Le projet est créé avec le statut `pending_validation`
   - Un ID unique est généré
   - Les fichiers sont uploadés et sécurisés

2. **Validation Automatique**
   - Vérification des données obligatoires
   - Scan des images pour contenu approprié
   - Validation du format des documents

3. **Revue Manuelle**
   - Examen du plan d'affaires par un expert
   - Vérification de la faisabilité du projet
   - Évaluation des risques

4. **Décision Finale**
   - Approbation → statut `approved` → publication
   - Rejet → statut `rejected` → feedback envoyé
   - Révision requise → statut `needs_revision` → modifications demandées

---

### Notifications

#### Email de Confirmation
Envoyé immédiatement après la soumission:
```
Sujet: Votre projet "Culture de tomates biologiques" a été soumis
Corps: Merci d'avoir soumis votre projet. Notre équipe l'examinera dans les 48h...
```

#### Email de Validation
Envoyé après la revue:
- **Approuvé**: "Félicitations ! Votre projet a été approuvé"
- **Rejeté**: "Votre projet nécessite des modifications"
- **Révision**: "Votre projet est en cours de révision"

---

### Codes de Statut du Projet

| Statut | Description | Actions Possibles |
|--------|-------------|-------------------|
| `pending_validation` | En attente de validation | Aucune (attendre la revue) |
| `needs_revision` | Modifications requises | Modifier et re-soumettre |
| `approved` | Approuvé et publié | Gérer le financement |
| `rejected` | Rejeté définitivement | Créer un nouveau projet |
| `active` | En cours de financement | Suivre les investissements |
| `funded` | Financement complet | Gérer l'exécution |
| `completed` | Projet terminé | Rapports finaux |

---

### Endpoints Liés

- `GET /api/projects/{id}` - Récupérer les détails d'un projet
- `PUT /api/projects/{id}` - Modifier un projet (si `needs_revision`)
- `DELETE /api/projects/{id}` - Supprimer un projet (si `pending_validation`)
- `GET /api/projects/my-projects` - Liste des projets de l'utilisateur
- `POST /api/projects/{id}/upload-image` - Ajouter une image à un projet existant

---

### Notes pour les Développeurs

1. **Gestion des Fichiers**
   - Utiliser un stockage cloud sécurisé (AWS S3, Google Cloud Storage)
   - Générer des URLs signées pour l'accès aux fichiers
   - Implémenter la compression automatique des images

2. **Sécurité**
   - Valider tous les fichiers uploadés (scan antivirus)
   - Limiter les types de fichiers autorisés
   - Implémenter une limite de débit pour éviter le spam

3. **Performance**
   - Traitement asynchrone des uploads de fichiers
   - Génération de thumbnails pour les images
   - Cache des métadonnées de projet

4. **Monitoring**
   - Logger toutes les créations de projet
   - Tracker les taux de validation/rejet
   - Monitorer les performances d'upload

---

*Documentation mise à jour le 11 juillet 2025*
*Version API: v1.0*
*Contact technique: dev@agrofinance-rdc.com*

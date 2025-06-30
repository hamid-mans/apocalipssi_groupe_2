
===============================
🧠 Assistant Intelligent de Synthèse de Documents
===============================

> Projet POC – Étudiants | Veille réglementaire automatisée avec IA générative

Ce projet est un proof of concept (POC) d’un assistant capable de générer automatiquement un résumé structuré à partir d’un fichier PDF (contrat, rapport, norme...). Il utilise un modèle pré-entraîné de traitement du langage naturel (facebook/bart-large-cnn via Hugging Face API) pour extraire et résumer le contenu textuel.

-------------------------------
🚀 Fonctionnalités
-------------------------------
- 📤 Upload de fichiers PDF
- 🤖 Résumé automatique via LLM (Large Language Model)
- 💡 Affichage des points clés et suggestions
- ⚙️ Architecture Full Stack (React + Express.js)
- 🐳 Déploiement possible via Docker

-------------------------------
🛠️ Technologies utilisées
-------------------------------
Frontend        : React.js, Axios, TailwindCSS (optionnel)
Backend         : Express.js, Multer, pdf-parse, CORS, dotenv
IA / NLP        : Hugging Face API, BART (facebook/bart-large-cnn)
DevOps / Divers : Git, GitHub Actions, Docker (optionnel)

-------------------------------
📁 Arborescence
-------------------------------
📦 root/
├── backend/
│   ├── uploads/
│   └── server.js
├── frontend/
│   └── src/
│       └── DocumentSummarizer.jsx
│       └── DocumentSummarizer.css
├── .gitignore
├── README.md
└── package.json

-------------------------------
⚙️ Installation & Lancement
-------------------------------
1. Cloner le projet :
   git clone https://github.com/votre-utilisateur/assistant-synthese-docs.git
   cd assistant-synthese-docs

2. Configuration des clés API :
   Créer un fichier `.env` dans le dossier `backend/` avec :
   HF_API_KEY=sk-xxx...

3. Lancer le backend :
   cd backend
   npm install
   npm start

4. Lancer le frontend :
   cd ../frontend
   npm install
   npm start

-------------------------------
🧪 Exemple d'utilisation
-------------------------------
1. Lance le serveur et l'app React
2. Upload un fichier PDF
3. En quelques secondes, un résumé structuré s’affiche

-------------------------------
📚 Ressources pédagogiques
-------------------------------
- Documentation Hugging Face : https://huggingface.co/docs
- React.js Docs : https://react.dev/
- Express.js Guide : https://expressjs.com/fr/
- Scrum Guide : https://www.scrumguides.org/

-------------------------------
✨ Auteurs
-------------------------------
Projet réalisé dans le cadre d’un atelier immersif d’équipe (M1 / B3).
Développé avec passion par des étudiants motivés et encadrés en mode agile.

-------------------------------
📄 Licence
-------------------------------
Projet destiné à un usage pédagogique uniquement.
Toute réutilisation commerciale requiert l’accord de l’équipe pédagogique.
# 📄 **INSTALL.md**

# 🚀 Installation & Lancement du projet

Ce document explique comment installer les dépendances nécessaires, configurer Strapi, puis lancer le projet en mode développement ou production.

---

# 🟦 1. Installation de Node.js

Le projet nécessite **Node.js version 18+** (recommandé : **Node 20 LTS**).

## 🔧 Vérifier votre version actuelle :


node -v
npm -v
```

Si Node n’est pas installé ou trop ancien :

### 🏁 Installation sur Windows / macOS

Télécharger la version LTS depuis :
👉 [https://nodejs.org/](https://nodejs.org/)

### 🐧 Installation sur Linux (Debian/Ubuntu)


curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

# 🟩 2. Installation du backend Strapi

## 📁 Aller dans le dossier backend :


cd blog-system/strapi
```

## 📦 Installer les dépendances :


npm install
```

## 🛠️ Configuration SQLite (déjà fournie)

Le projet utilise une base SQLite disponible dans :

```
./data/data.db
```

Aucune configuration supplémentaire n’est nécessaire.

---

# 🟧 3. Lancement de Strapi

## ▶️ Mode développement (auto-reload)


npm run develop
```

Accès admin :
👉 [http://localhost:1337/admin](http://localhost:1337/admin)

Ce mode recharge automatiquement le serveur à chaque modification.

---

## 🚀 Mode production

### 1️⃣ Construire le panel d’administration :


npm run build
```

### 2️⃣ Lancer Strapi en production :


npm run start
```

**Note :** en production, il n’y a pas de rechargement automatique.

---

# 🟪 4. Commandes utiles

| Commande          | Description                        |
| ----------------- | ---------------------------------- |
| `npm install`     | Installe les dépendances           |
| `npm run develop` | Lance Strapi en mode développement |
| `npm run build`   | Compile le panneau admin           |
| `npm run start`   | Lance Strapi en mode production    |
| `npm audit`       | Vérifie les failles potentielles   |

---

# 🟫 5. Dépannage courant

### ❌ Erreur *"permission denied, mkdir '/data'"*

Sur Linux, exécuter :


sudo chmod -R 777 data
```

### ❌ Erreur *"invalid file request node_modules..."*

Supprimer puis réinstaller :


rm -rf node_modules package-lock.json
npm install
```

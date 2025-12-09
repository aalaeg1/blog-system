# -----------------------------
#   DOCKERFILE — FRONTEND React
# -----------------------------

FROM node:18

WORKDIR /app

# Copier les fichiers nécessaires
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code du frontend
COPY . .

# Exposer le port Vite
EXPOSE 5173

# Démarrer Vite en mode dev
CMD ["npm", "run", "dev", "--", "--host"]

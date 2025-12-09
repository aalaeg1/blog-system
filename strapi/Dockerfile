# -----------------------------
#   DOCKERFILE — STRAPI v3
# -----------------------------

FROM node:14

# Dossier de travail dans le conteneur
WORKDIR /srv/app

# Copier les fichiers de config
COPY package.json package-lock.json ./

# Installer Strapi et les dépendances
RUN npm install

# Copier toute l’application Strapi
COPY . .

# Variables d’environnement
ENV DATABASE_CLIENT=sqlite
ENV DATABASE_FILENAME=/data/data.db
ENV NODE_ENV=development

# Le port Strapi
EXPOSE 1337

# Commande de démarrage
CMD ["npm", "run", "develop"]

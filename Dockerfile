# ================= Base ======================
FROM node:carbon AS base
# Create app directory
WORKDIR /app

# ================= Dependencies ==============
FROM base AS dependencies
COPY package*.json ./
RUN npm install

# ================= Copy Files/Build ==========
FROM dependencies AS build
WORKDIR /app
COPY src /app

# ================= Copy Files/Build ==========
FROM dependencies AS test
COPY /app ./
RUN  npm run lint && npm run setup && npm run test

# ================= Release with Alpine =======
FROM node:8.9-alpine AS release
WORKDIR /app
COPY --from=dependencies /app/package.json ./
RUN npm install --only=production
COPY --from=build /app ./
# Run command
CMD ["npm", "run", "start"]
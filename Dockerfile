# ================= Base =========================
FROM node:carbon AS base
# Create app directory
WORKDIR /app

# ================= Dependencies =================
FROM base AS dependencies
COPY package*.json ./
RUN npm install

# ================= Copy Files/Build =============
FROM dependencies AS build
WORKDIR /app
COPY src /app

# ================= Test before release ==========
FROM dependencies AS test
COPY /app ./
RUN  npm run lint &&
     npm run test

# ================= Release ======================
FROM node:8.9-alpine AS release
WORKDIR /app
COPY --from=dependencies /app/package.json ./
COPY --from=build /app ./
RUN npm install --only=production
# Run command
CMD ["npm", "run", "start"]
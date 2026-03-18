FROM node:24

WORKDIR /app

# 1. package.json
COPY package*.json ./

# 2. instalacja
RUN npm install

# 3. kopiujesz resztę (w tym prisma/)
COPY . .


# 5. port
EXPOSE 5000

# 6. start
CMD ["node", "src/server.js"]
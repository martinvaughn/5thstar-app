FROM node:16

WORKDIR /app
COPY package*.json ./

# Install dependencies
RUN npm install
# Copy the app
COPY . .

EXPOSE 3000

# CMD ["npm", "run", "up"]
CMD ["npm", "run", "up"]
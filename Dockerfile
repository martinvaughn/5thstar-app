# Does node version need to change?
FROM node:16


# Does WORKDIR need to change?
WORKDIR /app
COPY package*.json ./

# Install dependencies
RUN npm install
# Copy the app
COPY . .

EXPOSE 3000
# Something like...
# CMD ["npm", "run", "up"]
CMD ["npm", "run", "up"]
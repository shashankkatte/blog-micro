FROM node:alpine

# Added to work around create react app issue : https://github.com/facebook/create-react-app/issues/8688 comment this if resolved.
ENV CI=true

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm","start"]


# Dockerfile
# Also utlize a .dockerignore file in this same directory
# Best practice is to place common / unchanging commands at the very beginning,
# and the most-frequently changing items at the end

# BUILD
FROM node:8 AS bscp-build

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# RUN apk update && apk add git

# WORKDIR /bscp-front-end

# Create bscp user and use user's directory
RUN useradd -ms /bin/bash bscp
USER bscp
WORKDIR /home/bscp

# Install app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Bundle app source
COPY . .

# Set environment variables
ENV PORT=80
ENV NODE_ENV=production
# Seems as thought docker ignores .env files, so manually setting production proxy here
ENV REACT_APP_PROXY=http://13.90.129.248:3111

# Build for production.
USER root
RUN npm run build --production

# DEPLOY
# Using Nginx
FROM nginx:1.12-alpine
# "--from" specifed that /home/bscp/build is a folder in Docker's virtual file structure
COPY --from=bscp-build /home/bscp/build/ /usr/share/nginx/html
COPY ./config/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# For optionally serving locally w/o Apache
# Install and configure `serve`.
# RUN npm install -g serve
# CMD serve -s build
# EXPOSE 3000

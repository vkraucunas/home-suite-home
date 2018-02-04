FROM node:9-onbuild
ENV HUE_USERNAME=<key here>

RUN npm run flow:check

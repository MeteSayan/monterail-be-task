FROM node:lts AS dist
COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

ARG PORT=3000

EXPOSE $PORT

CMD [ "yarn", "start:dev" ]
FROM node:8

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN yarn  \
 &&  yarn build

EXPOSE 80

ENTRYPOINT []
CMD ["yarn", "serve"]

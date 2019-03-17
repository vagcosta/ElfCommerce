FROM node:alpine

COPY ./ /app/elfcommerce

WORKDIR /app/elfcommerce

RUN yarn install

CMD ["node", "app.local.js"]
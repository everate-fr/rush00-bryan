FROM node:19

WORKDIR /usr/app/front

COPY . .

RUN npm i
RUN npm install -g @angular/cli

CMD ["ng", "serve", "--host=0.0.0.0"]
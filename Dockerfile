FROM node:15.14-alpine
LABEL maintainer=rrequero@gmail.com

ENV USER bank
ENV NAME bank
ENV PORT 3000

RUN apk update && apk upgrade && \
  apk add --no-cache --update bash git openssh python alpine-sdk && \
  addgroup $USER && adduser -s /bin/bash -D -G $USER $USER && \
  mkdir -p /opt/$NAME && chown -R $USER:$USER /opt/$NAME

COPY package*.json /opt/$NAME/
WORKDIR /opt/$NAME
RUN npm install
USER $USER
COPY .eslintrc.js /opt/$NAME/
COPY tsconfig.json /opt/$NAME/
COPY tsconfig.build.json /opt/$NAME/
COPY .prettierrc /opt/$NAME/
COPY nest-cli.json /opt/$NAME/
COPY src /opt/$NAME/src

RUN npm run build


EXPOSE 3000

ENTRYPOINT [ "npm" ]
CMD ["run", "start:dev"]



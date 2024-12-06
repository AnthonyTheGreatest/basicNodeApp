#run the following command to build the image:
#docker build -t <name>:<tag> .

FROM node:19-alpine
COPY package.json /app/
COPY index.js /app/
WORKDIR /app
RUN npm i
CMD ["node", "index.js"]

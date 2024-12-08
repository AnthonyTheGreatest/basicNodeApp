#execute to build the image:
#docker build -t <image_name>:<tag> .
#execute to run the container:
#docker run --name <app_name> -d -p <local_port>:<docker_port> <image_name>:<tag>

FROM node:16.20.0
WORKDIR /app
COPY app/package*.json ./
RUN npm install
COPY app/ ./
EXPOSE 3000
CMD ["npm", "start"]

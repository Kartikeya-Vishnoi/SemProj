FROM ubuntu
RUN apt update -y
RUN apt install curl git -y
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - &&\
apt-get install -y nodejs
RUN git clone https://github.com/Kartikeya-Vishnoi/SemProj
COPY ./script.sh ./SemProj/script.sh
RUN chmod 700 ./SemProj/script.sh
WORKDIR ./SemProj
EXPOSE 3000 8080 8900
RUN npm install -g concurrently
ENTRYPOINT ./script.sh && npm start

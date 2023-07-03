from ubuntu
run apt update -y
run apt install curl git -y
run curl -fsSL https://deb.nodesource.com/setup_20.x | bash - &&\
apt-get install -y nodejs
copy . .
copy ./script.sh ./SemProj/script.sh
run chmod 700 ./SemProj/script.sh
workdir ./SemProj
expose 3000 8080 8900
run npm install -g concurrently
entrypoint ./script.sh && npm start

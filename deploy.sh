#!/bin/bash

docker logs bridge
if (($?==0))
then
     docker stop bridge
     docker rm bridge
fi
docker run -d --name=bridge -p 3000:3000 -p 8900:8900 -p 8080:8080 kubearyan/bridge_app:latest

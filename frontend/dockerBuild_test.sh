#!/bin/bash
docker_name="hlm/web"
version="v1.8"
cnpm install
cnpm run build:$1
docker_rmi=`docker images |grep $docker_name |  awk "{print $3}"`
if [ -n "$docker_rmi" ]
 then
   docker rmi $(docker images |grep $docker_name |  awk "{print $3}")
fi
echo "----------docker 打包开始-------------"
docker build  -t  $docker_name:$version .
echo "-----------docker 打包完成------------"
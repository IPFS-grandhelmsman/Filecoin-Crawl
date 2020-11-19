#!/bin/bash
docker_name="hlm-pool-web"
version="v1.0"
namespace="hlm-prod"
cnpm install
cnpm run build:stage
docker_rmi=`docker images |grep $docker_name |  awk '{print $3}'`
echo "docker images="$docker_rmi
if [ -n "$docker_rmi" ]
 then
   sudo docker rmi -f $docker_rmi
fi
echo "----------docker 打包开始-------------"
sudo docker build  -t  $docker_name:$version .
echo "-----------docker 打包完成------------"
echo "---------------环境发布---------------------"
docker login --username=zhengduozhe --password=  registry.cn-shenzhen.aliyuncs.com
imagesID=`docker images -q $docker_name`
echo $imagesID
docker tag $imagesID registry.cn-shenzhen.aliyuncs.com/$namespace/$docker_name:$version
docker push registry.cn-shenzhen.aliyuncs.com/$namespace/$docker_name:$version
echo "---------------发布成功---------------------"

#引用nginx镜像
FROM nginx
# 作者
MAINTAINER chenzhijie <chenzhijie@grandhelmsman.com>
# 复制文件到发布目录
COPY dist/  /usr/share/nginx/html/
COPY ios/  /usr/share/nginx/html/ios
#用本地的default.conf 配置来替换nginx镜像里的默认配置
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf


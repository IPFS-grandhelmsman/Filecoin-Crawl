#!/bin/bash
ipfsadd="ipfs add "
while read line;do
	file_name=`echo $line | cut -d " " -f1`
	echo $file_name
	r=`$ipfsadd $file_name`
	echo $r
	sleep 2 
	#addcmd=$ipfsadd$file_name
	#echo $addcmd
done

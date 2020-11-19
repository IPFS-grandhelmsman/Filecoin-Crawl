const fs = require('fs')
const {mysqlexec}=require('./mysql')

function zhijiefilecoindataprocess(){
	let filepath = "/root/hlm-miner/script/lotus/lotus-user/t022072.txt"
	fs.readFile(filepath,async function(error,data){
		if(error){
			console.log("读取文件失败了")
			return
		}
		let arrres = data.toString().split(/[\n]/)
		let arrlen=arrres.length
		let looplen=arrlen
		for(let i = 0;i<looplen-1;i++){
			let tmpdata = arrres[i]
			let tmparr = tmpdata.split(/\|/)
			let datacid=tmparr[0]
			let filename=tmparr[1]
			console.log(filename)
			console.log(datacid)
			
			let mysqlres = await mysqlexec("update filelog set filecoinCid = ? where filename= ?",[datacid,filename])
			console.log(mysqlres.err)
		}
	
	})

}

zhijiefilecoindataprocess()

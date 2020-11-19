
const fs = require('fs')
const {mysqlexec}=require('./mysql')


async function filecoindataprocess(){
	let filepath = "/root/mywork/mybot/myres.txt"
	fs.readFile(filepath,async function(error,data){
		if(error){
			console.log("读取文件失败了")
			return
		}
		let arrres = data.toString().split(/[\n]/)
		console.log(arrres)
		let arrlen=arrres.length
		let looplen= Math.ceil(arrlen/3)
		for(let i = 0;i<looplen-1;i++){
			let factindex = i*3
			let dealid = arrres[factindex+1]
			let tmparr = arrres[factindex+2].split("|")
			let filename = tmparr[1]
			let dataid = tmparr[0]
			console.log(dealid)
			console.log(filename)
			console.log(dataid)
			console.log("=====================================")
			let mysqlres = mysqlexec("update filelog set filecoinCid = ?,filecoinDealId=? where filename= ?",[dataid,dealid,filename])

		}

	})


}


filecoindataprocess()

const fs = require('fs')
const {mysqlexec}=require('./mysql')
async function readipfsresfile()
{
	let filepath = "/root/mywork/shellbot/yunnanipfsres.txt"
	fs.readFile(filepath,async function(error,data){
		if(error){
			console.log("读取文件失败了")
			return
		}
		console.log(typeof data)
		let arrres = data.toString().split(/[\s\n]/)
		let arrlength = arrres.length
		let looplength= Math.ceil(arrlength/4)
		let unixtimestamp = Date.now()
		console.log(typeof arrres)
		let count =0
		console.log("====================================================================================")
		for(let i = 0;i<looplength-1;i++){
			try{

			let factindex = i*4
			let fname = (arrres[factindex]).replace(/'/g, "").trim()
			console.log(fname)
			let ipfscid = arrres[factindex+2]
			console.log(typeof ipfscid)
			let stats = fs.statSync(fname)
			let fileSizeInBytes = stats["size"]
			console.log(fileSizeInBytes)
			let mysqlres = await mysqlexec("insert into filelog(filename,ipfsCid,fileSize,createTime) values(?,?,?,?)",[fname,ipfscid,fileSizeInBytes,unixtimestamp])
			count++
			}catch(e){
				console.log(e)
			}
			
		}
		/*
		data.toString().split(/[\s\n]/).forEach(function(item,index){
			let stats = fs.statSync(filepath)
			let fileSizeInBytes = stats["size"]
			mysqlexec("insert info filelog(filename,ipfsCid,createTime)")
			count++
		})
		*/

	})
}

function insertipfsres2mysql(sql){

}
readipfsresfile()



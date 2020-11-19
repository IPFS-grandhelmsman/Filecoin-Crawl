const {mysqlexec}=require('./mysql')
async function testmysql(){
	let res = await mysqlexec("insert into filelog(filename,filecoinCid,ipfsCid,fileSize) values(?,?,?,?)",["sxhitix","sxhiit","sxxhit",111111])
	console.log(res)
	console.log("=========================")
}
//testmysql()

async function testquery(){
	let sql = "select * from filelog limit 0,10"
	let res = await mysqlexec(sql)
	console.log(res)
	if res.err == null {
		console.log(res.rows)
		return
	}
	console.log("error query")
	
	
}

testquery()

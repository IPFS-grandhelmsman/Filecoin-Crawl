
const {mysqlexec}= require('./mysql')
const { readDirSync } = require('./filetraverse')
const fs = require("fs");

async function do_exec(){
	let res = await mysqlexec("select * from filepath where status=0 limit 1")
	if (res.err ==null && res.rows.length ==1 ) {
		let pathstatus=1
		console.log(res.rows[0])
		let row = res.rows[0]
		console.log(row.id)
		if (fs.existsSync(row.path)){
			readDirSync(row.path)

		}else{
			pathstatus=2
			//let tmpnull=await mysqlexec("update filepath set status=2 where id=?",[row.id])
		}
		let tmpnull=await mysqlexec("update filepath set status=? where id=?",[pathstatus,row.id])


	}
}



function intervalExec(){
	let is_doing= false
	setInterval(function(){
		if(!is_doing){
			is_doing=true
			do_exec()
			is_doing=false
		}
	},1000)
}
intervalExec()

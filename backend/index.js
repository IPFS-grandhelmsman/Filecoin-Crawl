const cors = require('cors')
const {mysqlexec}=require('./mysql')
const express = require('express')
const app = express()
const port = 30000
app.use(cors())

process.on('unhandledRejection', (error, promise) => {
	  console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
	  console.log(' The error was: ', error );
});

app.get('/', (req, res) => {
	  res.send('Hello World!')
})

app.get('/getid',async function(req, res) {
	let start = 1 
	let pagesize=30
	//todo
	console.log(req.query.start)
	console.log(req.query.pagesize)
	if(req.query.start != undefined){
		start = req.query.start
	}
	if(req.query.pagesize != undefined){
		pagesize = req.query.pagesize
	}
	
	let limitfirst = (start-1) * pagesize
	console.log("limitfirst:"+limitfirst)
	let sql = "select * from filelog where filecoinCid is not NULL limit "+limitfirst+","+pagesize
	console.log(sql)
	let mysqlres = await mysqlexec(sql)
	let querycountsql="select count(*) as count from filelog where filecoinCid is not NULL"
	console.log(querycountsql)
	let querycountres = await await mysqlexec(querycountsql)
	//console.log(querycountres.rows[0].count)

	if(mysqlres.err == null && querycountres.err == null){
		let resdata =[]
		mysqlres.rows.forEach(function(v,i,a){
			v.filename=null
			resdata.push(v)
		});
		res.send({
			code:0,
			data:resdata,
			totalcount:querycountres.rows[0].count
		})
		return
	}
	res.send({
		code:1,
		data:null
	})
})



app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
})

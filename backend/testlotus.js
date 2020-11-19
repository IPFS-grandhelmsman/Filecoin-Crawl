const {StateMinerInfo} = require('./lotus')

async function testlotus(){
	let res = await StateMinerInfo("t021870")
	console.log(res)
}
testlotus()

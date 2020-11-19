

function Uploadfile(file){
	let shellcmd = "ipfs add "+file
	console.log(shellcmd)
   let res = require('child_process').execSync(shellcmd)
	return res.toString().split(' ')[1]
}


module.exports = {
	Uploadfile
}

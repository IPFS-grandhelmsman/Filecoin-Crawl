const fs = require("fs");
const path = require("path");
const config= require('./config')
const {mysqlexec}= require('./mysql')
const { ClientQueryAsk, WalletDefaultAddress,StateMinerInfo, ClientImport, ClientStartDeal} = require('./lotus');
const log = require('./log')
const { Uploadfile } = require('./ipfs')
log.Info("hello world")
async function readDirSync(path){
	log.Info(config.lotus.miner)
	const minerInfo = await StateMinerInfo(config.lotus.miner);
	const { PeerId } = minerInfo.result;
	log.Info(PeerId)
	log.Info(config.lotus.miner)
	let queryask = await ClientQueryAsk(PeerId,config.lotus.miner)
//	console.log(queryask)
	const walletDefault = await WalletDefaultAddress();
        const wallet = walletDefault.result;
	var pa = fs.readdirSync(path);
	const epochPrice = '500000000';
	let count= 1
	pa.forEach(async function(ele,index){
		console.log(count)
		count ++ 
		var info = fs.statSync(path+"/"+ele)	
		if(info.isDirectory()){
			log.Info("dir: "+ele)
			readDirSync(path+"/"+ele);
		}else{
			//todo 传文件到lotus
			const importData = await ClientImport(path+"/"+ele)
			const { '/': dataCid } = importData.result.Root;
			log.Info("file: "+path+"/"+ele)
			log.Info(dataCid);
			const dataRef = {
               			Data: {
                    			TransferType: 'graphsync',
                    			Root: {
                        			'/': dataCid
                    			},
                    			PieceCid: null,
                    			PieceSize: 0
                		},
                		Wallet: wallet,
                		Miner: config.lotus.miner,
                		EpochPrice: epochPrice,
                		MinBlocksDuration: 1054080,
                		FastRetrieval: true
            		}
/*----------------------*/
			log.Info("****************")
			const dealData = await ClientStartDeal(dataRef);
			const { '/': proposalCid } = dealData.result;
			log.Info(proposalCid);
			console.log(typeof proposalCid);
			let ipfsCid = Uploadfile(path+"/"+ele)
			var stats = fs.statSync(path+"/"+ele)
			var fileSizeInBytes = stats["size"]
			mysqlexec("insert into filelog(filename,filecoinCid,ipfsCid,fileSize) values(?,?,?,?)",[path+"/"+ele,proposalCid,ipfsCid,fileSizeInBytes]);

		}
		log.Info("====================================")
		//process.exit(1)
	})
}
function file2link()
{
	let arguments = process.argv.splice(2);
	let localpath = arguments[0]
	if (fs.existsSync(localpath)){
		readDirSync(localpath)
	}else{
		console.log("path does not exist")
	}

}
//file2link()
//readDirSync(config.path)
module.exports = {
	readDirSync
}

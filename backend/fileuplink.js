
const {mysqlexec}= require('./mysql')
const fs = require("fs");
const path = require("path");
const config= require('./config')
const { ClientQueryAsk, WalletDefaultAddress,StateMinerInfo, ClientImport, ClientStartDeal} = require('./lotus');
const log = require('./log')
const { Uploadfile } = require('./ipfs')

async function uplinkfile2ipfs(filepath){
	/*
	先存储到ipfs中 冷数据后面再弄
	*/
	let ipfsCid = Uploadfile(filepath)
	let stats = fs.statSync(filepath)
        let fileSizeInBytes = stats["size"]
        let unixtimestamp = Date.now()
        let mysqlres = await mysqlexec("insert into filelog(filename,ipfsCid,fileSize,createTime) values(?,?,?,?)",[filepath,ipfsCid,fileSizeInBytes,unixtimestamp]);
	console.log(mysqlres)

}
async function uplinkfile2filecoin(filepath){
	const minerInfo = await StateMinerInfo(config.lotus.miner);
        const { PeerId } = minerInfo.result;
        let queryask = await ClientQueryAsk(PeerId,config.lotus.miner)
        const walletDefault = await WalletDefaultAddress();
        const wallet = walletDefault.result;
        const epochPrice = '500000000';
        const importData = await ClientImport(filepath)
        const { '/': dataCid } = importData.result.Root;
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
        const dealData = await ClientStartDeal(dataRef);
        const { '/': proposalCid } = dealData.result;
        console.log(dataCid)
        let ipfsCid = Uploadfile(filepath)
        let stats = fs.statSync(filepath)
        let fileSizeInBytes = stats["size"]
        let unixtimestamp = Date.now()
        let mysqlres = await mysqlexec("update filelog set filecoinCid = ?,filecoinDealId=? where filename=?",[dataCid,proposalCid,filepath]);

}

module.exports = {
	uplinkfile2ipfs,
	uplinkfile2filecoin
}

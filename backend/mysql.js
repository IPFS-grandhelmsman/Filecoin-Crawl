const config = require('./config');
var mysql      = require('mysql');
/*
var connection = mysql.createConnection({
	  host     : config.mysql.host,
	  user     : config.mysql.user,
	  password : config.mysql.password,
	  database : config.mysql.database
});
/*
function handleDisconnect(){
    connection.connect(function (err) {
        // callback(err,result);
        if(err){
            console.log(err);
            console.log("try to connect");
            setTimeout(handleDisconnect,1000);  //经过1秒后尝试重新连接
            return;
        }
        console.log("mysql connect Success");
    });

}
handleDisconnect();


function InsertNewFile(pfilename,pfilecoinCid,pipfsCid,pfileSize){
	let insertSql = "insert into filelog(filename,filecoinCid,ipfsCid) values(?,?,?)"
	connection.query(insertSql,[pfilename,pfilecoinCid,pipfsCid],function (error, results, fields) {
		console.log(error)
		  if (error) console.log(pfilename);
		  //console.log('The solution is: ', results[0].solution);
	});
}
//InsertNewFile("test","test","test",0);

module.exports = {
	InsertNewFile
}

*/

var pool  = mysql.createPool({
	  connectionLimit : 10,
	  host     : config.mysql.host,
          user     : config.mysql.user,
          password : config.mysql.password,
          database : config.mysql.database

});

function mysqlexec(sql, data) {
	return new Promise(function (resolve, reject) {
        	pool.getConnection(function(err,conn){
            	if(err){
                	reject(err);
            	}else{
                	conn.query(sql,data,function(err,rows,fields){
                        //释放连接
                        	conn.release();
                        //传递Promise回调对象
                        	resolve({"err":err,
                            		"rows":rows,
                            		"fields":fields
				});
                	});
            }
        });
    });
}


module.exports = {
	mysqlexec
}

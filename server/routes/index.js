
module.exports = function(io){
	var express = require('express');
	var router = express.Router();
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";
	var storage = require('node-persist');
	var array = [];
	var datasensor = [];
	var datastatistical = [];
	var statusdevice = [];
	router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); // co 2 dong nay moi request du lieu ve javscript duoc
	router.get('/dulieucambien',function(req,res){
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			var dbo = db.db("nodered");
			dbo.collection("testnew").find({}).limit(1).sort({timestamp:-1}).toArray(function(err,result){
				 console.log(result);
				res.json({result});
			});
		});
	});
	router.get('/thongketrongngay',function(req,res){
			res.send(datastatistical[0]);
	});
	router.get('/trangthaithietbi',function(req,res){
			res.send(statusdevice[0]);
	});
	router.get('/thoigiantatbat',function(req,res){
		res.send(storage.getItemSync('thoigianbattat').thoigiantat);
	})
	var options = {
		dir:'luutru',
		ttl: false
	};
	storage.initSync(options);

	io.on("connection",function(socket){
		console.log("Co nguoi vua ket noi"+ socket.id);

		socket.on("testthietlap",function(data){
			console.log(data);
			io.sockets.emit("testthietlap","hi");
		})
    socket.on("messages",function(data){
      console.log(data);
			array.push(data);
      socket.emit("messages","toi dang chuan bi di choi ne`");
    });
		socket.on("datasensor",function(data){
 			 MongoClient.connect(url, function(err, db) {
 	 			 if (err) throw err;
 	 			 var dbo = db.db("nodered");
 	 			 dbo.collection("testnew").find({}).limit(1).sort({timestamp:-1}).toArray(function(err,result){
 	 					console.log(result);
 	 					datasensor.push(result);
 	 					io.sockets.emit("datasensor",result);
 	 			 });
 	 		 });
		}); // lấy dữ liệu vừa thêm gần nhất
		socket.on("statistical",function(data){
			MongoClient.connect(url, function(err, db) {
				 if (err) throw err;
				 var dbo = db.db("nodered");
				 var time = new Date();
				 var day = time.getDate();
				 dbo.collection(data).aggregate([{$match:{room:1,day:day}},
					 {$group:{
						 _id:{room:"$room", month: { $month: "$timestamp" }, day: { $dayOfMonth: "$timestamp" }, year: { $year: "$timestamp" }},
						 valueTempMax:{$max:"$sensor.valueTemp"},
						 valueHumidityMax:{$max:"$sensor.valueHumidity"},
						 valueTempMin:{$min:"$sensor.valueTemp"},
						 valueHumidityMin:{$min:"$sensor.valueHumidity"},
						 total:{"$sum":1}
					}}]).toArray(function(err,result){
						console.log(result);
						datastatistical.push(result);
						socket.emit("statistical",result);
					});
			 });// lấy dữ liệu vừa max,min trong ngày
		});
		socket.on("statusdevice",function(data){
			MongoClient.connect(url,function(err,db){
				if (err) throw err;
				var dbo = db.db("nodered");
				dbo.collection(data).find({}).limit(1).sort({timestamp:-1}).toArray(function(err,result){
					console.log(result);
					statusdevice.push(result);
					io.sockets.emit("statusdevice",result);
					if(result[0].status==0){
						storage.setItemSync('thoigiantat',momenttime(result[0].timestamp));
					}
					else {
						storage.setItemSync('thoigianbat',momenttime(result[0].timestamp));
					}
					socket.emit("timeonoff",{thoigianbat:storage.getItemSync('thoigianbat'),thoigiantat:storage.getItemSync('thoigiantat')});
				});
			});
		}); // lấy trạng thái tắt bật của thiết bị
		socket.on("onoffdevice",function(data){
				MongoClient.connect(url, function(err, db) {
				  if (err) throw err;
				  var dbo = db.db("nodered");
				  var myobj = { timestamp: new Date(), device:"Đèn", status:data , room:1 };
				  dbo.collection("xuly").insertOne(myobj, function(err, result) {
				    if (err) throw err;
				    console.log("them thanh cong");
				    db.close();
				  });
				});
		});
		socket.on("insertdatasensor",function(data){
				MongoClient.connect(url, function(err, db) {
				  if (err) throw err;
				  var dbo = db.db("nodered");
				  var myobj = { timestamp: new Date(), day : data.day , sensor:{valueTemp:data.valueTemp,valueHumidity:data.valueHumidity,valueGas:data.valueGas,valueCO:data.valueCO,valueAir:data.valueAir}, room:1 };
				  dbo.collection("testnew").insertOne(myobj, function(err, result) {
				    if (err) throw err;
				    console.log("them thanh cong");
						var array = [{sensor:data}];
						io.sockets.emit("datasensor",array);
				    db.close();
				  });
				});
		});
		socket.on("setupautomatically",function(data){
			if(data.id==1){
				MongoClient.connect(url, function(err, db) {
					if (err) throw err;
					var dbo = db.db("nodered");
					var myquery = { id: data.id };
					var newvalues = { $set: {id:data.id,device:"ĐÈN",timeoff:data.timeoff,room:1}};
					dbo.collection("timeautomatic").updateOne(myquery, newvalues, function(err, res) {
						if (err) throw err;
						console.log("vao duoc off",data);
						db.close();
					});
				});
			}
			else{
				MongoClient.connect(url, function(err, db) {
					if (err) throw err;
					var dbo = db.db("nodered");
					var myquery = { id: data.id };
					var newvalues = { $set: {id:2,device:"ĐÈN",timeon:data.timeon,room:1} };
					dbo.collection("timeautomatic").updateOne(myquery, newvalues, function(err, res) {
						if (err) throw err;
						console.log("vao duoc on",data);
						db.close();
					});
				});
			}
		});
		socket.on("statussetupautomatic",function(data){
			MongoClient.connect(url, function(err, db) {
				 if (err) throw err;
				 var dbo = db.db("nodered");
				 dbo.collection(data).find({}).toArray(function(err,result){
						console.log(result);
						io.sockets.emit("statussetupautomatic",result);
				 });
			 });
		});
	});
	return router;
};


function momenttime(timestamp){
	var hours = timestamp.getHours();
	var minutes = timestamp.getMinutes();
	var seconds = timestamp.getSeconds();
	var time = hours + ':' + minutes + ':' + seconds;
	return time;
}

console.log('Bot is running');
var twit=require('twit');
var mysql=require('mysql');
var config=require('./connect.js');
var mysqlconfig=require('./mysqlconnect.js');
var async=require('async');
var tweet=new twit(config);
var express=require('express');
var bodyParser=require('body-parser');
var con = mysql.createConnection(mysqlconfig);

con.connect(function(err){
if(err) {
    console.log("Database is not connected ..."+err);    
} else {
    console.log("database connecting ...");    
}
});


//1 finding tweets starting with word the  //2 finding tweets enfing with h



var app=express();


//var user_id='';

app.use(bodyParser());


app.listen(1337,function(){

	console.log('Listening at port 1337');
});




app.post('/', function(req, res){
	user_id=req.body;         //getting  json string from post req.body and passing to user_id 
    var response=Number(JSON.stringify(user_id.user_id));
    userId=response;

	var asyncTasks = [];       //array to be pushed in asynch parallel or series
	var responseObj = {};

	asyncTasks.push(fetchTweetsWithThe.bind(null, userId, responseObj));
	asyncTasks.push(fetchTweetsWithSt.bind(null, userId, responseObj));

	async.parallel(asyncTasks, function(error){
		if(error){

		}
		var response = {
			TheTweets : responseObj.TheTweets,
			TweetsWithSt : responseObj.TweetsWithSt
		}
		res.send(response);
	})
})



//1st function//

function fetchTweetsWithThe(userId, responseObj, cb){


	 con.query("SELECT tweet FROM tweets WHERE tweet LIKE '%the%' AND user_id="+userId,
  	 	        function(err,rows){
                  if(err){console.log('Error'+err); return err;}
	                    responseObj.TheTweets=JSON.stringify(rows);  
	                    cb(); 
	                   
           })	
	 
}

//2nd function //

function fetchTweetsWithSt(userId, responseObj, cb){
	con.query("SELECT tweet FROM tweets WHERE tweet LIKE '%st' AND user_id="+userId,
  	 	        function(err,rows){
                  if(err){console.log('Error'+err); return err;}
	                    responseObj.TweetsWithSt=JSON.stringify(rows);
	                    cb();   
	                    
           })	
	

}




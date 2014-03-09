var mockingjay  = require('mockingjay'),
		Twit        = require('twit');

var yourReps_credentials  = require('./path/to/yourreps/credentials.json'),
		reporter_credentials  = require('./path/to/reporter/credentials.json');

var opts         = require('./config.json');
opts.credentials = yourReps_credentials;

var T = new Twit(reporter_credentials)

mockingjay.retweet(opts, function(err, result){
	console.log(err, result)
	
	var this_moment = new Date();
	if (!err){
    	T.post('statuses/update', { status: 'YROG ' + this_moment +'\nRetweeted: ' + result.retweeted_matches + '\nSince last: ' + result.since_last + '\nMatches: ' + result.matches}, function(error, reply) {
    		if (error){
				  console.log('YROG Twit error\n', error)
    		}
			})
	}else{
		console.log('YROG Error ' + err)
	 	T.post('statuses/update', { status: 'YROG ' + this_moment +'\n' + err.allErrors }, function(error, reply) {
			if (error){
			  console.log('YROG Twit error\n' + error)
			}
		})
	}
})
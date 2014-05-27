var mockingjay  = require('mockingjay'),
		Twit        = require('twit');

var yourReps_credentials  = require('./path/to/yourreps/credentials.json'),
		reporter_credentials  = require('./path/to/reporter/credentials.json');

var opts         = require('./config.json');
opts.credentials = yourReps_credentials;

var T = new Twit(reporter_credentials);

mockingjay.retweet(opts, function(err, result){
	var this_moment = new Date(),
			tweet_msg;

	if (!err){
		console.log('YROG ' + JSON.stringify(result) );
		tweet_msg = 'YROG ' + this_moment +'\nRetweeted: ' + result.retweeted_matches + '\nSince last: ' + result.since_last + '\nMatches: ' + result.matching;
	}else{
		console.log('YROG ' + JSON.stringify(err) );
		tweet_msg = 'YROG ' + this_moment +'\n' + JSON.stringify(err.allErrors);
	}

	tweet(tweet_msg);
})

function tweet(msg){
	T.post('statuses/update', { status: msg}, function(error, reply) {
		if (error){
		  console.log('YROG Twit error\n', JSON.stringify(error) );
		  tweet('YROG Twit Error');
		}
	})
}
var $ = require('jquery');

var NO_OP = function(){};
 
// randomly choose one of dribbble's popular shots
// keep choosing until we get one with comments
var getRandomShotId = function( callback ){
	var getRandomShot = function( shots ){
		var random_index = Math.floor(Math.random()*shots.length);
		var shot = shots[random_index];
		if( shot.comments_count === 0 ){
			return getRandomShot( shots );
		}
		return shot;
	};
	callback = callback || NO_OP;
	$.getJSON('http://api.dribbble.com/shots/popular?callback=?', function( data ){
		var shot = getRandomShot( data.shots );
		callback( null, shot.id );
	});
};
 
// select a random comment from a dribbble shot
var getRandomCommentFromShot = function( shot_id, callback ){
	callback = callback || NO_OP;
	$.getJSON('http://api.dribbble.com/shots/'+ shot_id +'/comments?callback=?', function( data ){
		var random_index = Math.floor(Math.random()*data.comments.length);
		var random_comment = data.comments[random_index];
		callback( null, random_comment );
	});
};
 
// get a random comment from a random (popular) dribbble shot
var getRandomComment = function( callback ){
	callback = callback || NO_OP;
	getRandomShotId( function( err, shot_id ){
		getRandomCommentFromShot( shot_id, function( err, comment ){
			callback( null, comment );
		});
	});
};

$(function(){
	getRandomComment( function( err, comment ){
		$('#drivvvel').text( comment.body );
	});
});

// livereload
if( window.location.host === '' ){
	$.getScript('http://localhost:35730/livereload.js');
}
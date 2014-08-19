var $ = require('jquery');

var NO_OP = function(){};
var shots_page = 1;
var drivvvel_shots = [];
var drivvvel_comments = [];

$.ajaxSetup({
    cache: true
});

var spliceRandomItem = function( items ){
    var random_index = Math.floor(Math.random()*items.length);
    var item = items.splice( random_index, 1 )[0];
    return item;
};

var getPopularShots = function( callback ){
    callback = callback || NO_OP;
    $.getJSON('http://api.dribbble.com/shots/popular?page='+ shots_page +'&callback=?', function( data ){
        shots_page++;
        return callback( null, data.shots );
    });
};

var getShotCommentsById = function( shot_id, callback ){
    callback = callback || NO_OP;
    $.getJSON('http://api.dribbble.com/shots/'+ shot_id +'/comments?callback=?', function( data ){
        callback( null, data.comments );
    });
};

var getShots = function( callback ){
    callback = callback || NO_OP;
    if( drivvvel_shots.length > 0 ){
        return callback( null, drivvvel_shots );
    } else {
        getPopularShots( function( err, shots ){
            drivvvel_shots = drivvvel_shots.concat( shots );
            return callback( null, drivvvel_shots );
        });
    }
};

var getRandomShotComments = function( callback ){
    callback = callback || NO_OP;
    getShots( function( err, shots ){
        var shot = spliceRandomItem( shots );
        getShotCommentsById( shot.id, function( err, comments ){
            return callback( null, comments );
        });
    });
};

var filterComments = function( comments ){
    var filtered_comments = $.grep( comments, function( comment, i ){
        var trimmed_comment_body = $.trim( comment.body );
        var word_count = trimmed_comment_body.split( /,?\s+/ ).length;
        return ( word_count < 6 );
    });
    return filtered_comments;
};

var getComments = function( callback ){
    callback = callback || NO_OP;
    if( drivvvel_comments.length > 0 ){
        return callback( null, drivvvel_comments );
    } else {
        getRandomShotComments( function( err, comments ){
            comments = filterComments( comments );
            drivvvel_comments = drivvvel_comments.concat( comments );
            return callback( null, drivvvel_comments );
        });
    }
};

var getRandomComment = function( callback ){
    callback = callback || NO_OP;
    getComments( function( err, comments ){
        var comment = spliceRandomItem( comments );
        return callback( null, comment );
    });
};

displayComment = function(){
    getRandomComment( function( err, comment ){
        $(function(){
            $('#drivvvel').text( comment.body );
        });
    });
};

var startDrivvvel = function(){
    displayComment();
};

startDrivvvel();

// livereload
if( window.location.host === '' ){
	$.getScript('http://localhost:35730/livereload.js');
}

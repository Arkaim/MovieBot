var TelegramBot = require('node-telegram-bot-api');
const mdb = require('moviedb')('9f619f0ff604d6614f3c9db76ca445ed');
var options = require('./options.js')
var Promise = require('promise');


// Мой установленый токен
var token = '455685254:AAGFLOjxbPWjg-2126PF_pOUqdnUpdExuM0';
// включил опрос сервера, не знаю зачем но в туториале так сделали
var bot = new TelegramBot(token, {polling: true});



bot.onText(/\/movie (.+)/, function (msg, match) {
      var fromId = msg.from.id;
      mdb.searchMovie({ query: match[1] }, (err, res) => { 
      	if (res.total_results  == 0) {
      		bot.sendMessage(fromId, '😢 Sorry, nothing found(');
      	} else {
      	var req = res.results[0];
      	mdb.movieInfo({id:req.id}, (err, res) => {
		    var duration = res.runtime;
      		var result = ("📅 Release Date: " + req.release_date + "\n" + "🌐 Original Language: " + req.original_language +'\n' + '🕑 Duration: ' + duration + ' min' + '\n⭐ Rating: ' + res.vote_average + '/10\n'  + '🔖 Genre: ' + res.genres[0].name + '\n💰 Budget: ' + res.budget + '$');
	    bot.sendPhoto(fromId, ('https://image.tmdb.org/t/p/w500' + req.poster_path), {caption:result});
	    bot.sendMessage(fromId, ('✍ *Tagline:* ' + res.tagline  + '\n*🎞 Description:* ' + res.overview + '\n') , {parse_mode: 'Markdown'});
		});
      }
    });    
});

bot.onText(/\/cast (.+)/, function(msg,match) {
	var fromId = msg.from.id;
	mdb.searchPerson({query: match[1]}, (err,res) =>{
		if (res.total_results == 0) {
			bot.sendMessage(fromId, '😢 Sorry, nothing found(');
		}else {
			var fullName = '*👤 Full Name: ' + res.results[0].name + '*\n';
			var knownFor = '*🌐 Best known for: *\n';
			for (var i = 0; i < res.results[0].known_for.length; i++) {
				knownFor += '*' + (i+1) + ') *' + res.results[0].known_for[i].title + '\n';
			}
			bot.sendPhoto(fromId, ('https://image.tmdb.org/t/p/w500' + res.results[0].profile_path));
			bot.sendMessage(fromId, fullName + knownFor, {parse_mode: "Markdown"});
		}
	});

});

bot.onText(/\/genre/, (msg) => {
	bot.sendMessage(msg.chat.id, 'Choose your genre:', options.keys);
});

bot.on('callback_query', function(msg) {
	console.log(msg.data)
	if (msg.data > 11)  {
		mdb.discoverMovie({with_genres: msg.data}, (err,res) => {
			var genreInfo = '*The list of movies with given genre (sorted by popularity)* \n';
			for (var i = 0; i < 10; i++) {
				genreInfo = genreInfo + '*' + (i+1) + ") " + res.results[i].title + '\n*';
			}
			genreInfo = genreInfo + '\n If you want information about some of this movies, just click on number.'
			bot.sendMessage(msg.from.id, genreInfo, options.numbers);

			bot.on('callback_query',function(msg) {
				var choosenMovie = res.results[msg.data - 1].title;
				mdb.searchMovie({ query: choosenMovie }, (err, res) => { 
			      	if (res.total_results  == 0) {
			      		bot.sendMessage(msg.from.id, '😢 Sorry, nothing found(');
			      	} else {
			      	var req = res.results[0];
			      	mdb.movieInfo({id:req.id}, (err, res) => {
					    var duration = res.runtime;
			      		var result = ("📅 Release Date: " + req.release_date + "\n" + "🌐 Original Language: " + req.original_language +'\n' + '🕑 Duration: ' + duration + ' min' + '\n⭐ Rating: ' + res.vote_average + '/10\n'  + '🔖 Genre: ' + res.genres[0].name + '\n💰 Budget: ' + res.budget + '$');
				    bot.sendPhoto(msg.from.id, ('https://image.tmdb.org/t/p/w500' + req.poster_path), {caption:result});
				    bot.sendMessage(msg.from.id, ('✍ *Tagline:* ' + res.tagline  + '\n*🎞 Description:* ' + res.overview + '\n') , {parse_mode: 'Markdown'});
					});
			      }
			    });

			});
		})
	}
	
})





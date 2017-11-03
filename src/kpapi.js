var TelegramBot = require('node-telegram-bot-api');
const mdb = require('moviedb')('9f619f0ff604d6614f3c9db76ca445ed');
var options = require('./options.js')

// Устанавливаем токен, который выдавал нам бот.
var token = '455685254:AAGFLOjxbPWjg-2126PF_pOUqdnUpdExuM0';
// Включить опрос сервера
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
		bot.sendPhoto(fromId, ('https://image.tmdb.org/t/p/w500' + res.results[0].profile_path), {caption: "🌐 Best known for: " + res.results[0].known_for[0].title + '\n' + res.results[0].known_for[0].overview})
		}
	});

});

bot.onText(/\/genres/, (msg) => {
	bot.sendMessage(msg.chat.id, 'Выберите любую кнопку:', options.keys);
});






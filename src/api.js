const mdb = require('moviedb')('9f619f0ff604d6614f3c9db76ca445ed');

mdb.searchPerson({query: 'tom hanks'}, (err, res) => {
      	console.log(res);
}); 
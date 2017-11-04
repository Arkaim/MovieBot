var keys = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Adventure', callback_data: '12' }],
      [{ text: 'Comedy', callback_data: '35' }],
      [{ text: 'Animation', callback_data: '16' }],
      [{ text: 'Crime', callback_data: '80' }],
      [{ text: 'Documentary', callback_data: '99' }],
      [{ text: 'Drama', callback_data: '18' }],
      [{ text: 'Fantasy', callback_data: '14' }],
      [{ text: 'Horror', callback_data: '27' }],
      [{ text: 'Romance', callback_data: '10749' }],
      [{ text: 'Western', callback_data: '37' }],
      [{ text: 'Music', callback_data: '10402' }]
    ]
  })
};

var numbers = {
  parse_mode: 'Markdown',
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: '1', callback_data: '1' },
      { text: '2', callback_data: '2' },
      { text: '3', callback_data: '3' },
      { text: '4', callback_data: '4' },
      { text: '5', callback_data: '5' }],
      [{ text: '6', callback_data: '6' },
      { text: '7', callback_data: '7' },
      { text: '8', callback_data: '8' },
      { text: '9', callback_data: '9' },
      { text: '10', callback_data: '10' }]
      // [{text: 'Ok, thanks', callback_data:'11'}]
    ]
  })
};

var forceReply = {
  parse_mode: 'Markdown',
  reply_markup: JSON.stringify({
    'force_reply' : true
  })
};


exports.forceReply = forceReply;
exports.keys = keys;
exports.numbers = numbers;
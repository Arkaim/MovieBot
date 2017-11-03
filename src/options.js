var keys = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Adventure', callback_data: '1' }],
      [{ text: 'Comedy', callback_data: 'data 2' }],
      [{ text: 'Fantasy', callback_data: 'text 3' }]
    ]
  })
};

exports.keys = keys;
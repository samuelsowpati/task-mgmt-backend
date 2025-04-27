const request = require('request');

const sendText = async (req, res) => {
  const {name, phone, location } = req.body;
    request.post('https://textbelt.com/text', {
      form: {
        phone: phone,
        message: `Hello ${name}! You have arrived at ${location}`,
        key: process.env.TEXTBELT_API_KEY,
      },
    }, (err, httpResponse, body) => {
    res.json(JSON.parse(body));
    });
}

module.exports = { sendText };

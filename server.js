const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-sms', (req, res) => {
    const { name, message } = req.body;
    const fullMessage = `Name: ${name}\nMessage: ${message}`;

    const apiKey = '7b467518';
    const apiSecret = '3DgGuKxB0RrvryjM';
    const toPhoneNumber = '918432070754';
    
    axios.post('https://rest.nexmo.com/sms/json', null, {
        params: {
            from: 'Vonage APIs',
            text: fullMessage,
            to: toPhoneNumber,
            api_key: apiKey,
            api_secret: apiSecret
        }
    })
    .then(response => {
        if (response.data.messages[0].status === '0') {
            res.send({ success: true });
        } else {
            res.status(500).send({ success: false, error: response.data.messages[0]['error-text'] });
        }
    })
    .catch(err => res.status(500).send({ success: false, error: err.message }));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

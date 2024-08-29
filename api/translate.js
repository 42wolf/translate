const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Missing text' });
    }

    const apiKey = process.env.LINGVANEX_API_KEY;
    const endpoint = 'https://api-gl.lingvanex.com/language/translate/v2';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                target: 'en',
                q: [text]
            })
        });

        const data = await response.json();
        const translatedText = data.translations[0].translatedText;

        res.status(200).json({ translatedText });

    } catch (error) {
        res.status(500).json({ error: 'Translation failed' });
    }
};

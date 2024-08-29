const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { text } = req.body;
    const apiKey = process.env.LINGVANEX_API_KEY;
    const endpoint = 'https://api-gl.lingvanex.com/language/translate/v2';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                target: 'en',
                q: [text],
            }),
        });

        const data = await response.json();
        res.status(200).json({ translations: data.data.translations });

    } catch (error) {
        console.error('Error translating:', error);
        res.status(500).json({ error: 'Translation failed' });
    }
};

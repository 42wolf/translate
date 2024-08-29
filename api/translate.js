const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { q } = req.body;
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
                q
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: '翻译失败，请稍后再试。' });
    }
};

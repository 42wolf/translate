// api/translate.js
const fetch = require('node-fetch');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { text } = req.body;
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
            res.status(200).json(data);
        } catch (error) {
            console.error('翻译错误:', error);
            res.status(500).json({ error: '翻译失败，请稍后再试。' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

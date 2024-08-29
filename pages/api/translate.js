export default async function handler(req, res) {
    const { text } = req.body;

    const response = await fetch('https://api-gl.lingvanex.com/language/translate/v2', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.API_KEY}`
        },
        body: JSON.stringify({
            q: [text],
            target: 'en'
        }),
    });

    const data = await response.json();
    res.status(200).json(data.data);
}

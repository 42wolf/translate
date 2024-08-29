async function translateAddress() {
    const text = document.getElementById('chineseAddress').value;
    if (!text.trim()) {
        document.getElementById('englishAddress').value = '';
        return;
    }

    const apiKey = 'YOUR_LINGVANEX_API_KEY';
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
        
        // 打印 API 响应以调试
        console.log('API Response:', data);
        
        // 确保 data 和 data.data.translations 存在
        if (data && data.data && data.data.translations && data.data.translations.length > 0) {
            const translatedText = data.data.translations[0].translatedText;
            document.getElementById('englishAddress').value = translatedText;
        } else {
            document.getElementById('englishAddress').value = '翻译失败，请稍后再试。';
        }

    } catch (error) {
        document.getElementById('englishAddress').value = '翻译失败，请稍后再试。';
        console.error('翻译错误:', error);
    }
}

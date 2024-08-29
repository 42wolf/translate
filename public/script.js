async function translateAddress() {
    const text = document.getElementById('chineseAddress').value;
    if (!text.trim()) {
        document.getElementById('englishAddress').value = '';
        return;
    }

    const apiKey = 'YOUR_LINGVANEX_API_KEY';  // 替换为实际的 API 密钥
    const endpoint = 'https://api-gl.lingvanex.com/language/translate/v2';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': `Bearer ${apiKey}`  // 确保 API 密钥以 Bearer Token 形式传递
            },
            body: JSON.stringify({
                "target": "en",
                "q": [text]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API response:', data);  // 调试用，查看完整响应

        // 检查 data 对象的结构
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

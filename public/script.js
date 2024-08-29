async function translateAddress() {
    const text = document.getElementById('chineseAddress').value;
    if (!text.trim()) {
        document.getElementById('englishAddress').value = '';
        return;
    }

    try {
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text })
        });

        if (!response.ok) {
            throw new Error('网络响应不是 OK');
        }

        const responseText = await response.text(); // 先将响应作为文本处理
        try {
            const data = JSON.parse(responseText); // 解析文本为 JSON
            const translatedText = data.data.translations[0].translatedText;
            document.getElementById('englishAddress').value = translatedText;
        } catch (jsonError) {
            console.error('解析 JSON 错误:', jsonError);
            document.getElementById('englishAddress').value = '翻译失败，请稍后再试。';
        }

    } catch (error) {
        document.getElementById('englishAddress').value = '翻译失败，请稍后再试。';
        console.error('翻译错误:', error);
    }
}

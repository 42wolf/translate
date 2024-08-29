function validateAddress() {
    const input = document.getElementById('chineseAddress').value;
    const button = document.querySelector('.translate-button');
    
    // 移除对地址格式的限制，允许任何内容
    const isValid = input.trim().length > 0;
    
    if (isValid) {
        button.disabled = false;
        button.style.backgroundColor = '#6e8efb';
    } else {
        button.disabled = true;
        button.style.backgroundColor = '#ccc';
    }
}

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
        const translatedText = data.data.translations[0].translatedText;
        document.getElementById('englishAddress').value = translatedText;

    } catch (error) {
        document.getElementById('englishAddress').value = '翻译失败，请稍后再试。';
        console.error('翻译错误:', error);
    }
}

function copyToClipboard() {
    const textArea = document.getElementById('englishAddress');
    textArea.select();
    document.execCommand('copy');
    alert('英文地址已复制到剪贴板！');
}

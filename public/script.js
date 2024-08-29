function validateAddress() {
    const input = document.getElementById('chineseAddress').value;
    const button = document.querySelector('.translate-button');
    const isValid = /[\u4e00-\u9fa5]/.test(input);

    if (isValid) {
        button.disabled = false;
        button.style.backgroundColor = '#6e8efb';
    } else {
        button.disabled = true;
        button.style.backgroundColor = '#ccc';
        alert("本翻译器只能够翻译地址信息，请输入包含省、市、县或区的地址。");
    }
}

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
            body: JSON.stringify({ text }),
        });

        const data = await response.json();
        const translatedText = data.translations[0].translatedText;
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

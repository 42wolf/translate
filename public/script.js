async function translateAddress() {
    const text = document.getElementById('chineseAddress').value;
    if (!text.trim()) {
        document.getElementById('englishAddress').value = '';
        return;
    }

    const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ q: [text], target: 'en' })
    });

    const data = await response.json();
    const translatedText = data.data.translations[0].translatedText;
    document.getElementById('englishAddress').value = translatedText;
}

function validateAddress() {
    const input = document.getElementById('chineseAddress').value;
    const button = document.querySelector('.translate-button');
    const isValid = /[\u4e00-\u9fa5]+/.test(input.trim());
    
    if (isValid) {
        button.disabled = false;
        button.style.backgroundColor = '#6e8efb';
    } else {
        button.disabled = true;
        button.style.backgroundColor = '#ccc';
    }
}

function copyToClipboard() {
    const textArea = document.getElementById('englishAddress');
    textArea.select();
    document.execCommand('copy');
    alert('英文地址已复制到剪贴板！');
}

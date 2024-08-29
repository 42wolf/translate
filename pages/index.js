import { useState } from 'react';

export default function Home() {
    const [chineseAddress, setChineseAddress] = useState('');
    const [englishAddress, setEnglishAddress] = useState('');

    const validateAddress = (address) => {
        return /[省市县区]/.test(address);
    };

    const translateAddress = async () => {
        if (!validateAddress(chineseAddress)) {
            alert('本翻译器只能够翻译地址信息，无法进行别的翻译');
            return;
        }

        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: chineseAddress }),
        });

        const data = await response.json();
        setEnglishAddress(data.translations[0].translatedText);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(englishAddress);
        alert('英文地址已复制到剪贴板！');
    };

    return (
        <div>
            <h1>中文地址翻译器</h1>
            <h2>把你的中文地址翻译成英文</h2>
            <div className="container">
                <div className="input-area">
                    <textarea
                        value={chineseAddress}
                        onChange={(e) => setChineseAddress(e.target.value)}
                        placeholder="请输入中文地址..."
                    ></textarea>
                </div>
                <div className="translate-button-container">
                    <button className="translate-button" onClick={translateAddress}>
                        &#8594;
                    </button>
                </div>
                <div className="output-area">
                    <textarea
                        value={englishAddress}
                        readOnly
                        placeholder="翻译后的英文地址将显示在这里……点击即可复制"
                        onClick={copyToClipboard}
                    ></textarea>
                </div>
            </div>
            <div className="example">
                <p>
                    <strong>示例:</strong> 输入地址“<strong>北京市朝阳区北四环东路65号(望京SOHO)大厦A座402室</strong>”将翻译为“<strong>Room 402, Building A, Wangjing SOHO, No. 65 North Fourth Ring East Road, Chaoyang District, Beijing</strong>”。
                </p>
                <p>请输入详细的中文地址以进行翻译。</p>
            </div>
            <div className="privacy-note">
                <p>本站点并不保存您的地址信息，请放心使用。</p>
            </div>
        </div>
    );
}

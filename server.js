const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

// ⚠️ GANTI DENGAN TOKEN ASLI KAMU (dari replicate.com/account/api-tokens)
const REPLICATE_API_TOKEN = 'r8_C2KBX74w0Ce0YnayFfWV0Y93UrasMMb1K91m5

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BEJU AI Musik Studio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            min-height: 100vh;
            background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
            padding: 20px;
        }
        .container {
            max-width: 700px;
            margin: 0 auto;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 30px;
            padding: 30px;
            box-shadow: 0 25px 45px rgba(0,0,0,0.2);
            border: 1px solid rgba(255,255,255,0.2);
        }
        h1 {
            color: #e94560;
            text-align: center;
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(233,69,96,0.5);
        }
        .subtitle {
            text-align: center;
            color: #ccc;
            margin-bottom: 30px;
        }
        input, select {
            width: 100%;
            padding: 15px;
            margin: 10px 0;
            border-radius: 15px;
            border: none;
            background: rgba(255,255,255,0.9);
            font-size: 16px;
        }
        button {
            width: 100%;
            padding: 15px;
            margin: 20px 0;
            border-radius: 15px;
            border: none;
            background: linear-gradient(90deg, #e94560, #ff6b6b);
            color: white;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            transition: transform 0.2s;
        }
        button:hover {
            transform: scale(1.02);
        }
        button:active {
            transform: scale(0.98);
        }
        #result {
            margin-top: 20px;
            padding: 20px;
            background: rgba(0,0,0,0.3);
            border-radius: 15px;
            text-align: center;
        }
        audio {
            width: 100%;
            margin-top: 10px;
            border-radius: 10px;
        }
        .loading {
            color: #ff6b6b;
            font-size: 14px;
            animation: pulse 1s infinite;
        }
        @keyframes pulse {
            0% { opacity: 0.6; }
            100% { opacity: 1; }
        }
        a {
            color: #e94560;
            text-decoration: none;
            display: inline-block;
            margin-top: 15px;
        }
        a:hover {
            text-decoration: underline;
        }
        .warning {
            background: rgba(255,100,100,0.2);
            color: #ff9999;
            padding: 10px;
            border-radius: 10px;
            margin-top: 15px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎵 BEJU AI Musik Studio</h1>
        <div class="subtitle">Ciptakan musik dengan kecerdasan buatan</div>
        
        <input type="text" id="prompt" placeholder="🎤 Deskripsikan musik yang kamu inginkan...&#10;Contoh: sedih piano dengan suara hujan, atau lagu pop ceria untuk dansa">
        
        <select id="duration">
            <option value="5">⏱️ 5 detik - Cepat</option>
            <option value="10" selected>⏱️ 10 detik - Standar</option>
            <option value="15">⏱️ 15 detik - Panjang</option>
        </select>
        
        <button onclick="generateMusic()">✨ Generate Musik ✨</button>
        
        <div id="result">
            <div class="warning">💡 Masukkan deskripsi musik, lalu klik tombol di atas</div>
        </div>
    </div>

    <script>
        async function generateMusic() {
            const prompt = document.getElementById('prompt').value;
            const duration = document.getElementById('duration').value;
            
            if(!prompt || prompt.trim() === '') {
                alert('❌ Masukkan deskripsi musik dulu!');
                return;
            }
            
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '<div class="loading">🎵 AI sedang menciptakan musik... tunggu 20-40 detik ⏳</div>';
            
            try {
                const response = await fetch('/generate-music', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        prompt: prompt,
                        duration: parseInt(duration)
                    })
                });
                
                const data = await response.json();
                
                if(data.success && data.audioUrl) {
                    resultDiv.innerHTML = \`
                        <strong style="color:#4caf50;">✅ Musik berhasil diciptakan!</strong><br>
                        <audio controls src="\${data.audioUrl}" autoplay></audio><br>
                        <a href="\${data.audioUrl}" download="beju_musik_\${Date.now()}.mp3">📥 Download MP3</a>
                    \`;
                } else {
                    resultDiv.innerHTML = \`
                        <strong style="color:#ff6b6b;">❌ Gagal: \${data.error || 'Coba lagi nanti'}</strong><br>
                        <div class="warning">Tips: Coba deskripsi yang lebih sederhana, atau tunggu 1 menit lalu coba lagi</div>
                    \`;
                }
            } catch(e) {
                resultDiv.innerHTML = \`
                    <strong style="color:#ff6b6b;">❌ Error: \${e.message}</strong><br>
                    <div class="warning">Cek koneksi internet atau coba refresh halaman</div>
                \`;
            }
        }
    </script>
</body>
</html>
    `);
});

// Endpoint untuk generate musik
app.post('/generate-music', async (req, res) => {
    const { prompt, duration } = req.body;
    
    // Cek token
    if (!REPLICATE_API_TOKEN || REPLICATE_API_TOKEN === 'r8_') {
        return res.json({ 
            success: false, 
            error: 'Token API belum diset. Hubungi admin untuk konfigurasi.' 
        });
    }
    
    try {
        // Kirim request ke Replicate
        const response = await axios.post('https://api.replicate.com/v1/predictions', {
            version: "671ac645ce4e5cc63c54a2ebff89383c84960f7f1a7e5b27f1d3171c6c0c4f6b",
            input: {
                prompt: prompt,
                duration: duration || 10,
                temperature: 0.8,
                top_k: 250
            }
        }, {
            headers: {
                'Authorization': `Token ${REPLICATE_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        const predictionId = response.data.id;
        
        // Polling sampai selesai
        let result = null;
        let attempts = 0;
        const maxAttempts = 25;
        
        while (attempts < maxAttempts && !result) {
            await new Promise(r => setTimeout(r, 2000));
            attempts++;
            
            const statusRes = await axios.get(`https://api.replicate.com/v1/predictions/${predictionId}`, {
                headers: { 'Authorization': `Token ${REPLICATE_API_TOKEN}` }
            });
            
            if (statusRes.data.status === 'succeeded') {
                result = statusRes.data.output;
                break;
            } else if (statusRes.data.status === 'failed') {
                throw new Error('AI gagal menciptakan musik');
            }
        }
        
        if (result && (result.audio || result.audio_url)) {
            const audioUrl = result.audio || result.audio_url;
            res.json({ success: true, audioUrl: audioUrl });
        } else {
            res.json({ success: false, error: 'Waktu habis, silakan coba lagi' });
        }
        
    } catch (error) {
        console.error('Error detail:', error.response?.data || error.message);
        
        let errorMessage = 'Terjadi kesalahan';
        if (error.response?.status === 401) {
            errorMessage = 'Token API tidak valid. Periksa kembali token Replicate.';
        } else if (error.response?.status === 402) {
            errorMessage = 'Kuota API habis. Upgrade akun Replicate.';
        } else if (error.code === 'ECONNREFUSED') {
            errorMessage = 'Koneksi ke server AI gagal';
        } else {
            errorMessage = error.response?.data?.detail || error.message;
        }
        
        res.json({ success: false, error: errorMessage });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server BEJU Musik berjalan di port ${PORT}`);
    console.log(`📱 Buka di: http://localhost:${PORT}`);
});

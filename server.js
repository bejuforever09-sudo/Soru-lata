const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

// GANTI DENGAN TOKEN ASLI KAMU - TANPA SPASI!
const REPLICATE_API_TOKEN = 'r8_4cGeSMrTET1NVH2upcVocUEZPNGYZaAG0tVBE0';

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>BEJU AI Musik</title>
    <style>
        body { font-family: Arial; max-width: 700px; margin: 50px auto; padding: 20px; background: #1a1a2e; color: white; text-align: center; }
        h1 { color: #e94560; }
        input, select, button { width: 100%; padding: 12px; margin: 10px 0; border-radius: 8px; border: none; }
        button { background: #e94560; color: white; cursor: pointer; font-size: 16px; font-weight: bold; }
        button:hover { background: #ff6b6b; }
        #result { margin-top: 20px; padding: 15px; background: #16213e; border-radius: 8px; }
        audio { width: 100%; margin-top: 10px; }
        .loading { color: #ff6b6b; }
    </style>
</head>
<body>
    <h1>🎵 BEJU AI Musik Studio</h1>
    <p>Buat lagu dengan AI dari teks deskripsi</p>
    
    <input type="text" id="prompt" placeholder="Contoh: musik piano sedih, atau lagu pop ceria">
    <select id="duration">
        <option value="5">5 detik</option>
        <option value="10" selected>10 detik</option>
    </select>
    <button onclick="generateMusic()">🎤 Generate Musik</button>
    <div id="result"></div>

    <script>
        async function generateMusic() {
            const prompt = document.getElementById('prompt').value;
            const duration = document.getElementById('duration').value;
            
            if(!prompt) {
                alert('Masukkan deskripsi lagu dulu!');
                return;
            }
            
            document.getElementById('result').innerHTML = '<div class="loading">🎵 AI sedang menciptakan lagu... tunggu 20-40 detik</div>';
            
            try {
                const response = await fetch('/generate-music', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt, duration })
                });
                
                const data = await response.json();
                
                if(data.audioUrl) {
                    document.getElementById('result').innerHTML = \`
                        <strong>🎉 Lagu selesai!</strong><br>
                        <audio controls src="\${data.audioUrl}"></audio><br>
                        <a href="\${data.audioUrl}" download="beju_lagu.mp3">⬇️ Download MP3</a>
                    \`;
                } else {
                    document.getElementById('result').innerHTML = '<p style="color:red;">Gagal: ' + (data.error || 'Coba lagi') + '</p>';
                }
            } catch(e) {
                document.getElementById('result').innerHTML = '<p style="color:red;">Error: ' + e.message + '</p>';
            }
        }
    </script>
</body>
</html>
    `);
});

app.post('/generate-music', async (req, res) => {
    const { prompt, duration } = req.body;
    
    try {
        const response = await axios.post('https://api.replicate.com/v1/predictions', {
            version: "671ac645ce4e5cc63c54a2ebff89383c84960f7f1a7e5b27f1d3171c6c0c4f6b",
            input: {
                prompt: prompt,
                duration: parseInt(duration) || 10
            }
        }, {
            headers: {
                'Authorization': `Token ${REPLICATE_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        const predictionId = response.data.id;
        
        let result = null;
        for (let i = 0; i < 30; i++) {
            await new Promise(r => setTimeout(r, 2000));
            
            const statusRes = await axios.get(`https://api.replicate.com/v1/predictions/${predictionId}`, {
                headers: { 'Authorization': `Token ${REPLICATE_API_TOKEN}` }
            });
            
            if (statusRes.data.status === 'succeeded') {
                result = statusRes.data.output;
                break;
            } else if (statusRes.data.status === 'failed') {
                throw new Error('Gagal generate musik');
            }
        }
        
        if (result && result.audio) {
            res.json({ audioUrl: result.audio });
        } else {
            res.json({ error: 'Timeout atau gagal generate' });
        }
        
    } catch (error) {
        console.error('Error:', error.message);
        res.json({ error: 'Gagal memproses: ' + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port', PORT));

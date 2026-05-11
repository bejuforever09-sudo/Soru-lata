const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Halaman utama
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
        h2 { color: #ff6b6b; font-size: 18px; }
        input, select, button { width: 100%; padding: 12px; margin: 10px 0; border-radius: 8px; border: none; }
        button { background: #e94560; color: white; cursor: pointer; font-size: 16px; font-weight: bold; }
        button:hover { background: #ff6b6b; }
        #result { margin-top: 20px; padding: 15px; background: #16213e; border-radius: 8px; }
        audio { width: 100%; margin-top: 10px; }
        .loading { color: #ff6b6b; font-size: 14px; }
    </style>
</head>
<body>
    <h1>🎵 BEJU AI Musik Studio</h1>
    <p>Buat lagu dengan AI dari teks deskripsi</p>
    
    <input type="text" id="prompt" placeholder="Contoh: sedih piano dengan hujan, atau lagu pop ceria tentang cinta">
    <select id="duration">
        <option value="5">5 detik (cepat)</option>
        <option value="10" selected>10 detik (standar)</option>
        <option value="15">15 detik (lebih panjang)</option>
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
            
            document.getElementById('result').innerHTML = '<div class="loading">🎵 AI sedang menciptakan lagu... tunggu 20-30 detik</div>';
            
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
                        <a href="\${data.audioUrl}" download="lagu_beju.mp3">⬇️ Download MP3</a>
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

// API untuk generate musik (akan diisi setelah dapat API token)
app.post('/generate-music', async (req, res) => {
    // SEMENTARA: ini masih simulasi karena butuh API token
    // Nanti kita ganti dengan kode asli setelah kamu punya token Replicate
    
    const { prompt, duration } = req.body;
    
    // Simulasi dulu (lagu contoh)
    res.json({ 
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port', PORT));

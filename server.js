const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>BEJU Musik AI</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            min-height: 100vh;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 30px;
            padding: 40px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 25px 45px rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.2);
        }
        h1 {
            color: #e94560;
            text-align: center;
            font-size: 2em;
            margin-bottom: 10px;
        }
        p {
            text-align: center;
            color: #ccc;
            margin-bottom: 30px;
        }
        input {
            width: 100%;
            padding: 15px;
            margin: 10px 0;
            border-radius: 15px;
            border: none;
            font-size: 16px;
            background: rgba(255,255,255,0.9);
        }
        button {
            width: 100%;
            padding: 15px;
            margin: 20px 0;
            border-radius: 15px;
            border: none;
            background: #e94560;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        button:hover {
            background: #ff6b6b;
            transform: scale(1.02);
        }
        .result {
            margin-top: 20px;
            padding: 20px;
            background: rgba(0,0,0,0.4);
            border-radius: 15px;
            color: white;
            line-height: 1.6;
            white-space: pre-line;
        }
        .footer {
            text-align: center;
            color: #888;
            font-size: 12px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>🎵 BEJU Musik AI</h1>
        <p>Ciptakan lirik lagu dengan AI</p>
        
        <input type="text" id="theme" placeholder="Masukkan tema lagu...&#10;Contoh: cinta, sahabat, semangat, patah hati">
        
        <button onclick="buatLirik()">✨ Buat Lirik Lagu ✨</button>
        
        <div class="result" id="result">
            💡 Ketik tema lagu lalu klik tombol di atas
        </div>
        <div class="footer">
            BEJU AI Music Studio - Generator Lirik Lagu
        </div>
    </div>

    <script>
        function buatLirik() {
            const theme = document.getElementById('theme').value;
            
            if (!theme || theme.trim() === '') {
                alert('❌ Masukkan tema lagu dulu!');
                return;
            }
            
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '🎵 AI sedang menulis lirik...';
            
            setTimeout(() => {
                const lirik = generateLirik(theme);
                resultDiv.innerHTML = lirik;
            }, 500);
        }
        
        function generateLirik(theme) {
            const templates = {
                cinta: `💕 LAGU CINTA - "${theme}" 💕\n\n[Verse 1]\nSetiap kali kau tersenyum\nHatiku bergetar riang\nSeakan dunia berhenti\nHanya untuk kita berdua\n\n[Chorus]\n${theme}, oh ${theme}\nKau bintang di malam kelam\n${theme}, hanya ${theme}\nYang mampu buatku tenang\n\n[Outro]\nBersamamu selamanya...`,
                
                sahabat: `🤝 LAGU PERSAHABATAN - "${theme}" 🤝\n\n[Verse 1]\nKau selalu ada di saatku rapuh\nMenopang langkah saat aku terjatuh\nTak ada rahasia di antara kita\nBersama melewati suka dan duka\n\n[Chorus]\n${theme}, teman sejati\nTerima kasih untuk semua hari\n${theme}, takkan terganti\nKau saudara yang Tuhan beri`,
                
                semangat: `🔥 LAGU SEMANGAT - "${theme}" 🔥\n\n[Verse 1]\nBangkitlah wahai hati yang luka\nMasih panjang jalan yang harus kau tempuh\nJangan menyerah sebelum mencoba\nKarena esok masih menyimpan asa\n\n[Chorus]\n${theme}, raih mimpimu\n${theme}, kejar bintangmu\nJangan pernah ragu\nKamu bisa melakukannya!`,
                
                patah: `💔 LAGU PATAH HATI - "${theme}" 💔\n\n[Verse 1]\nKau pergi tanpa pamit\nMeninggalkan luka yang dalam\nAir mata jatuh tak henti\nMengiringi kepergianmu\n\n[Chorus]\n${theme}, kenapa kau tega\n${theme}, hancurkan semua rasa\nBiarkan waktu yang kan sembuhkan\nLuka di hati yang tersimpan`
            };
            
            let template = templates.cinta;
            const temaLower = theme.toLowerCase();
            
            if (temaLower.includes('sahabat') || temaLower.includes('teman')) {
                template = templates.sahabat;
            } else if (temaLower.includes('semangat') || temaLower.includes('bangkit') || temaLower.includes('sukses')) {
                template = templates.semangat;
            } else if (temaLower.includes('patah') || temaLower.includes('kecewa') || temaLower.includes('sedih')) {
                template = templates.patah;
            } else if (temaLower.includes('cinta') || temaLower.includes('sayang')) {
                template = templates.cinta;
            } else {
                template = `🎵 LAGU "${theme}" 🎵\n\n[Verse 1]\nDi dalam hati yang terdalam\n${theme} menjadi cerita indah\nSetiap hari ku rasakan\nKehangatan yang tak tergantikan\n\n[Chorus]\n${theme}, oh ${theme}\nKau mengisi hariku\n${theme}, hanya ${theme}\nYang ku inginkan selalu\n\n~ Terima kasih telah menggunakan BEJU AI ~`;
            }
            
            return template;
        }
    </script>
</body>
</html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ BEJU Musik AI berjalan di port ${PORT}`);
});

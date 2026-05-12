const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>BEJU AI Musik</title>
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
            max-width: 600px;
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
        .subtitle {
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
            line-height: 1.8;
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
        <h1>🎵 BEJU AI Musik Studio</h1>
        <div class="subtitle">Ciptakan lirik lagu dengan AI</div>
        
        <input type="text" id="theme" placeholder="Masukkan tema lagu...&#10;Contoh: cinta, sahabat, semangat, patah hati, persahabatan">
        
        <button onclick="buatLirik()">🎤 Buat Lirik Lagu 🎤</button>
        
        <div class="result" id="result">
            💡 Ketik tema lagu di atas lalu klik tombol
        </div>
        <div class="footer">
            BEJU AI Music Studio - Generator Lirik Lagu Indonesia
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
            resultDiv.innerHTML = '🎵 AI sedang menulis lirik yang indah untukmu... ✍️';
            
            setTimeout(() => {
                const lirik = generateLirik(theme);
                resultDiv.innerHTML = lirik;
            }, 800);
        }
        
        function generateLirik(theme) {
            const t = theme.toLowerCase();
            
            if (t.includes('cinta') || t.includes('sayang') || t.includes('kasih')) {
                return `💕 LAGU CINTA - "${theme}" 💕\n\n[Verse 1]\nKala senja mulai merambat\nMembawa rindu yang terpendam\nSenyummu bagai mentari pagi\nMenerangi setiap malamku\n\n[Chorus]\n${theme}, engkaulah inspirasiku\n${theme}, hanya kau di hatiku\nSeperti bintang yang bersinar\nTerangi gelapnya malam\n\n[Verse 2]\nTakkan pernah ku lupakan\nBetapa indah rasanya\nBersamamu ku temukan arti\nCinta yang sesungguhnya\n\n[Outro]\n${theme}, untukmu selamanya... 🎵`;
            }
            
            if (t.includes('sahabat') || t.includes('teman') || t.includes('persahabatan')) {
                return `🤝 LAGU PERSAHABATAN - "${theme}" 🤝\n\n[Verse 1]\nSaat ku jatuh dan rapuh\nKau tiba bagai pelangi\nMenawarkan bahu tuk bersandar\nMenghapus air mataku\n\n[Chorus]\n${theme}, kau sahabat sejati\n${theme}, terima kasih tuk semua hari\nBersama kita tertawa dan menangis\nTakkan terganti oleh waktu\n\n[Verse 2]\nRahasia kita tersimpan rapi\nCerita suka dan duka bersama\nMeski jarak memisahkan nanti\nPersahabatan ini kan abadi\n\n[Outro]\n${theme}, selamanya sahabatku... 🎵`;
            }
            
            if (t.includes('semangat') || t.includes('bangkit') || t.includes('sukses') || t.includes('mimpi')) {
                return `🔥 LAGU SEMANGAT - "${theme}" 🔥\n\n[Verse 1]\nBangkitlah dari keterpurukan\nJangan pernah berhenti melangkah\nMimpi-mimpimu masih menunggu\nHari esok masih terang\n\n[Chorus]\n${theme}, teruslah berjuang\n${theme}, kejar semua impianmu\nJangan menyerah sebelum menang\nKarena kamu mampu melakukannya\n\n[Verse 2]\nRintangan pasti kan datang\nTapi bukan tuk menghentikan\nJadikan itu batu loncatan\nMenuju puncak kesuksesan\n\n[Outro]\n${theme}, kamu pasti bisa! 💪🎵`;
            }
            
            if (t.includes('patah') || t.includes('kecewa') || t.includes('sedih') || t.includes('hati')) {
                return `💔 LAGU PATAH HATI - "${theme}" 💔\n\n[Verse 1]\nKau pergi tanpa pamit\nMeninggalkan luka yang dalam\nAir mata jatuh tak henti\nMembasahi pipi ini\n\n[Chorus]\n${theme}, kenapa kau tega\n${theme}, hancurkan semua rasa\nKini aku terjaga sendiri\nDari mimpi yang indah\n\n[Verse 2]\nBiarlah waktu yang kan sembuhkan\nLuka di hati yang tersimpan\nSuatu hari nanti pasti kan datang\nCinta yang lebih baik lagi\n\n[Outro]\nSelamat jalan ${theme}... 🎵`;
            }
            
            return `🎵 LAGU "${theme}" 🎵\n\n[Verse 1]\nDi dalam hati yang terdalam\n${theme} menjadi cerita indah\nSetiap hari ku rasakan\nKehangatan yang tak tergantikan\n\n[Chorus]\n${theme}, oh ${theme}\nKau mengisi hariku\n${theme}, hanya ${theme}\nYang ku inginkan selalu\n\n[Verse 2]\nTakkan pernah kulupa\nBetapa ${theme} berarti\nBersama melewati masa\nMengukir kisah abadi\n\n[Outro]\nTerima kasih ${theme}... 🎵`;
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

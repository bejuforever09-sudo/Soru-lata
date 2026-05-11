const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>BEJU Musik</title>
    <style>
        body { font-family: Arial; max-width: 600px; margin: 50px auto; padding: 20px; background: #1a1a2e; color: white; text-align: center; }
        h1 { color: #e94560; }
        input, button { width: 100%; padding: 12px; margin: 10px 0; border-radius: 8px; border: none; }
        button { background: #e94560; color: white; cursor: pointer; font-size: 16px; }
        #result { margin-top: 20px; padding: 15px; background: #16213e; border-radius: 8px; }
    </style>
</head>
<body>
    <h1>🎵 BEJU Musik AI</h1>
    <input type="text" id="prompt" placeholder="Masukkan judul lagu...">
    <button onclick="generate()">Buat Lirik</button>
    <div id="result"></div>
    <script>
        async function generate() {
            const prompt = document.getElementById('prompt').value;
            if(!prompt) return alert('Isi judul lagu dulu!');
            document.getElementById('result').innerHTML = 'Menulis lirik...';
            const res = await fetch('/generate', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ prompt })
            });
            const data = await res.json();
            document.getElementById('result').innerHTML = data.result.replace(/\\n/g, '<br>');
        }
    </script>
</body>
</html>
    `);
});

app.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    const result = `🎵 "${prompt}"\n\n[Verse 1]\nSaat ku sendiri memikirkan ${prompt}\nHati ini terasa tenang\n\n[Chorus]\n${prompt}, oh ${prompt}\nKau selalu di hatiku`;
    res.json({ result });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running'));

import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

// Menggunakan `fileURLToPath` dan `import.meta.url` untuk mendapatkan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
    try {
        const result = await axios.get("https://v2.jokeapi.dev/joke/Programming,Dark,Spooky?type=twopart");
        res.render("index", { 
            setup: result.data.setup,
            delivery: result.data.delivery
        });
    } catch (error) {
        console.log(error.response ? error.response.data : error.message);
        res.status(500).send("Error retrieving joke");
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

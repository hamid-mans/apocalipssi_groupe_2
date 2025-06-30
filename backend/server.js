const express = require('express')
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const axios = require('axios');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send("Ok")
	res.end()
})

app.post('/api/summarize', upload.single('pdf'), async (req, res) => {
	const pdfPath = req.file.path;
	try {
		const dataBuffer = fs.readFileSync(pdfPath);
		const pdfData = await pdfParse(dataBuffer);
		const rawText = pdfData.text.substring(0, 1024); // tronquer si trop long

		const hfResponse = await axios.post(
			'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
			{ inputs: rawText },
			{
				headers: {
					Authorization: `Bearer ${process.env.HF_API_KEY}`,
					'Content-Type': 'application/json'
				},
			}
		);

		const summary = hfResponse.data[0]?.summary_text || 'Résumé non disponible.';

		res.json({ summary });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Échec du traitement du document.' });
	} finally {
		fs.unlinkSync(pdfPath);
	}
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

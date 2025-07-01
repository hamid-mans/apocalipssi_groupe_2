const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const logFile = path.join(__dirname, 'db/logs.json');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname);
		const name = path.basename(file.originalname, ext).replace(/\s/g, '_');
		const timestamp = Date.now();
		cb(null, `${name}_${timestamp}${ext}`);
	}
});

const upload = multer({ storage });

const saveLog = (log) => {
	let logs = [];
	if (fs.existsSync(logFile)) {
		try {
			const data = fs.readFileSync(logFile, 'utf8');
			logs = JSON.parse(data);
		} catch (err) {
			console.error('Erreur lecture log :', err);
			logs = [];
		}
	}
	logs.push(log);
	fs.writeFileSync(logFile, JSON.stringify(logs, null, 2), 'utf8');
};

app.get('/', (req, res) => {
	res.send('OK');
});


app.post('/api/summarize', upload.single('pdf'), async (req, res) => {
	const pdfPath = req.file.path;
	try {
		const dataBuffer = fs.readFileSync(pdfPath);
		const pdfData = await pdfParse(dataBuffer);
		const rawText = pdfData.text.substring(0, 1024);

		const hfResponse = await axios.post(
			'https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6',
			{ inputs: rawText },
			{
				headers: {
					Authorization: `Bearer ${process.env.HF_API_KEY}`,
					'Content-Type': 'application/json',
				},
			}
		);

		const summary = hfResponse.data[0]?.summary_text || 'Résumé non disponible.';
		res.json({ summary });

		saveLog({
			fileName: req.file.filename,
			summary,
			date: new Date().toUTCString(),
		});

	} catch (err) {
		console.error('Erreur résumé :', err);
		res.status(500).json({ error: 'Échec du traitement du document.' });
	}
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

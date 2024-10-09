const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

app.post('/clarifai', async (req, res) => {
  const { imageURL } = req.body;
  const PAT = 'c3d9df482a6b45c686ca3f5dfa1eec3c';
  const USER_ID = 'murshid-01';
  const APP_ID = 'facerecognition';
  const MODEL_ID = 'face-detection';

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": imageURL
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  try {
    const response = await fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, requestOptions);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Clarifai API' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on http://localhost:${port}`);
});

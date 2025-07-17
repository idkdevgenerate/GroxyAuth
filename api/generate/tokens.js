// api/generate/tokens.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { clientId, clientSecret } } = req.body;

  if (!clientId || !clientSecret) {
    res.status(400).json({ error: 'Missing clientId or clientSecret' });
    return;
  }

  try {
    const response = await fetch('https://groxyapis.api.generate.token.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ token: data.access_token });
    } else {
      res.status(response.status).json({ error: data.error || 'Token request failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

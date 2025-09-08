export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Vercel proxy error:', err);
    res.status(500).json({ error: 'Proxy failed to fetch LeetCode data.' });
  }
}



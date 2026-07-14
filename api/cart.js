// In-memory cart store (resets on serverless cold starts, sufficient for demo)
const carts = new Map();

module.exports = async (req, res) => {
  // CORS & Cache Headers
  res.setHeader('Cache-Control', 'no-store');
  
  // Vercel serverless environment provides helper methods on res
  const sendJSON = (status, data) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };

  const session = req.headers['x-session'] || 'guest';

  if (req.method === 'GET') {
    return sendJSON(200, { items: carts.get(session) || [] });
  }

  if (req.method === 'POST') {
    // Parse body if it's not already parsed (Vercel parses automatically, local server might not)
    let data = req.body;
    if (typeof data === 'string') {
      try { data = JSON.parse(data); } catch { data = {}; }
    } else if (!data) {
      // Fallback manual read if body isn't parsed
      data = await new Promise(resolve => {
        let raw = '';
        req.on('data', chunk => raw += chunk);
        req.on('end', () => {
          try { resolve(JSON.parse(raw || '{}')); } catch { resolve({}); }
        });
      });
    }

    const cart = carts.get(session) || [];
    cart.push({
      id: Date.now(),
      name: data.name || 'Second Skin',
      shade: data.shade || 'Clear',
      price: 34
    });
    carts.set(session, cart);
    return sendJSON(201, { items: cart });
  }

  res.statusCode = 404;
  res.end('Not found');
};

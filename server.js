const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
let carts = new Map();
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'application/javascript; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp' };
function reply(res, status, data, type='application/json') {
  res.writeHead(status, {'Content-Type':type, 'Cache-Control':'no-store'});
  res.end(Buffer.isBuffer(data) || typeof data === 'string' ? data : JSON.stringify(data));
}
function body(req) { return new Promise(resolve => { let raw=''; req.on('data', c => raw += c); req.on('end', () => { try { resolve(JSON.parse(raw || '{}')); } catch { resolve({}); } }); }); }
http.createServer(async (req,res) => {
  if (req.url === '/api/cart' && req.method === 'GET') return reply(res, 200, {items:[...(carts.get(req.headers['x-session'] || 'guest') || [])]});
  if (req.url === '/api/cart' && req.method === 'POST') {
    const data = await body(req), session = req.headers['x-session'] || 'guest';
    const cart = carts.get(session) || []; cart.push({id:Date.now(), name:data.name || 'Second Skin', shade:data.shade || 'Clear', price:34}); carts.set(session, cart);
    return reply(res, 201, {items:cart});
  }
  const clean = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const target = path.join(root, clean);
  if (!target.startsWith(root) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) return reply(res,404,'Not found','text/plain');
  reply(res,200,fs.readFileSync(target),mime[path.extname(target)] || 'application/octet-stream');
}).listen(process.env.PORT || 3000, () => console.log('Body Glue running at http://localhost:3000'));

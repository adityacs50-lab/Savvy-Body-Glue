const http = require('http');
const fs = require('fs');
const path = require('path');
const cartHandler = require('./api/cart');

const root = __dirname;
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'application/javascript; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp' };
function reply(res, status, data, type='application/json') {
  res.writeHead(status, {'Content-Type':type, 'Cache-Control':'no-store'});
  res.end(Buffer.isBuffer(data) || typeof data === 'string' ? data : JSON.stringify(data));
}
http.createServer(async (req,res) => {
  if (req.url.split('?')[0] === '/api/cart') {
    return cartHandler(req, res);
  }
  const clean = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const target = path.join(root, clean);
  if (!target.startsWith(root) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) return reply(res,404,'Not found','text/plain');
  reply(res,200,fs.readFileSync(target),mime[path.extname(target)] || 'application/octet-stream');
}).listen(process.env.PORT || 3000, () => console.log('Body Glue running at http://localhost:3000'));

// Zero-dependency dev server: serves index.html and proxies /api/* to the GodStocks backend.
// Usage: BACKEND_URL=http://localhost:3000 PORT=5173 node dev-server.js
const http = require("http"), fs = require("fs"), path = require("path");
const PORT = +process.env.PORT || 5173;
const BACKEND = new URL(process.env.BACKEND_URL || "http://localhost:3000");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon" };

http.createServer((req, res) => {
  if (req.url.startsWith("/api/")) {
    const up = http.request({ host: BACKEND.hostname, port: BACKEND.port || 80, path: req.url, method: req.method,
      headers: { ...req.headers, host: BACKEND.host } }, r => { res.writeHead(r.statusCode, r.headers); r.pipe(res); });
    up.on("error", () => { res.writeHead(502, { "content-type": "application/json" }); res.end('{"error":"Backend unreachable"}'); });
    return req.pipe(up);
  }
  const rel = decodeURIComponent(req.url.split("?")[0]);
  let file = path.join(__dirname, rel === "/" ? "index.html" : rel);
  if (!file.startsWith(__dirname) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(__dirname, "index.html");
  res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`GodStocks frontend on http://localhost:${PORT}  (API -> ${BACKEND.origin})`));

const http = require("http");
const url = require("url");
http.createServer((req, res) => {
if (req.url.startsWith("/add")) {
const q = url.parse(req.url, true).query;
const sum = Number(q.a) + Number(q.b);
res.writeHead(200, { "Content-Type": "text/plain" });
res.end(`Sum is ${sum}`);
}
}).listen(3000);
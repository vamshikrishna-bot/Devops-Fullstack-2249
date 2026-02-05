const http = require("http");
http.createServer((req, res) => {
if (req.method === "GET") {
res.writeHead(200, { "Content-Type": "text/html" });
res.end(`
<form method="POST">
Name: <input name="name"><br>
Email: <input name="email"><br>
<button type="submit">Submit</button>
</form>
`);
}
if (req.method === "POST") {
let body = "";
req.on("data", chunk => body += chunk);
req.on("end", () => {
res.end("Form submitted: " + body);
});
}
}).listen(3000);

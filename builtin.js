const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url, true);

  res.writeHead(200, { "Content-Type": "text/plain" });

  res.write("Full URL: " + req.url + "\n");
  res.write("Path name: " + parsedUrl.pathname + "\n");
  res.write("Query object: " + JSON.stringify(parsedUrl.query) + "\n");

  res.end();
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});

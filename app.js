const http = require("http");
const fs = require("fs");
const path = require("path");
const { fetchRestaurants } = require("./db");
const PORT = process.env.PORT || 2905;
const server = http.createServer(async (req, res) => {
  console.log(req.url);
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.url === "/") {
    const filePath = path.join(__dirname,"index.html");
    fs.readFile(filePath,"utf8", (err, content) => {
      if (err) {
        res.writeHead(500,{ "Content-Type":"text/html" });
        res.end("<h1>500 Internal Server Error</h1>");
      } else {
        res.writeHead(200,{ "Content-Type":"text/html" });
        res.end(content);
      }
    });
  }
  else if (req.url.startsWith("/public/")) {
    const filePath = path.join(__dirname, req.url); 
    const extname = path.extname(filePath).toLowerCase();
    let contentType = "text/plain";
    if (extname === ".html") {
      contentType = "text/html";
    } else if (extname === ".css") {
      contentType = "text/css";
    } else if (extname === ".js") {
      contentType = "application/javascript";
    } else if (extname === ".jpeg" || extname === ".jpg") {
      contentType = "image/jpeg";
    } else if (extname === ".png") {
      contentType = "image/png";
    } else if (extname === ".gif") {
      contentType = "image/gif";
    }
    fs.readFile(filePath,(err,content) => {
      if (err) {
        res.writeHead(404, { "Content-Type": contentType });
        res.end("<h1>404 Not Found</h1>");
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
      }
    });
  } else if (req.url === "/api") {
    try {
      const restaurants = await fetchRestaurants();
      res.writeHead(200,{ "Content-Type": "application/json" });
      res.end(JSON.stringify(restaurants));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Failed to fetch restaurants" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Not Found</h1>");
  }
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

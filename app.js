const http = require("http");
const path = require("path");
const fs = require("fs");
const { fetchRestaurants } = require("./db"); // Import MongoDB function

const PORT = process.env.PORT || 2905;

const server = http.createServer(async (req, res) => {
  console.log(req.url);

  if (req.url === "/api/resturants/") {
    try {
      const restaurants = await fetchRestaurants();
      res.writeHead(200, { "Content-Type": "application/json" });
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

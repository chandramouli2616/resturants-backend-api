const http = require("http");
const { fetchRestaurants } = require("./db"); // Import MongoDB function

const PORT = process.env.PORT || 2905;

const server = http.createServer(async (req, res) => {
  console.log(req.url);

  // Set CORS headers for all responses
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from your frontend
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers

  if (req.method === "OPTIONS") {
    // Handle preflight request
    res.writeHead(204); // No content for preflight
    res.end();
    return;
  }

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

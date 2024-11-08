// Import necessary modules
const app = require("./app");  // The main Express app
const debug = require("debug")("node-angular");  // Debugging utility
const http = require("http");  // HTTP module to create a server

// Function to normalize the port into a number, string, or false
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // Named pipe
    return val;
  }

  if (port >= 0) {
    // Port number
    return port;
  }

  return false;
};

// Event listener for HTTP server "error" event
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "pipe " + port : "port " + port;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Event listener for HTTP server "listening" event
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug(`Listening on ${bind}`);
  console.log(`Server is running on ${bind}`);
};

// Normalize port and store in Express app
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Create HTTP server
const server = http.createServer(app);

// Attach error and listening event handlers
server.on("error", onError);
server.on("listening", onListening);

// Start listening on the specified port
server.listen(port);

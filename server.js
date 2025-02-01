import http from 'http'

let server = http.createServer();

const port = process.env.PORT || 3000;


server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
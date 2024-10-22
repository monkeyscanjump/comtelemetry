const { parse } = require('url');
const next = require('next');
const dotenv = require('dotenv');

// Load environment variables from the root .env file
dotenv.config({ path: '../.env' });

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.FRONTEND_PORT || 3000;

app.prepare().then(() => {
  require('http').createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
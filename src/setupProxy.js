const { createProxyMiddleware } = require("http-proxy-middleware");

const ROOT_URL = 'http://localhost:5000';

module.exports = function (app) {
    app.use('/auth/google', createProxyMiddleware({ target: ROOT_URL }));
    app.use('/auth/facebook', createProxyMiddleware({ target: ROOT_URL }));
    app.use('/api/*', createProxyMiddleware({ target: ROOT_URL }));
};

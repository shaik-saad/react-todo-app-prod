const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/api',
        createProxyMiddleware({
            target: process.env.REACT_APP_BACKEND_API || 'http://localhost:4000',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        })
    );
}

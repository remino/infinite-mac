// Changes to this file should generally be reflected in the Cloudflare Worker
// (workers-site/index.js)
module.exports = function (app) {
    app.use(function (req, res, next) {
        // Force correct file types for files that we mess with the extension
        // of, since otherwise file-loader appears to get confused.
        if (req.path.endsWith(".jsz")) {
            res.setHeader("Content-Type", "text/javascript");
        } else if (req.path.endsWith(".wasmz")) {
            res.setHeader("Content-Type", "application/wasm");
        }

        // Handle pre-gzipped files
        if (req.path.endsWith(".br")) {
            res.setHeader("Content-Encoding", "br");
        }

        // Allow SharedArrayBuffer to work locally
        res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
        res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");

        next();
    });
};

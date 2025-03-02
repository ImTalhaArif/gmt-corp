const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files (CSS, JS, images)
app.use(express.static("public"));

// Handle PHP Requests
app.all("/*.php", (req, res) => {
    const phpScriptPath = path.join(__dirname, req.path);

    const phpProcess = spawn("php", [phpScriptPath]);

    let output = "";

    phpProcess.stdout.on("data", (data) => {
        output += data.toString();
    });

    phpProcess.stderr.on("data", (data) => {
        console.error(`PHP Error: ${data}`);
    });

    phpProcess.on("close", (code) => {
        if (code !== 0) {
            return res.status(500).send("PHP script execution failed.");
        }
        res.send(output);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

import { exec } from "child_process";
import { readFileSync } from "fs";
import { join } from "path";

export default function handler(req, res) {
    const filePath = join(process.cwd(), "public", "index.php"); // Adjust as needed
    const phpCode = readFileSync(filePath, "utf8");

    exec(`php -r '${phpCode}'`, (error, stdout, stderr) => {
        if (error) {
            res.status(500).json({ error: stderr });
            return;
        }
        res.status(200).send(stdout);
    });
}

const express = require('express')
const multer = require('multer')
const fs = require("fs")
const path = require("path")

const app = express()
const PORT = 3000;

const cors = require("cors");
app.use(cors());

const dataDir = path.join(__dirname, "data")
const pdfDir = path.join(dataDir, "PDF");
const jsonFile = path.join(dataDir, "files.json");

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir);
if (!fs.existsSync(jsonFile)) fs.writeFileSync(jsonFile, JSON.stringify([]));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pdfDir);
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}_${file.originalname}`;
        cb(null, filename);
    }
});

const upload = multer({ storage})

app.post("/upload",upload.single("file"), (req,res) => {
    const {department , semester, subject} = req.body
    const filename = req.file.filename
    if (!department || !semester || !subject || !filename) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    // Read the existing JSON file
    let fileData = [];
    if (fs.existsSync(jsonFile)) {
        fileData = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
    }

    fileData.push({ department, semester, subject, filename });

    fs.writeFileSync(jsonFile, JSON.stringify(fileData, null, 2));

    res.json({ message: "File uploaded successfully", filename });

})

app.use("/files", express.static(pdfDir));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
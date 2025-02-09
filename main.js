const express = require('express')
const multer = require('multer')
const fs = require("fs")
const path = require("path")

const app = express()
const PORT = 3000;

const cors = require("cors");
const { error } = require('console')
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
app.use("/pdfs", express.static("data/PDF"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html"))
})
app.get("/searc", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "adminauth.html"))
})

app.use(express.static("public"));

app.get("/search", (req,res) => {
    const {department, subject}= req.query
    
    if(!department || !subject){
        return res.status(400).json({error : "Missing something"})
    }~

    fs.readFile("data/files.json", "utf-8", (err,data) => {
        if(err){
            return res.status(500).json({error:"Error reading json files"})
        }

        const files = JSON.parse(data)
        const mathFIles = files.filter(file => file.department === department && file.subject.toLowerCase().includes(subject.toLowerCase()))
        res.json(mathFIles)
    })
})


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
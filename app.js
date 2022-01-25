const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload an image"));
        }

        cb(undefined, true);
    },
});

app.get("/test", (req, res) => {
    res.send("Sent");
});

app.post(
    "/test",
    upload.single("image"),
    async (req, res) => {
        const buffer = await sharp(req.file.buffer).toBuffer();
        fs.writeFileSync("./images/table.png", buffer);
        res.send();
    },
    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    }
);

app.listen(PORT, () => {
    console.log(`Server is up on port: ${PORT}`);
});

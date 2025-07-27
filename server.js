const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const multer  = require('multer')
const {mergepdfs}  = require('./merge');
const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))

// Serve static files from the templates folder
app.use(express.static(path.join(__dirname, 'templates')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname , "templates/index.html"))
})
app.post('/merge', upload.array('pdfs', 3), async function (req, res, next) {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).send('Please upload at least two PDF files.');
    }
    console.log(req.files);
    // Merge all uploaded files
    const filename = await mergepdfs(...req.files.map(f => path.join(__dirname, f.path)));
    res.redirect(`http://localhost:3000/static/${filename}`);
  } catch (err) {
    console.error('Error merging PDFs:', err);
    res.status(500).send('Failed to merge PDFs');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
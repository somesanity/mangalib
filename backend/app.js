const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const getTitles = require('./Routes/getTitles.js');
const getTitleById = require('./Routes/getTitleById.js');
const getTitleChapters = require('./Routes/getTitleChapters.js');
const getCover = require('./Routes/getCover.js');
const getPagesforChapter = require('./Routes/getPagesforChapter.js');
const ValidationCoverMiddleware = require('./middleware/uploadMiddleware.js');
const uploadCoverImage = require('./Routes/uploadCoverImage.js');

app.use(cors())
app.use(express.urlencoded({ extended: true })); // Разбирает FormData
app.use('/uploads', [
	express.static('./Resources/TitleCover'),
	express.static('./Resources/TitlePages')
  ]);  
app.get('/', getTitles);
app.get('/title/:id', getTitleById);
app.get('/title/:id/chapters', getTitleChapters);
app.get('/title/:id/cover', getCover);
app.post('/title', uploadCoverImage);
app.get('/title/:id/chapter/:chapterid', getPagesforChapter);


app.listen(2000, (error) => {
	const PORT = 2000
	if (error) {
		return console.log(error);	
	}

	return console.log(`Server OK: http://localhost:${PORT}`)

})
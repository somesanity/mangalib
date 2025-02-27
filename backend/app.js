const express = require('express');
const cors = require('cors');
const json = require('body-parser/lib/types/json.js');
const app = express();

const getTitles = require('./Routes/getTitles.js');
const getTitleById = require('./Routes/getTitleById.js');
const getTitleChapters = require('./Routes/getTitleChapters.js');
const getCover = require('./Routes/getCover.js');
const getPagesforChapter = require('./Routes/getPagesforChapter.js');
const ValidationCoverMiddleware = require('./middleware/uploadMiddleware.js');
const uploadCoverImage = require('./Routes/uploadCoverImage.js');
const postNewChapter = require('./Routes/postNewChapter.js');
const uploadPages = require('./middleware/uploadPagesMiddleware');
const postNewPages = require('./Routes/postNewPages');

app.use(cors())
app.use(express.urlencoded({ extended: true })); // Разбирает FormData
app.use(json())
app.use('/uploads', [
	express.static('./Resources/TitleCover'),
	express.static('./Resources/TitlePages')
  ]);  
app.get('/', getTitles);
app.get('/title/:id', getTitleById);
app.get('/title/:id/chapters', getTitleChapters);
app.get('/title/:id/cover', getCover);
app.post('/title', uploadCoverImage);
app.post('/title/:id/chapter', postNewChapter);
app.get('/title/:id/chapter/:chapterid', getPagesforChapter);
app.post('/title/:id/chapter/:chapterid/pages', uploadPages.array('pages', 100), postNewPages);


app.listen(2000, (error) => {
	const PORT = 2000
	if (error) {
		return console.log(error);	
	}

	return console.log(`Server OK: http://localhost:${PORT}`)

})
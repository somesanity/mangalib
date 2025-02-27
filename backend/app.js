const express = require('express');
const cors = require('cors');
const path = require('path');
const json = require('body-parser/lib/types/json.js');
const app = express();
require('dotenv').config();

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

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Разбирает FormData
app.use(json());

// Статические файлы из Resources
app.use('/uploads', [
  express.static('./Resources/TitleCover'),
  express.static('./Resources/TitlePages'),
]);

// API маршруты (ставить кста надо ПОСЛЕ статики А ЕЩЁ НЕЛЬЗЯ ИСПОЛЬЗОВАТЬ ОДНИ И ТЕ ЖЕ МАРШРУТЫ В REACT ROUTER DOM И EXPRESS! ПРИ ОБНОВЛЕНИИ СТРАНИЦЫ БУДЕТ КИДАТЬ НА BACKEND!!!)
app.get('/api/title', getTitles);
app.get('/api/title/:id', getTitleById);
app.get('/api/title/:id/chapters', getTitleChapters);
app.get('/api/title/:id/cover', getCover);
app.post('/api/title', uploadCoverImage);
app.post('/api/title/:id/chapter', postNewChapter);
app.get('/api/title/:id/chapter/:chapterid', getPagesforChapter);
app.post('/api/title/:id/chapter/:chapterid/pages', uploadPages.array('pages', 100), postNewPages);

app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
});

app.listen(process.env.PORT, (error) => {
	if (error) {
		return console.log(error);	
	}

	return console.log(`Server OK: http://${process.env.HOSTAPI}:${process.env.PORT}`)

})
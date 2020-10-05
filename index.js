var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('./middleware/logger');
var siswa = require('./data');

// handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// init middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// get siswa route
app.use('/siswa', require('./routes/api/siswa'));

// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: "asu",
    siswa
}));


// path
app.use(express.static(path.join(__dirname, 'public')));

// server
var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di ${PORT}`))
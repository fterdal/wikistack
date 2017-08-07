const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const router = require('./routes');
const models = require('./models');

const app = express();
app.use(morgan("short"));

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment
// instance, which we'll want to use to add Markdown support later.
const env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.use(express.static('./public'));

app.use('/', router);

models.db.sync({force: true})
.then(() => {
  app.listen(3000);
})
.catch(console.error.bind(console));

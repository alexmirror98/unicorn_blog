import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Путь к текущему файлу
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

let articles = [];

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.render("index", { articles: articles });
});

app.get("/new", (req, res) => {
    res.render("new");
});

app.post('/new', (req, res) => {
    const newArticle = {
        id: articles.length + 1,
        title: req.body.title,
        content: req.body.content
    };

    articles.push(newArticle);
    res.redirect('/');
});

// Страница для редактирования статьи
app.get('/edit/:id', (req, res) => {
    const article = articles.find(article => article.id === parseInt(req.params.id));
    if (article) {
        res.render('edit', { article: article });
    } else {
        res.redirect('/');
    }
});

// Обработка редактирования статьи
app.post('/edit/:id', (req, res) => {
    const article = articles.find(article => article.id === parseInt(req.params.id));
    if (article) {
        article.title = req.body.title;
        article.content = req.body.content;
    }
    res.redirect('/');
});

// Удаление статьи
app.post('/delete/:id', (req, res) => {
    articles = articles.filter(article => article.id !== parseInt(req.params.id));
    res.redirect('/');
});

const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuid(),
        username: 'bablu_pandit',
        comment: 'hmare mann mein tumhare lie ijjat aur badh gai hai'
    },
    {
        id: uuid(),
        username: 'kaleen_bhaiya',
        comment: 'risk hai'
    },
    {
        id: uuid(),
        username: 'munna_tripathi',
        comment: 'thoda rest krlijie varna rest in peace ho jaenge'
    },
    {
        id: uuid(),
        username: 'guddu_pandit',
        comment: 'bss yahin tk tha jo tha'
    }
]; 

app.get('/comments', (req, res) => {
    res.render('comments/index', {comments});
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuid() });
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', {comment});
});

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', {comment});
});

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('comments');
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('comments');
});

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response.");
});

app.post('/tacos', (req, res) => {
    const {meat, qty} = req.body;
    res.send(`ok, Here are your ${qty} ${meat}`);
});

app.listen(3000, () => {
    console.log("Listening to the port 3000");
});

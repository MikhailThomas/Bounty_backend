const express = require ('express');
const mysql = require ('mysql');

// Create connection
const db = mysql.createConnection({
    host: 'bmfgr0nzan6pfbemwslz-mysql.services.clever-cloud.com',
    user: 'uuddlwjaoebmrkd7',
    password: 't589kebclJCDsr6XUOGW',
    database: 'bmfgr0nzan6pfbemwslz',
})

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('mysql connected')
})

const app = express();

// insert post
app.get('/addpost', (req, res) => {
    letpost = {title:'bing bong'};
    let sql = 'insert into monsters set ?'
    let query = db.query(sql, post,(err, result)=> {
        if(err) throw err;
        console.log(result)
        res.send('Table Updated')
    });
});

// fetch posts
app.get('/getpost', (req, res)=> {
    let sql = 'select * from Monsters';
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(results);
        res.send('posts fetched...')
    })
})
// fetch single post 
app.get('/getpost/:id', (req, res)=> {
    let sql = 'select * from Monsters where id = $(req.params.id)';
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('post fetched...')
    })
})

// update table
app.get('/updatepost/:id', (req, res)=> {
    let newTitle = 'updated title'
    let sql = `update Monsters set title = '${newTitle}' where id = $(req.params.id)`;
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('post updated...')
    })
})

// delete post

app.get('/deletepost/:id', (req, res)=> {
    let sql = 'delete from Monsters where where id = $(req.params.id)';
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('post deleted...')
    })
})


app.listen('3000',() =>{
    console.log('Server running on port 3000');
});
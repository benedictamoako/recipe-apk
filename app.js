var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    app = express();

const {Client} = require('pg');

//DB Connection String
const connectionString = "postgresql://codechef:1234ABC@localhost:5432/recipebookdb"

//assign the dust templating engine to .duct files
app.engine('dust', cons.dust);

//set the default extensions to .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

//setting the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, result){
    
    const client = new Client({
        connectionString,

      })
    client.connect()
    console.log("Conection successful");
    client.query('SELECT * FROM recipes', (err, res) => {
        console.log(err, res);
        result.render('index', {recipes: res.rows});
        client.end();
    })
    
    
    
})

app.post('/add', function(req, result){

    const client = new Client({
        connectionString,

      })
    client.connect()
    client.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)', 
        [req.body.name, req.body.ingredients, req.body.directions], (err, res) => {
        console.log(err, res);
        client.end();
        result.redirect('/');   
    })
})

app.post('/delete/:id', function(req, response){
    
    const client = new Client({
        connectionString,

      })
    client.connect()
    client.query('DELETE FROM recipes WHERE id = $1', [req.params.id], (err, res) => {
        console.log(err, res);
        client.end();
        console.log("Delete Request called on element with id of " + req.params.id ); 
        response.redirect('/');
    })
})

app.post('/edit', function(req, response){
    const client = new Client({
        connectionString,

      })
    client.connect()
    client.query('UPDATE recipes SET name = $1, ingredients = $2, directions = $3 WHERE id = $4', 
        [req.body.name, req.body.ingredients, req.body.directions, req.body.id], (err, res) => {
        console.log(err, res);
        client.end(); 
        response.redirect('/');
    })
})

//server connection
app.listen(3000, function(){
    console.log('Server stated on port 3000...');   
});
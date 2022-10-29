
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// render handlebars
const handlebars = require('express-handlebars');
// favicon
const favicon = require('serve-favicon');

//db
const con = require('./models/Database.js');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



// render handlebars
// para renderizar no handlebars
app.engine('handlebars', handlebars({defautLayout:'main'}))
app.set('view engine', 'handlebars')


/// parametro para rotas index
app.get('/', function (req, res) {
  res.render('index')
});


/// parametro para rotas formulario
app.get('/form', function (req, res) {
  res.render('form')
});

/// parametro para rotas tabela post*
//api get no banco de dados 

//listas tabelas 
app.get('/tabela', (req, res) => {
  con.query("SELECT * FROM form", function (err, result) {
        if (err) throw err;
        res.render('tabela',{result:result});
      });    
})

//lista a tabelas por id
app.get('/tabela/:id', (req, res) => {
  let id = req.params.id
  let sqlID = 'SELECT * FROM form WHERE id = ?'
  con.query(sqlID,[id], function (err, result) {
        if (err) throw err;
        res.render('tabela-id',{result:result});
      });    
})



//lista tabelas  por id para deletar
app.get('/del/:id', function (req, res) {
  let id = req.params.id
  let deleteSQL = "DELETE FROM form WHERE id = ?"
  con.query(deleteSQL,[id], function (err, result) {
      //console.log(result)
      res.render('delealert');
    })
     
})



// post
app.post('/post', function (req, res) {
  // variavel
  let nome = req.body.nome
  let sobrenome = req.body.sobrenome
  let txtPost = req.body.txtPost
  let sqlPost = "INSERT INTO form (nome, sobrenome, txtPost) VALUES (?, ?, ?) ";
 
  con.query(sqlPost ,[nome, sobrenome, txtPost ], function (err, result) {
    //  msg do back
    console.log( result, "dados cadatrado!");
  });
  // adiciona msg de confirmacao de cadastro 
  // redireciona 
   res.redirect('/tabela');
}); 


//api get no banco de dados 
app.get('/api', (req, res) => {
    con.query("SELECT * FROM form", function (err, result) {
    if (err) throw err;
    const data = result
    res.send(result);
  });
})


//pesquisa ou  busca individual 
app.get('/api/:id', (req, res) => {
    id = req.params.id
    pesqSQL = 'SELECT * FROM form WHERE id = ?'
    con.query(pesqSQL ,[id], function (err, result) {
    //  msg do back
     res.render('tabela-id',{result:result});
  });
})



app.listen(port, () => {
  console.log('Server rodando na porta '+ port);
});
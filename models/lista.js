//IMPORT MODULOS
const mysql = require("mysql");

//CONECTA AO DB
const con = mysql.createConnection({
  host: "remotemysql.com",
  user: "RbPVP2xRMG",
  password: "ZjTwkvi5zD",
  database:"RbPVP2xRMG"
});

// RETORNO DO POSSVIVEL ERRO
con.connect(function(err) {
  if (err){
console.log(err)
return
}
  console.log("Conectado ao banco de dados!");
});


///

//lista tabelas  por id para Editar
app.get('/put/:id', function (req, res) {
  res.render('form');
  let id = req.params.id
  let updateSQL = "UPDATE Customers SET nome=?, sobrenome=?, txtPost=?  WHERE id = ?"
    
  con.query(updateSQL,[id], function (err, result) {
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome
        let txtPost = req.body.txtPost
        //console.log(result)
        
        
    })
     
})
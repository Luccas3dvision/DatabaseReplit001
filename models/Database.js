//importa modulo
const mysql = require('mysql');

//https://www.freesqldatabase.com/ site para  ter sua databe free??


// mantem Conectado ao db
const con = mysql.createConnection({
  host: "sql10.freesqldatabase.com",
  user: "sql10463582",
  password: "5vBalFaWJa",
  database:"sql10463582"
}); con.connect(function(error){
    if(!!error) console.log(error);
     else console.log('Conectado ao banco de dados');
}); 

module.exports = con;
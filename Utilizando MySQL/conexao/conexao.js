const sequelize = require("sequelize");

const conexao = new sequelize("testeapi","root","junior123",{
   host: "localhost",
   dialect: "mysql",
});

conexao.authenticate().then(()=>{
    try{
        console.log("Conectado com sucesso ao banco de dados")
    }catch(erro){
        console.log("Erro:" + erro);
    }
})

module.exports = conexao
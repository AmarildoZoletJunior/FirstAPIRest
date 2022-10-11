const sequelize = require("sequelize");
const Sequelize = require("../conexao/conexao");

const tabela = Sequelize.define("APIRest",{
    nome:{
        type: sequelize.STRING,
    },
    ano:{
        type: sequelize.STRING,
    }
})

// tabela.sync({force:true})

module.exports = tabela;
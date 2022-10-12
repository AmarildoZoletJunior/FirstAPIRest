const sequelize = require("sequelize");
const Sequelize = require("../conexao/conexao");

const games = Sequelize.define("games",{
    nome:{
        type: sequelize.STRING,
    },
    ano:{
        type: sequelize.STRING,
    }
})

// games.sync({force:true})

module.exports = games;
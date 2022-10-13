const sequelize = require("sequelize");
const Sequelize = require("../conexao/conexao");

const usuarios = Sequelize.define("usuarios",{
    email:{
        type: sequelize.STRING,
    },
    senha:{
        type: sequelize.STRING,
    }
});

// usuarios.sync({force:true});

module.exports = usuarios;
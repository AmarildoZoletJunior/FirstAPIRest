const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const ip = "192.168.0.100";
const PORT = process.env.PORT || 3000;


const conexao = require("./conexao/conexao");
const tabela = require("./Modal/Tabela");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Listar todos
app.get("/games", (req, res) => {
    tabela.findAll().then((resposta) => {
        res.json(resposta);
    })
})

//Listar específico
app.get("/game/:id", (req, res) => {
    let id = req.params.id;
    let convertido = parseInt(id);
    if (!isNaN(convertido)) {
        tabela.findOne({ where: { id: convertido } }).then((resposta) => {
            if (resposta != undefined) {
                res.statusCode = 200;
                console.log("Encontrei");
                res.json(resposta)
            } else {
                console.log("Erro");
                res.statusCode = 400;
                res.sendStatus(400);
            }
        })
    } else {
        console.log("Erro");
        res.statusCode = 400;
        res.sendStatus(400)
    }
})


//Criar um game
app.post("/game", (req, res) => {
    let { nome, ano } = req.body;
    if (nome !== undefined && nome !== null && nome.length > 1) {
        if (ano !== undefined && ano !== null && ano.length > 1) {
            tabela.create({
                nome: nome,
                ano: ano,
            });
            console.log("Ok");
            res.statusCode = 200;
            res.sendStatus(200);
        } else {
            console.log("Erro");
            res.statusCode = 400;
            res.sendStatus(400);
        }
    } else {
        console.log("Erro");
        res.statusCode = 400;
        res.sendStatus(400);
    }
})

//Deletar
app.delete("/game/:id", (req, res) => {
    let id = req.params.id;
    let convertido = parseInt(id);
    if (!isNaN(convertido)) {
        tabela.destroy({ where: { id: convertido } }).then((resposta) => {
            if (resposta != 0) {
                res.statusCode = 200;
                console.log("Deletado");
                res.json("Deletei este cara aqui\n" + resposta);
            } else {
                console.log("Erro");
                res.statusCode = 400;
                res.sendStatus(400);
            }
        });
    } else {
        console.log("Erro");
        res.statusCode = 400;
        res.sendStatus(400)
    }
})

app.put("/game/:id", (req, res) => {
    let id = req.params.id;
    let convertido = parseInt(id);
    let { nome, ano } = req.body
    if (!isNaN(convertido)) {
        if (nome !== undefined && nome !== null && nome.length > 1) {
            if (ano !== undefined && ano !== null && ano.length > 1 && !isNaN(ano)) {
                tabela.findOne({ where: { id: convertido } }).then((resposta) => {
                    if (resposta != null) {
                        tabela.update({
                            nome: nome,
                            ano: ano,
                        }, { where: { id: convertido }}).then(()=>{
                            res.statusCode = 200;
                            res.sendStatus(200);
                        })
                    }else{
                        console.log("Erro");
        res.statusCode = 400;
        res.sendStatus(400)
                    };
                });
            }else{
                console.log("Erro");
        res.statusCode = 400;
        res.sendStatus(400)
            };
        }else{
            console.log("Erro");
        res.statusCode = 400;
        res.sendStatus(400)
        };
    }else{
        console.log("Erro");
        res.statusCode = 400;
        res.sendStatus(400)
    };
})


app.listen(PORT, ip, () => {
    console.log("Servidor funcionando no ip: 192.168.0.100:3000");
})



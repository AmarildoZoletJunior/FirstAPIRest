const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");
const app = express();
const ip = "192.168.0.100";
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


let DB = {
    games: [
        {
            id: 20,
            nome: "Call of duty",
            ano: 1999,
        },
        {
            id: 5,
            nome: "Sea of thieves",
            ano: 2015,
        },
        {
            id: 10,
            nome: "Counter Striker Global Offensive",
            ano: 2012,
        }

    ]
}

app.get("/games",(req,res)=>{
    res.statusCode = 200;
    res.json(DB.games);
})
app.get("/game/:id",(req,res)=>{
    let id = req.params.id;
    if(isNaN(id)){
        res.sendStatus(400);
        res.statusCode = 400
    }else{
        let idConvertido = parseInt(id);
        let game = DB.games.find(gameid => gameid.id == idConvertido);
        if(game !== undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.statusCode = 404;
            res.sendStatus(404);
        }
    }
})
app.delete("/game/:id",(req,res)=>{
    let id = req.params.id;
    if(isNaN(id)){
        res.statusCode = 400;
        res.sendStatus(400);
    }else{
        let idConvertido = parseInt(id);
        let game = DB.games.findIndex(gameid => gameid.id == idConvertido);
        if(game !== -1){
            DB.games.splice(game,1);
            res.statusCode = 200;
        }else{
            res.statusCode = 404;
            res.sendStatus(404);
        }
    }
})

app.post("/game",(req,res)=>{
    let {nome,ano} = req.body;
    if(nome !== undefined && nome !== null && nome.length > 1){
        if(ano == undefined && ano == null && ano.length < 1 && isNaN(ano)){
            res.sendStatus(400);
            res.statusCode = 400;
        }else{
            let anoConvertido = parseInt(ano);
            DB.games.push({
                id:DB.games.length + 1,
                nome:nome,
                ano:anoConvertido,
            });
            res.sendStatus(200);
        }
    }else{
        res.sendStatus(400);
        res.statusCode = 400;
    }
})
app.put("/game/:id",(req,res)=>{
    let id = req.params.id;
    let {nome,ano} = req.body
    let anoConvertido = parseInt(ano);
    if(isNaN(id)){
        res.sendStatus(400);
        res.statusCode = 400
    }else{
        let idConvertido = parseInt(id);
        let game = DB.games.find(gameid => gameid.id == idConvertido);
        if(game.nome !== undefined && game.nome !== null){
            if(game.ano == undefined && game.ano == null){
                res.sendStatus(400);
                res.statusCode = 400;
            }else{
                if(nome !== undefined && nome !== null && nome.length > 1){
                    if(ano !== undefined && ano !== null && ano.length > 1 && isNaN(anoConvertido)){
                        game.nome = nome;
                        game.ano = anoConvertido;
                        res.sendStatus(200);
                    }else{
                        console.log("aqui")
                        res.sendStatus(400);
                res.statusCode = 400;
                    }
                }else{
                    res.sendStatus(400);
                res.statusCode = 400;
                }
            }
        }else{
            res.sendStatus(400);
            res.statusCode = 400;
        }
    }

})
app.listen(PORT,ip,()=>{
    console.log(`Servidor iniciado no ip: ${ip}`)
})
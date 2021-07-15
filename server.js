const https = require("http");
const fs = require("fs");
const url = require("url");
const datosPokemones = require("./pokemones");

https
  .createServer(async (req, res) => {
    if (req.url == "/") {
      fs.readFile("public/index.html", "utf8", (err, html) => {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.end(JSON.stringify(err));
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      });
    } else if (req.url == "/estilos") {
      fs.readFile("public/style.css", (err, css) => {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.end(JSON.stringify(err));
        }
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(css);
      });
    } else if (req.url == "/javascript") {
      fs.readFile("public/script.js", (err, js) => {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.end(JSON.stringify(err));
        }
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(js);
      });
    } else if (req.url.startsWith("/pokemones")) {
      try {
        const pokemones = await datosPokemones();
        const pokemonesParseados = pokemones.map((pokemon) => {
          return {
            nombre: pokemon.name,
            img: pokemon.sprites["front_default"],
          };
        });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(pokemonesParseados));
      } catch (error) {
        console.log(error);
      }
    } else {
      fs.readFile("public/404.html", "utf8", (err, errorPage) => {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.end(JSON.stringify(err));
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(errorPage);
      });
    }
  })
  .listen(process.env.PORT || 3000);

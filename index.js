const express = require("express");

const app = express();
app.use(express.json());

const projetosarray = [];

function verifyIfExists(req, res, next) {
  const { id } = req.params;
  const position = projetosarray.findIndex((projeto) => projeto.id === id);
  if (position === -1) {
    return res.status(400).json("error projeto nao existe");
  }

  next();
}

function contagem(req, res, next) {
  console.count("request");
  console.time("timeout");

  next();

  console.timeEnd("timeout");
}

app.use(contagem);

app.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  projetosarray.push({ id, title, tasks: [] });

  return res.json();
});

app.get("/projects", (req, res) => {
  return res.json(projetosarray);
});

app.put("/projects/:id", verifyIfExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const position = projetosarray.findIndex((projeto) => projeto.id === id);
  projetosarray[position].title = title;

  return res.json({ projetosarray, position });
});

app.delete("/projects/:id", verifyIfExists, (req, res) => {
  const { id } = req.params;
  const position = projetosarray.findIndex((projeto) => projeto.id === id);
  projetosarray.splice(position, 1);
  return res.json();
});

app.post("/projects/:id/tasks", verifyIfExists, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const position = projetosarray.findIndex((projeto) => projeto.id === id);
  projetosarray[position].tasks.push(task);
  return res.json(projetosarray[position]);
});

app.listen(3333);

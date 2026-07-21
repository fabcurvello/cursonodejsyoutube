const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express(); // constante que contém uma instância da dependência express
app.use(express.json()); // usar json em todas as rotas

const projects = ["a"];

// criando a rota raiz -> GET http://localhost:3000/
// request traz info sobre o cliente que requisitou esta rota. Response é a resposta dada ao cliente.
// app.get("/", function (request, response) {
//   // return response.send('Olá Dev! Bem vindo ao curso!');
//   return response.json({
//     message: "Olá Dev! Bem vindo ao curso!",
//   });
// });

app.get("/projects", function (request, response) {
  return response.json(projects);
});

app.get("/projects", function (request, response) {
  return response.json(["Projeto 1", "Projeto 2"]);
});

app.post("/projects", function (request, response) {
  const { name, owner } = request.body;
  const project = {
    id: uuidv4(),
    name,
    owner,
  };
  projects.push(project);

  return response.status(201).json(project);
});

app.put("/projects/:id", function (request, response) {
  const { id } = request.params;
  const { name, owner } = request.body;

    const projectIndex = projects.findIndex(p => p.id === id);
    if (projectIndex < 0) {
        return response.status(404).json({ error: 'Project not found' });
    }

    if (!name || !owner) {
        return response.status(400).json({ error: 'Name and owner are required' });
    }

    const project = {
        id,
        name, 
        owner
    }

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete("/projects/:id", function (request, response) {
  return response.json(["Projeto 2", "Projeto 3"]);
});

//app.listen(3000); // porta que será utilizada pelo servidor.

// exibe mensagem no terminal enquanto o server está em execução
app.listen(3000, () => {
  console.log("Server started on port 3000! ;-)");
});

const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express(); // constante que contém uma instância da dependência express
app.use(express.json()); // usar json em todas as rotas

const projects = [ ];

// Middleware - Recurso a ser executado entre a chegada e a saída da requisição
function logRoutes(request, response, next) {
  const { method, url } = request; // pegar method (método http) e url da request
  const route = `[${method.toUpperCase()}] ${url}`;
  console.log(route);
  return next(); // próxima etapa, que é o que a requisição realmente quer fazer (get, post..)
}
// executar Middleware antes das próximas ações
app.use(logRoutes); // execução para TODAS as ações 


// Middleare: Se a necessidade for que o middleware roda em uma ação específica, 
// chamr ele (ex: logRoutes) como abaixo, entre a rota e a function
// app.get("/projects", logRoutes ,function (request, response) {
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

  const projectIndex = projects.findIndex((p) => p.id === id);

  if (projectIndex < 0) {
    return response.status(404).json({ error: "Project not found" });
  }

  if (!name || !owner) {
    return response.status(400).json({ error: "Name and owner are required" });
  }

  const project = {
    id,
    name,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete("/projects/:id", function (request, response) {
  const { id } = request.params;
  const projectIndex = projects.findIndex((p) => p.id === id);
  
  if (projectIndex < 0) {
    return response.status(404).json({ error: "Project not found" });
  }

  // splice para apagar do array. Posição inicial do array, quantos itens a apagar a partir da posição inicial.
  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

//app.listen(3000); // porta que será utilizada pelo servidor.

// exibe mensagem no terminal enquanto o server está em execução
app.listen(3000, () => {
  console.log("Server started on port 3000! ;-)");
});

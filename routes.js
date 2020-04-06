const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>Tema 1 - crearea unui server</title></head>");
    res.write(
      "<body><h1>Serverul a fost creat</h1><br/><h3>Creat pe portul 3001</h3></body>"
    );
    res.write("</html>");
    res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-type", "text/html");
    res.write("<html>");
    res.write("<head><title>Tema 1 - users</title></head>");
    res.write(
      "<body><h2>Lista userilor</h2><ul><li>Calin Murea</li><li>Murea Maria</ul></ul><br/><form action='/create-user' method='POST'><input type='text' name='username'><button type='submit'><strong>Create user</strong></body>"
    );
    res.write("</html>");
    res.end();
  }

  if (url === "/create-user") {
    const body = [];
    req.on("data", chunk => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody.split("=")[1]);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/users");
    res.end();
  }
};

module.exports = requestHandler;

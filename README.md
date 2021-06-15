# TaskToDo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Installing additional package 
npm install font-awesome@4.7.0
npm install --save-dev json-server@0.12.1
npm install --save-dev jsonwebtoken@8.1.1

## Preparing the RESTful WebService
# edit package.json and add inside "scripts" 
  
"json": "json-server data.js -p 3500 -m authMiddleware.js"

# to provide json server package with data to work with. add a data.js to the Project Folder
# Content of the data.js could be as follow
   module.exports = function () {
       return {
           items: [
               {
                   id:1,name:"Test1", cat:"Cat1"
               },
               {
                   id:2,name:"Test2", cat:"Cat2"
               }
           ],
           orders: []
       }
   }

   # The Contents of the authMiddleware.js

const jwt = require("jsonwebtoken");
const APP_SECRET = "myappsecret";
const USERNAME = "admin";
const PASSWORD = "secret";
module.exports = function (req, res, next) {
    if ((req.url == "/api/login" || req.url == "/login")
      && req.method == "POST") {
        if (req.body != null && req.body.name == USERNAME
          && req.body.password == PASSWORD) {
            let token = jwt.sign({ data: USERNAME, expiresIn: "1h" },      
               APP_SECRET);
            res.json({ success: true, token: token });
        } else {
            res.json({ success: false });
        }
        res.end();
        return;
    } else if ((((req.url.startsWith("/api/products")
      || req.url.startsWith("/products"))
      || (req.url.startsWith("/api/categories")
      || req.url.startsWith("/categories"))) && req.method != "GET")
      || ((req.url.startsWith("/api/orders")
      || req.url.startsWith("/orders")) && req.method != "POST")) {
    	let token = req.headers["authorization"];
        if (token != null && token.startsWith("Bearer<")) {
            token = token.substring(7, token.length - 1);
            try {
                jwt.verify(token, APP_SECRET);
                next();
                return;
            } catch (err) { }
        }
        res.statusCode = 401;
        res.end();
        return;
    }
    next();
}
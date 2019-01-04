var http = require("http");
var emp = require("./controllers/employee");
var settings = require("./settings");
var httpMsgs = require("./core/httpMsgs");
var db = require("./core/db");
var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var sqlDb = require("mssql");

var app = express();
app.use(bodyParser());

var conn = new sqlDb.ConnectionPool(settings.dbConfing);

app.listen(settings.webPort, () => console.log('Server started at port:' + settings.webPort));

app.get("/employees", emp.getList);
app.get("/employees/:id", function (req, resp, next) {
  var id = req.params.id;
  emp.get(req, resp, id);
});

app.get("/add", function(req,resp){
  resp.sendFile('add.html',{root:path.join(__dirname)});
})

app.post('/add', function(request, response){
  console.log('Trying to create a new emp');

  var empId = request.body.empId;
  var empName = request.body.empName;
  var empSalary = request.body.empSalary;

  var sql = "INSERT INTO EMPLOYEES VALUES("+empId+",'"+empName+"',"+empSalary+")";
  

  conn.connect(function (err){
      if(err){
        console.log(err);
        return;
      }
      conn.query(sql, function(err,recordset){
        if(err){
          console.log(err);
        }
        else{
            console.log(recordset);
        }
        conn.close();
      });
    });
    response.write("Added successfully");
  response.end();
});
app.delete("/employees/:id", function (req, resp, next) {
  var id = req.params.id;
  emp.delete(req, resp, id);
});


app.get("/employee/update", function(req,resp){
    resp.sendFile('update.html',{root:path.join(__dirname)});
  })

app.post("/employee/update", function(req,resp){
    console.log('Trying to update an emp');

    var empId = request.body.empId;
    var empName = request.body.empName;
    var empSalary = request.body.empSalary;
  
    var sql = "UPDATE EMPLOYEES SET emp_name='"+empName+"', salary="+empSalary+" WHERE emp_id="+emp_id ;

    conn.connect(function (err){
        if(err){
          console.log(err);
          return;
        }
        conn.query(sql, function(err,recordset){
          if(err){
            console.log(err);
          }
          else{
              console.log(recordset);
          }
          conn.close();
        });
      });
});


   
  
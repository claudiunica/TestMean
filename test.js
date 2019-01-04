var sql = require("mssql");

var dbConfing = {
  server: '192.168.8.34',
  port: 1433,
  user: 'sa',
  password: 'ZAQ!2wsx',
  database: 'test'
};

function f(){
  var conn = new sql.ConnectionPool(dbConfing);
  var req = new sql.Request(conn);

  conn.connect(function (err){
    if(err){
      console.log(err);
      return;
    }
    conn.query("select * from employees", function(err,recordset){
      if(err){
        console.log(err);
      }
      else{
          console.log(recordset);
      }
      conn.close();
    });
  });
}

f();

//"select table_name from test.INFORMATION_SCHEMA.TABLES where TABLE_TYPE = 'BASE TABLE'"
//SELECT *  FROM test.INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'employees'


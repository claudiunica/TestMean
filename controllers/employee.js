var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");


exports.getList = function (req, resp) {
    db.executeSql("SELECT * FROM EMPLOYEES;", function (data, err) {
        if (err) {
            httpMsgs.show500(req,resp,err);
        }
        else {
            httpMsgs.sendJson(req,resp,data);
        }
        resp.end();
    });
};

exports.get = function (req, resp, empno) {
    db.executeSql("SELECT * FROM EMPLOYEES WHERE emp_id="+empno, function (data, err) {
        if (err) {
            httpMsgs.show500(req,resp,err);
        }
        else {
            httpMsgs.sendJson(req,resp,data);
        }
        resp.end();
    });
};

//post 
/*
exports.add = function (req, resp, data) {
    try{
         //console.log(reqBody);
         if(!data) throw new Error("Input not valid.");
        // var data = JSON.stringify(reqBody);
        console.log("data:"+data.empId+ data.empName+data.empSalary);
        //console.log("reqbody:"+reqBody);
        if(data){
            var sql = "INSERT INTO EMPLOYEES VALUES";
            sql+= util.format("(%d,%s,%d", data.empId, data.empName,data.empSalary);
            
            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500(req,resp,err);
                }
                else {
                    httpMsgs.send200(req,resp);
                }
            });        
        }
        else{
            throw new Error("Input not valid.");
        }
    }
    catch(ex){
        httpMsgs.show500(req,resp,ex);
    }
};
*/
exports.update = function (req, resp, reqBody) {
    try{
        
        if(!reqBody) throw new Error("Input not valid.");
        var data = JSON.stringify(reqBody);
       
       if(data){
           if(!data.empId) throw new Error("Empno not provided");
           var sql = "UPDATE EMPLOYEES SET";
           var isDataProvided = false;
           if(data.empName){
               sql +=" emp_name = '"+data.empName+"',";
               isDataProvided = true;
           }
           if(data.empName){
            sql +=" salary = "+data.empSalary+",";
            isDataProvided = true;
        }
           sql = sql.slice(0,-1);//remove the ,
           sql += 'WHERE emp_id = '+data.empId;
           
           db.executeSql(sql, function (data, err) {
               if (err) {
                   httpMsgs.show500(req,resp,err);
               }
               else {
                   httpMsgs.send200(req,resp);
               }
           });        
       }
       else{
           throw new Error("Input not valid.");
       }
   }
   catch(ex){
       httpMsgs.show500(req,resp,ex);
   }
};

exports.delete = function (req, resp, empno) {
    db.executeSql("DELETE FROM EMPLOYEES WHERE emp_id="+empno, function (data, err) {
        if (err) {
            httpMsgs.show500(req,resp,err);
        }
        else {
            resp.send("Deleted successfully")
        }
        resp.end();
    });
};
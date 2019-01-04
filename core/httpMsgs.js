var settings = require("../settings");

exports.show500 = function (req, resp, err) {
    if (settings.httpMsgFormat === "HTML") {
        resp.writeHead(500, "Internal err ", { "Content-Type": "text/html" });
        resp.write("<html><head><title>500</title></head><body>500: Internal err. Details:" + err + "</body></html>")
    } else {
        resp.writeHead(500, { "Content-Type": "application/json" });
        resp.write(JSON.stringify("Error occured:" + err));
    }
    resp.end();
};

exports.sendJson = function (req, resp, data) {
    resp.writeHead(200, { "Content-Type": "application/json" });
    if (data) {
        resp.write(JSON.stringify(data));
    }
    resp.end();
};

exports.show405 = function (req, resp, err) {
    if (settings.httpMsgFormat === "HTML") {
        resp.writeHead(405, "Internal err ", { "Content-Type": "text/html" });
        resp.write("<html><head><title>405</title></head><body>405: Method not suported. </body></html>")
    } else {
        resp.writeHead(405, { "Content-Type": "application/json" });
        resp.write(JSON.stringify("Method not suported." + err));
    }
    resp.end();
};

exports.show404 = function (req, resp, err) {
    if (settings.httpMsgFormat === "HTML") {
        resp.writeHead(404, "Internal err ", { "Content-Type": "text/html" });
        resp.write("<html><head><title>404</title></head><body>404: Resource not found. </body></html>")
    } else {
        resp.writeHead(404, { "Content-Type": "application/json" });
        resp.write(JSON.stringify("Resource not found." + err));
    }
    resp.end();
};

exports.send200 = function (req, resp) {
    resp.writeHead(200, { "Content-Type": "application/json" });
};

exports.showHome = function(req,resp){
    if (settings.httpMsgFormat === "HTML") {
        resp.writeHead(200, { "Content-Type": "text/html" });
        resp.write("<html><head><title>Home</title></head><body>Go to <br> /employees </body></html>");
    } else {
        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.write(JSON.stringify([
            {url:"/employees", operation:"GET", description:"List Employees"},
            {url:"/employees/<empno>", operation:"GET", description:"Search employee"}
        ]));
    }
    resp.end();
}


// setup express and handlebars
var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// set port number to command line argument
app.set('port', process.argv[2]);

app.use(express.static('public'));

// home page (GET request)
app.get('/search',function(req,res,next){
  var context = {};
  // select name, purpose, url, version, license FROM program P inner join program_src PS ON PS.pid = P.id inner join src S on PS.sid = S.id;
/*
sql = `SELECT * FROM program WHERE (program.name LIKE "%"?"%");
SELECT * FROM author WHERE (author.name LIKE "%"?"%");
SELECT * FROM language WHERE (language.name LIKE "%"?"%");
SELECT * FROM os WHERE (os.name LIKE "%"?"%");
SELECT * FROM src WHERE (src.url LIKE "%"?"%");`
*/

var sql = `SELECT * FROM program WHERE (program.name LIKE "%"?"%" OR program.purpose LIKE "%"?"%")`;
inserts = [req.query.search, req.query.search];

  mysql.pool.query(sql,inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    console.log("rows: " + JSON.stringify(rows));
    context.program = rows; //JSON.stringify(rows);
    console.log("rows: " + context.program);

sql = `SELECT * FROM author WHERE (author.name LIKE "%"?"%")`;
inserts = [req.query.search];

  mysql.pool.query(sql,inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.author = rows; //JSON.stringify(rows);

sql = `SELECT * FROM language WHERE (language.name LIKE "%"?"%")`;
inserts = [req.query.search];

  mysql.pool.query(sql,inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.language = rows; //JSON.stringify(rows);

sql = `SELECT * FROM os WHERE (os.name LIKE "%"?"%")`;
inserts = [req.query.search];

  mysql.pool.query(sql,inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.os = rows; //JSON.stringify(rows);

sql = `SELECT * FROM src WHERE (src.url LIKE "%"?"%")`;
inserts = [req.query.search];

  mysql.pool.query(sql,inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.src = rows; //JSON.stringify(rows);




  sql = `SELECT A.id AS aid, P.id AS pid, A.name AS aname, P.name AS pname FROM program_author PA INNER JOIN program P ON PA.pid = P.id INNER JOIN author A ON PA.aid = A.id WHERE (P.name LIKE "%"?"%") OR (A.name LIKE "%"?"%")`;
      //sql = `SELECT * FROM program_author`;
inserts = [req.query.search, req.query.search];

  mysql.pool.query(sql,inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.program_author = rows; //JSON.stringify(rows);

  sql = `SELECT L.id AS lid, P.id AS pid, L.name AS lname, P.name AS pname FROM program_language PL INNER JOIN program P ON PL.pid = P.id INNER JOIN language L ON PL.lid = L.id WHERE (P.name LIKE "%"?"%") OR (L.name LIKE "%"?"%")`;
inserts = [req.query.search, req.query.search];

  mysql.pool.query(sql,inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.program_language = rows; //JSON.stringify(rows);

  sql = `SELECT O.id AS oid, P.id AS pid, O.name AS oname, P.name AS pname FROM program_os PO INNER JOIN program P ON PO.oid = P.id INNER JOIN os O ON PO.oid = O.id WHERE (P.name LIKE "%"?"%") OR (O.name LIKE "%"?"%")`;
inserts = [req.query.search, req.query.search];

  mysql.pool.query(sql,inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.program_os = rows; //JSON.stringify(rows);


    console.log("myresults: " + JSON.stringify(context));
    res.render('search', context);
  });
  });
  });
  });
  });
  });
  });
  });
});

// home page (GET request)
app.get('/author',function(req,res,next){
  var context = {};
  // select name, purpose, url, version, license FROM program P inner join program_src PS ON PS.pid = P.id inner join src S on PS.sid = S.id;
  sql = 'SELECT * FROM author';
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.author = rows;
    context.table = "author";
    res.render('author', context);
  });
});


// home page (GET request)
app.get('/language',function(req,res,next){
  var context = {};
  // select name, purpose, url, version, license FROM program P inner join program_src PS ON PS.pid = P.id inner join src S on PS.sid = S.id;
  sql = 'SELECT * FROM language';
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.table = "language";
    context.language = rows;
    res.render('language', context);
  });
});


// home page (GET request)
app.get('/os',function(req,res,next){
  var context = {};
  // select name, purpose, url, version, license FROM program P inner join program_src PS ON PS.pid = P.id inner join src S on PS.sid = S.id;
  sql = 'SELECT * FROM os';
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

    context.table = "os";
    context.os = rows;
    res.render('os', context);
  });
});

// home page (GET request)
app.get('/program-language',function(req,res,next){
  var context = {};
  // select name, purpose, url, version, license FROM program P inner join program_src PS ON PS.pid = P.id inner join src S on PS.sid = S.id;
  sql = 'SELECT L.id AS lid, P.id AS pid, L.name AS lname, P.name AS pname FROM program_language PL INNER JOIN program P ON PL.pid = P.id INNER JOIN language L ON PL.lid = L.id';
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.program_language = rows;

      sql = 'SELECT * FROM program';
      mysql.pool.query(sql, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.program = rows;


      sql = 'SELECT * FROM language';
      mysql.pool.query(sql, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.language = rows;

    context.table = "program_language";
    res.render('program-language', context);
  });
  });
  });
});


// home page (GET request)
app.get('/program-author',function(req,res,next){
  var context = {};
  // select name, purpose, url, version, license FROM program P inner join program_src PS ON PS.pid = P.id inner join src S on PS.sid = S.id;
  sql = 'SELECT A.id AS aid, P.id AS pid, A.name AS aname, P.name AS pname FROM program_author PA INNER JOIN program P ON PA.pid = P.id INNER JOIN author A ON PA.aid = A.id';
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.program_author = rows;

      sql = 'SELECT * FROM program';
      mysql.pool.query(sql, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.program = rows;


      sql = 'SELECT * FROM author';
      mysql.pool.query(sql, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.author = rows;

    context.table = "program_author";
    res.render('program-author', context);
  });
  });
  });
});

// home page (GET request)
app.get('/program-os',function(req,res,next){
  var context = {};
  // select name, purpose, url, version, license FROM program P inner join program_src PS ON PS.pid = P.id inner join src S on PS.sid = S.id;
  sql = 'SELECT O.id AS oid, P.id AS pid, O.name AS oname, P.name AS pname FROM program_os PO INNER JOIN program P ON PO.pid = P.id INNER JOIN os O ON PO.oid = O.id';
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.program_os = rows;

      sql = 'SELECT * FROM program';
      mysql.pool.query(sql, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.program = rows;


      sql = 'SELECT * FROM os';
      mysql.pool.query(sql, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.os = rows;

    context.table = "program_os";
    res.render('program-os', context);
  });
  });
  });
});

// home page (GET request)
app.get('/src',function(req,res,next){
  var context = {};
  // select name, purpose, url, version, license FROM program P inner join program_src PS ON PS.pid = P.id inner join src S on PS.sid = S.id;
  sql = 'SELECT S.id, S.url, S.type, S.pid, P.name FROM src S INNER JOIN program P on S.pid = P.id;';
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.src = rows;

      sql = 'SELECT * FROM program';
      mysql.pool.query(sql, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.program = rows;
    //context.results = JSON.stringify(rows);
        context.table = "src";
    res.render('src', context);
  });
  });
});


// home page (GET request)
app.get('/',function(req,res,next){
      var context = {};
  sql = 'SELECT COUNT(*) AS num FROM program';
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.program = rows;

      sql = 'SELECT COUNT(*) AS num FROM src';
      mysql.pool.query(sql, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.src = rows;

      sql = 'SELECT COUNT(*) AS num FROM author';
      mysql.pool.query(sql, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.author = rows;

      sql = 'SELECT COUNT(*) AS num FROM os';
      mysql.pool.query(sql, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.os = rows;


      sql = 'SELECT COUNT(*) AS num FROM language';
      mysql.pool.query(sql, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.language = rows;

    res.render('home', context);
      });
      });
      });
      });
});
});

// home page (GET request)
app.get('/program',function(req,res,next){
  var context = {};
  // select name, purpose, url, version, license FROM program P inner join program_src PS ON PS.pid = P.id inner join src S on PS.sid = S.id;
  sql = 'SELECT * FROM program';
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.program = rows;

      sql = 'SELECT * FROM src';
      mysql.pool.query(sql, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.src = rows;

      sql = 'SELECT * FROM author';
      mysql.pool.query(sql, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.author = rows;

      sql = 'SELECT * FROM os';
      mysql.pool.query(sql, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.os = rows;

    context.table = "program";
    res.render('program', context);
      });
      });
      });
});
});


// home page (POST request)
app.post('/',function(req,res,next){
  var context = {};
  sql = 'SELECT * FROM program';
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.render('home', context);
  });
});

app.get('/update',function(req,res,next){
  var context = {};
  sql = 'SELECT * FROM program';
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.send(context.results);
  });
});

app.get('/insert',function(req,res,next){
  var context = {};
  let sql;
  let inserts;

        if (req.query.table == "program"){
          sql = "INSERT INTO program (`name`, `purpose`, `url`, `version`, `license`) VALUES (?, ?, ?, ?, ?); INSERT INTO program_author((SELECT id FROM author WHERE name = ?), `pid`) VALUES(?, ?)";
          inserts = [req.query.name, req.query.purpose, req.query.url, req.query.version, req.query.license, req.query.aid, req.query.pid];
        }

        else if (req.query.table == "author"){
          sql = "INSERT INTO author (`name`, `url`) VALUES (?, ?)";
          inserts = [req.query.name, req.query.url];
        }

        else if (req.query.table == "language"){
          sql = "INSERT INTO language (`name`, `url`) VALUES (?, ?)";
          inserts = [req.query.name, req.query.url];
        }

        else if (req.query.table == "os"){
          sql = "INSERT INTO os (`name`, `url`) VALUES (?, ?)";
          inserts = [req.query.name, req.query.url];
        }

        else if (req.query.table == "src"){
          sql = "INSERT INTO src (`url`, `type`, `pid`) VALUES (?, ?, ?)";
          inserts = [req.query.url, req.query.type, req.query.pid];
        }

        else if (req.query.table == "program_language"){
          sql = "INSERT INTO program_language(`pid`, `lid`) VALUES ((SELECT id FROM program WHERE name = ?), (SELECT id FROM language WHERE name = ?))";
          inserts = [req.query.pname, req.query.lname];
        }

        else if (req.query.table == "program_author"){
          sql = "INSERT INTO program_author(`pid`, `aid`) VALUES ((SELECT id FROM program WHERE name = ?), (SELECT id FROM author WHERE name = ?))";
          inserts = [req.query.pname, req.query.aname];
        }

        else if (req.query.table == "program_os"){
          sql = "INSERT INTO program_os(`pid`, `oid`) VALUES ((SELECT id FROM program WHERE name = ?), (SELECT id FROM os WHERE name = ?))";
          inserts = [req.query.pname, req.query.oname];
        }


  mysql.pool.query(sql, inserts, function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});

app.get('/delete',function(req,res,next){
  var context = {};
  if (req.query.table == "program_language") {
  sql= "DELETE FROM ?? WHERE pid=? AND lid=?";
    inserts = [req.query.table, req.query.pid, req.query.lid]; 
  }
  else if (req.query.table == "program_author") {
  sql= "DELETE FROM ?? WHERE pid=? AND aid=?";
    inserts = [req.query.table, req.query.pid, req.query.aid]; 
  }
  else if (req.query.table == "program_os") {
  sql= "DELETE FROM ?? WHERE pid=? AND oid=?";
    inserts = [req.query.table, req.query.pid, req.query.oid]; 
  }
  else {
  sql= "DELETE FROM ?? WHERE id=?";
    inserts = [req.query.table, req.query.id]; 
  }
    console.log("sql: " + sql);
    console.log("inserts: " + inserts);
    mysql.pool.query(sql, inserts, function(err, result){
    if(err){
        context.error = err;
console.log("err: ", err);
      next(err);
      return;
    }
    context.results = "Deleted " + result.changedRows + " rows.";
    res.render('home',context);
  });
});


///simple-update?id=2&name=The+Task&purpose=false&version=2015-12-5
app.get('/simple-update',function(req,res,next){
  var context = {};
  sql = "UPDATE program SET name=?, purpose=?, url=?, version=?, license=? WHERE id=? ";
    inserts = [req.query.name, req.query.purpose, req.query.url, req.query.version, req.query.license, req.query.id];
    mysql.pool.query(sql, inserts, function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Updated " + result.changedRows + " rows.";
    res.render('home',context);
  });
});


///safe-update?id=1&name=The+Task&purpose=false
app.get('/safe-update',function(req,res,next){
  var context = {};
  sql = "SELECT * FROM ?? WHERE id=?";
  inserts = [req.query.table, req.query.id];
  mysql.pool.query(sql, inserts, function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];

        if (req.query.table == "program"){
            sql = "UPDATE program SET name=?, purpose=?, url=?, version=?, license=? WHERE id=? ";
            inserts = [req.query.name || curVals.name, req.query.purpose || curVals.purpose, req.query.url || curVals.url, req.query.version || curVals.version, req.query.license || curVals.license, req.query.id];
        }

        else if (req.query.table == "author"){
            sql = "UPDATE author SET name=?, url=?  WHERE id=? ";
            inserts = [req.query.name || curVals.name, req.query.url || curVals.url, req.query.id];
        }

        else if (req.query.table == "language"){
            sql = "UPDATE language SET name=?, url=?  WHERE id=? ";
            inserts = [req.query.name || curVals.name, req.query.url || curVals.url, req.query.id];
        }

        else if (req.query.table == "os"){
            sql = "UPDATE os SET name=?, url=?  WHERE id=? ";
            inserts = [req.query.name || curVals.name, req.query.url || curVals.url, req.query.id];
        }

        else if (req.query.table == "src"){
            sql = "UPDATE src SET url=?, type=?, pid=(SELECT id FROM program WHERE name = ?) WHERE id=?";
            inserts = [req.query.url || curVals.url, req.query.type || curVals.type, req.query.pid || curVals.pid, req.query.id];
console.log("update query.id: ", req.query.id);
console.log("update pid: ", req.query.pid);
        }

        else if (req.query.table == "program_language"){
            sql = "UPDATE program_language SET pid=?, lid=? WHERE pid=? AND lid=?";
            inserts = [req.query.pid || curVals.pid, req.query.lid || curVals.lid, req.query.pidnew || curVals.pidnew, req.query.lidnew || curVals.lidnew, req.query.id];
console.log("update query.id: ", req.query.id);
console.log("update pid: ", req.query.pid);
        }

       

        mysql.pool.query(sql, inserts, function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home',context);
      });
    }
  });
});



///safe-update?id=1&name=The+Task&purpose=false
app.get('/safe-update-pl',function(req,res,next){
  var context = {};
  sql = "SELECT * FROM ?? WHERE pid=? AND lid=?";
  inserts = [req.query.table, req.query.pid, req.query.lid];
  mysql.pool.query(sql, inserts, function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];

            sql = "UPDATE program_language SET pid=?, lid=? WHERE pid=? AND lid=?";
            inserts = [req.query.pidnew || curVals.pidnew, req.query.lidnew || curVals.lid, req.query.pid || curVals.pid, req.query.lid || curVals.lidreq.query.id];
console.log("update query.pid: ", req.query.pid);
console.log("update query.lid: ", req.query.lid);

console.log("update query.pidnew: ", req.query.pidnew);
console.log("update query.lidnew: ", req.query.lidnew);

       

        mysql.pool.query(sql, inserts, function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home',context);
      });
    }
  });
});


///safe-update?id=1&name=The+Task&purpose=false
app.get('/safe-update-pa',function(req,res,next){
  var context = {};
  sql = "SELECT * FROM ?? WHERE pid=? AND aid=?";
  inserts = [req.query.table, req.query.pid, req.query.aid];
  mysql.pool.query(sql, inserts, function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];

            sql = "UPDATE program_author SET pid=?, aid=? WHERE pid=? AND aid=?";
            inserts = [req.query.pidnew || curVals.pidnew, req.query.aidnew || curVals.aid, req.query.pid || curVals.pid, req.query.aid || curVals.aid, req.query.id];
console.log("update query.pid: ", req.query.pid);
console.log("update query.aid: ", req.query.aid);

console.log("update query.pidnew: ", req.query.pidnew);
console.log("update query.aidnew: ", req.query.aidnew);

       

        mysql.pool.query(sql, inserts, function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home',context);
      });
    }
  });
});



///safe-update?id=1&name=The+Task&purpose=false
app.get('/safe-update-po',function(req,res,next){
  var context = {};
  sql = "SELECT * FROM ?? WHERE pid=? AND oid=?";
  inserts = [req.query.table, req.query.pid, req.query.oid];
  mysql.pool.query(sql, inserts, function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];

            sql = "UPDATE program_os SET pid=?, oid=? WHERE pid=? AND oid=?";
            inserts = [req.query.pidnew || curVals.pidnew, req.query.oidnew || curVals.oid, req.query.pid || curVals.pid, req.query.oid || curVals.oid, req.query.id];
console.log("update query.pid: ", req.query.pid);
console.log("update query.oid: ", req.query.oid);

console.log("update query.pidnew: ", req.query.pidnew);
console.log("update query.oidnew: ", req.query.oidnew);

       

        mysql.pool.query(sql, inserts, function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home',context);
      });
    }
  });
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  sql = "SOURCE program.sql";
    mysql.pool.query(sql, function(err){
    if(err){
      next(err);
      return;
    }
      context.results = "Table reset";
      res.render('home',context);
    })
});

app.get('/edit-program', function(req,res,next) {
     var context = {};
    sql = 'SELECT * FROM program WHERE id=?';
    inserts = [req.query.id];
  mysql.pool.query(sql, inserts , function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.table = "program";
    context.program = rows;
    res.render('edit-program.handlebars', context);
  });
});


app.get('/edit-author', function(req,res,next) {
     var context = {};
    sql = 'SELECT * FROM author WHERE id=?';
    inserts = [req.query.id];
  mysql.pool.query(sql, inserts , function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.table = "author";
    context.author = rows;
    res.render('edit-author.handlebars', context);
  });
});


app.get('/edit-language', function(req,res,next) {
     var context = {};
    sql = 'SELECT * FROM language WHERE id=?';
    inserts = [req.query.id];
  mysql.pool.query(sql, inserts , function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.table = "language";
    context.language = rows;
    res.render('edit-language.handlebars', context);
  });
});


app.get('/edit-program-language', function(req,res,next) {
     var context = {};
  sql = 'SELECT L.id AS lid, P.id AS pid, L.name AS lname, P.name AS pname FROM program_language PL INNER JOIN program P ON PL.pid = P.id INNER JOIN language L ON PL.lid = L.id WHERE P.id = ? AND L.id = ?';
    //sql = 'SELECT * FROM program_language WHERE pid=? AND lid=?';
    inserts = [req.query.pid, req.query.lid];
  mysql.pool.query(sql, inserts , function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.program_language = rows;


    sql = 'SELECT * FROM program';
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.program = rows;


    sql = 'SELECT * FROM language';
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.language = rows;

    context.table = "program_language";
    res.render('edit-program-language.handlebars', context);
  });
  });
  });
});

app.get('/edit-program-author', function(req,res,next) {
     var context = {};
  sql = 'SELECT A.id AS aid, P.id AS pid, A.name AS aname, P.name AS pname FROM program_author PA INNER JOIN program P ON PA.pid = P.id INNER JOIN author A ON PA.aid = A.id WHERE P.id = ? AND A.id = ?';
    //sql = 'SELECT * FROM program_language WHERE pid=? AND lid=?';
    inserts = [req.query.pid, req.query.aid];
  mysql.pool.query(sql, inserts , function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.program_author = rows;


    sql = 'SELECT * FROM program';
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.program = rows;


    sql = 'SELECT * FROM author';
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.author = rows;

    context.table = "program_author";
    res.render('edit-program-author.handlebars', context);
  });
  });
  });
});


app.get('/edit-program-os', function(req,res,next) {
     var context = {};
  sql = 'SELECT O.id AS oid, P.id AS pid, O.name AS oname, P.name AS pname FROM program_os PO INNER JOIN program P ON PO.pid = P.id INNER JOIN os O ON PO.oid = O.id WHERE P.id = ? AND O.id = ?';
    //sql = 'SELECT * FROM program_language WHERE pid=? AND lid=?';
    inserts = [req.query.pid, req.query.oid];
  mysql.pool.query(sql, inserts , function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.program_os = rows;


    sql = 'SELECT * FROM program';
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.program = rows;


    sql = 'SELECT * FROM os';
  mysql.pool.query(sql, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.os = rows;

    context.table = "program_os";
    res.render('edit-program-os.handlebars', context);
  });
  });
  });
});



app.get('/edit-os', function(req,res,next) {
     var context = {};
    sql = 'SELECT * FROM os WHERE id=?';
    inserts = [req.query.id];
  mysql.pool.query(sql, inserts , function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.table = "os";
    context.os = rows;
    res.render('edit-os.handlebars', context);
  });
});


app.get('/edit-src', function(req,res,next) {
     var context = {};

  sql = 'SELECT S.id, S.url, S.type, S.pid, P.name FROM src S INNER JOIN program P on S.pid = P.id WHERE S.id = ?;';
    inserts = [req.query.id];
  mysql.pool.query(sql, inserts, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.src = rows;

      sql = 'SELECT * FROM program';
      mysql.pool.query(sql, function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.program = rows;
    //context.results = JSON.stringify(rows);
        context.table = "src";
    res.render('edit-src', context);
  });
  });
});




app.get('/er', function(req,res,next) {
    res.render('er.handlebars');
});

app.get('/schema', function(req,res,next) {
    res.render('schema.handlebars');
});

app.get('/docs', function(req,res,next) {
    res.render('docs.handlebars');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

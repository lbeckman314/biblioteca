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
sql = `SELECT * FROM program WHERE (program.name LIKE "%"?"%");
 SELECT * FROM author WHERE (author.name LIKE "%"?"%");
 SELECT * FROM language WHERE (language.name LIKE "%"?"%");
 SELECT * FROM os WHERE (os.name LIKE "%"?"%");
 SELECT * FROM src WHERE (src.url LIKE "%"?"%");`

  mysql.pool.query(sql,[req.query.search, req.query.search, req.query.search,req.query.search, req.query.search], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.render('search', context);
  });
});

// home page (GET request)
app.get('/author',function(req,res,next){
  var context = {};
  // select name, purpose, url, version, license FROM program P inner join program_src PS ON PS.pid = P.id inner join src S on PS.sid = S.id;
  mysql.pool.query('SELECT * FROM author', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.render('author', context);
  });
});


// home page (GET request)
app.get('/language',function(req,res,next){
  var context = {};
  // select name, purpose, url, version, license FROM program P inner join program_src PS ON PS.pid = P.id inner join src S on PS.sid = S.id;
  mysql.pool.query('SELECT * FROM language', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.render('language', context);
  });
});


// home page (GET request)
app.get('/os',function(req,res,next){
  var context = {};
  // select name, purpose, url, version, license FROM program P inner join program_src PS ON PS.pid = P.id inner join src S on PS.sid = S.id;
  mysql.pool.query('SELECT * FROM os', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.render('os', context);
  });
});

// home page (GET request)
app.get('/src',function(req,res,next){
  var context = {};
  // select name, purpose, url, version, license FROM program P inner join program_src PS ON PS.pid = P.id inner join src S on PS.sid = S.id;
  mysql.pool.query('SELECT * FROM src', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.render('src', context);
  });
});


// home page (GET request)
app.get('/',function(req,res,next){
      var context = {};
    res.render('home', context);
  });

// home page (GET request)
app.get('/program',function(req,res,next){
  var context = {};
  // select name, purpose, url, version, license FROM program P inner join program_src PS ON PS.pid = P.id inner join src S on PS.sid = S.id;
  mysql.pool.query('SELECT * FROM program', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.render('program', context);
  });
});


// home page (POST request)
app.post('/',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM program', function(err, rows, fields){
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
  mysql.pool.query('SELECT * FROM program', function(err, rows, fields){
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
  mysql.pool.query("INSERT INTO program (`name`, `purpose`, `url`, `version`, `license`) VALUES (?, ?, ?, ?, ?)", [req.query.name, req.query.purpose, req.query.url, req.query.version, req.query.license], function(err, result){
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
  mysql.pool.query("DELETE FROM program WHERE id=?", [req.query.id], function(err, result){
    if(err){
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
  mysql.pool.query("UPDATE program SET name=?, purpose=?, url=?, version=?, license=? WHERE id=? ",
    [req.query.name, req.query.purpose, req.query.url, req.query.version, req.query.license,  req.query.id],
    function(err, result){
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
  mysql.pool.query("SELECT * FROM program WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE program SET name=?, purpose=?, url=?, version=?, license=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.purpose || curVals.purpose, req.query.url || curVals.url, req.query.version || curVals.version, req.query.license || curVals.license, req.query.id],
        function(err, result){
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
  mysql.pool.query("DROP TABLE IF EXISTS program", function(err){
    var createString = "CREATE TABLE program("+
    "id int(10) NOT NULL AUTO_INCREMENT,"+
    "name varchar(255) NOT NULL,"+
    "purpose varchar(255),"+
    "url varchar(255),"+
    "version varchar(255),"+
    "license varchar(255),"+
    "PRIMARY KEY(id)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.get('/edit', function(req,res,next) {
 var context = {};
  mysql.pool.query('SELECT * FROM program WHERE id=?', [req.query.id], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.render('edit.handlebars', context);
  });
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

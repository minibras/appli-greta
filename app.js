var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var hbs = require('hbs');
var fs = require('fs');

var app = express();

mongoose.connect("mongodb://localhost/appliForm");

//test connection db mongoose
mongoose.connection.on("error", function(){
    console.log("erreur lors de la connection à la base de données");
});
mongoose.connection.on("open", function(){
    console.log("connexion à la base de données OK");
});

/*chargement configuration JSON des actions --> controleurs */
GLOBAL.dynRoutes = JSON.parse(fs.readFileSync("./routes/dynRoutes.json", 'utf8'));

var schemadb_json = JSON.parse(fs.readFileSync("./db_schema.json", 'utf8'));

//création des modèles mongoose
GLOBAL.schemas = {};
for (var schema in schemadb_json) {
    GLOBAL.schemas[schema] = mongoose.model(schema, schemadb_json[schema].schema, schemadb_json[schema].collection);
};
//console.log(GLOBAL.schemas);


hbs.registerPartials(__dirname + '/views/partials', function() {
    console.log('partials registered')
});

/*ajout comparaison*/
hbs.registerHelper('compare', function (lvalue, rvalue, options) {
   // console.log("####### COMPARE lvalue: ",lvalue," et rvalue: ", rvalue);
    if (arguments.length < 3)
        throw new Error ("Handlebars Helper 'compare' needs 2 parameters");
    var operator = options.hash.operator || "==";
    var operators = {
        '==': function (l,r) {
            return l == r;
        },
        'isEmptyTab': function(obj) {
            return (!obj || obj.length ==0);
        } 
    }
if (!operators[operator])
    throw new Error("'compare' doesn't know the operator " + operator);
var result = operators[operator](lvalue, rvalue);
if (result) {
    return options.fn(this);
} else {
    return options.inverse(this);
       } 
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
    cookieName: 'sessiongreta', 
    secret: 'AsipfGjdp*%dsDKNFNFKqoeID1345'
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user,done) {
    done(null, user.id);
});

passport.deserializeUser(function(id,done) {
    GLOBAL.schemas["Users"].findById(id, function(err,user){
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        GLOBAL.schemas["Users"].findOne({
                login: username
            },
            function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    console.log("pas d'utilisateur trouvé");
                    return done(null, false, {
                        message: 'incorrect password'
                    });
                }
                if (user.password != password) {
                    console.log("password erroné");
                    return done(null, false, {
                        message: 'incorrect password'
                    });
                }
                console.log("utilisateur : ", user);
                return done(null, user);
            });
    }
));
app.post('/authenticated', passport.authenticate('local'), function (req, res) {
    if (req.session.passport.user != null) {
        res.redirect('/admin'); //le user est authentifié on affiche l’index il est en session
    } else {
        res.redirect('/'); // il n’est pas présent on renvoie à la boîte de login
    }
});


// gestion dynamique des routes
require('./dynRouter')(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/language-service');
var swagger = require("swagger-node-express");
var jwt = require('jsonwebtoken');

//Importing models to use
var Lesson = require('./model/lesson');
var Language  = require('./model/language') ;
var Example = require('./model/example');

//Allow all requests from all domains & localhost
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Couple the application to the Swagger module. 
swagger.setAppHandler(app);


//login api to use jwt
app.post('/api/login', function(request, response){
   const user = {username: request.body.username};
    const token = jwt.sign({user},"my_secret_key");
    response.json({
        token: token
    });
    
});

//get examples
app.get('/example', function(request, response){
    Example.find({}, function(err, examples){
          if(err)
           {
               response.status(500).send({error:"Could not fetch examples"});
           }
       else{
           response.status(200).send(examples);
       }
    })
});

//get lessons
app.get('/lesson', function(request, response){
   Lesson.find({}).populate({path: 'lessons', model:'Lesson'}).exec (function(err, lessons){
       if(err)
           {
               response.status(500).send({error:"Could not fetch lessons"});
           }
       else{
           response.status(200).send(lessons);
       }
   }) 
});


//get languages
app.get('/language', function(request, response){
    Language.find({}).populate({path: 'languages', model:'Language'}).exec(function(err, lanaguages){
        if(err)
            {
                response.status(500).send({error: "Could not fetch Languages"});
            }
        else{
            response.status(200).send(lanaguages);
        }
    })
});


//get lesson using language(get lesson for specific language)
//used with navigation from lanaguage list to languages's lesson
app.get('/lesson/:lessonId', function(request, response){
  Lesson.findOne({_id: request.query.lessonId}).populate({path: 'lesson', model:'Lesson'}).exec(function(err, lesson){
        if(err){
            response.status(500).send({error: "Could not find lesson"});
        }
      else{
          response.status(200).send(lesson);
      }
  })
});


//get example using lesson(get example for specific lesson)
//used while navigation from lesson list to lesson's example
app.get('/example/:exampleId', function(request, response){
  Lesson.findOne({_id: request.query.exampleId}).populate({path: 'example', model:'Example'}).exec(function(err, example){
        if(err){
            response.status(500).send({error: "Could not find example"});
        }
      else{
          response.status(200).send(example);
      }
  })
});


// post new example
app.post('/example', ensureToken, function(request, response){
    jwt.verify(request.token, "my_secret_key", function(err, data){
        if(err){
            response.sendStatus(403);
        }
        else{
            var example = new Example();
            example.name = request.body.name;
            example.description = request.body.description;

            example.save(function(err, savedExample){
                if(err){
                    response.status(500).send({error: "Could not save example"});
                }     
                else{
                     response.status(200).send(savedExample);
                }
            }) 
        }
    })

});


//post new lesson
app.post('/lesson', ensureToken, function(request, response){
     jwt.verify(request.token, "my_secret_key", function(err, data){
        if(err){
            response.sendStatus(403);
        }
        else{
           var lesson = new Lesson();
            lesson.name = request.body.name;
            lesson.description = request.body.description;
            lesson.details = request.body.details;

            lesson.save(function(err, savedLesson){
                if(err)
                    {
                        response.status(500).send({error: "Could not save lesson"});
                    }
                else{
                    response.status(200).send(savedLesson);
                }
          })
        }
     })
});


//post new lanaguage
app.post('/language',ensureToken, function(request, response){
     jwt.verify(request.token, "my_secret_key", function(err, data){
        if(err){
            response.sendStatus(403);
        }
        else{
           var language = new Language();
            language.name = request.body.name;
            language.title = request.body.title;
            language.introduction = request.body.introduction;

            language.save(function(err, savedLanguage){
                if(err){
                        response.status(500).send({error: "could not save Language"});
                    }
                else{
                    response.status(200).send(savedLanguage);
                }
         })
       }
    })
});


//add lesson for a specific language
app.put('/language/lesson/add',ensureToken, function(request, response){
    jwt.verify(request.token, "my_secret_key", function(err, data){
        if(err){
            response.sendStatus(403);
        }
        else{
            Lesson.findOne({_id: request.body.lessonId}, function(err, lesson){
                if(err){
                    response.status(500).send({error: "Could not find lesson"});
                }
                else{
                    Language.update({_id: request.body.languageId}, {$addToSet:{lesson: lesson._id}}, function(err, language){
                        if(err){
                            response.status(500).send({  error : "PROGRAMMING_LANGUAGE_NOT_FOUND" ,description : "Programming language not found"})
                        }
                        else{
                            response.status(200).send("Successfully added to Language");
                        }
                    })
                }
            })
         }
    })
});



// add example to specific lesson 
app.put('/lesson/example/add', ensureToken, function(request, response){
     jwt.verify(request.token, "my_secret_key", function(err, data){
        if(err){
            response.sendStatus(403);
        }
        else{
        Example.findOne({_id: request.body.exampleId}, function(err, example){
            if(err){
                response.status(500).send({error: "Could not find example"});
            }
            else{
                Lesson.update({_id: request.body.lessonId}, {$addToSet:{example: example._id}}, function(err, lesson){
                    if(err){
                        response.status(500).send({  error : "LESSON_NOT_FOUND" ,description : "Lesson not found"})
                    }
                    else{
                        response.status(200).send("Successfully added to Lesson");
                    }
                })
            }
            })
        }
     })
});

    
    
function ensureToken(request, response, next){
    const bearerHeader =  request.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        var bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        request.token = bearerToken;
        next();
    }
    else{
        response.sendStatus(483);
    }
};

app.listen(3000, function(){
   console.log("Language service is ruuning on port 3000");
});


//export module to be used using chai and express
module.exports = app;
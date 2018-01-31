var chai = require ('chai');
var expect = require('chai').expect;
var app  = require('../server.js');
var jwt = require('jsonwebtoken');

//Importing models to use
var Lesson = require('../model/lesson');
var Language  = require('../model/language') ;
var Example = require('../model/example');

chai.use(require('chai-http'));


describe('Task API Routes', function() {  
    // This function will run before every test to clear database
    beforeEach(function(done) {
        app.db.object = {};
        app.db.object.lesson = [{
            id: uuid(),
            name: 'lesson1',
            description: 'description1',
            details: 'details1'
        }];
        app.db.write();
        done();
    });
});
    


describe('POST /api/login', function() {
    this.timeout(5000); // How long to wait for a response (ms)

        it('Login Here', function() {
            return chai.request(app)
            .post('/api/login')
                .send({
                    username: 'menna'
                })
                .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
        });
    });
});


describe("/GET examples", function(){
     this.timeout(5000); // How long to wait for a response (ms)
    
    // get all inserted examples
    it("Should return all examples", function(){
          return chai.request(app)
          .get('/example')
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
        });
    });
});


describe("/GET Lessons", function(){
     this.timeout(5000); // How long to wait for a response (ms)
    
    // get all inserted lessons
    it("Should return all lessons", function(){
          return chai.request(app)
          .get('/lesson')
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
        });
    });
});


describe("/GET Langugaes", function(){
     this.timeout(5000); // How long to wait for a response (ms)
    
    // get all inserted languages
    it("Should return all languages", function(){
          return chai.request(app)
          .get('/language')
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
        });
    });
});


 describe('POST /exmples', function() {
    const token = jwt.sign({username: 'menna'},"my_secret_key");
     
    this.timeout(5000); // How long to wait for a response (ms)

        it('Should save examples', function() {
            return chai.request(app)
            .post('/example')
                .send({
                    name: 'example test',
                    description: 'example description test'
                })
             .set('Authorization', 'Bearer ' +token)
                .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
        });
    });
});


 describe('POST /lesson', function() {
     const token = jwt.sign({username: 'menna'},"my_secret_key");
     
    this.timeout(5000); // How long to wait for a response (ms)

        it('Should save lessons', function() {
            return chai.request(app)
            .post('/lesson')
                .send({
                    name: 'lesson test',
                    description: 'lesson description test',
                    details: 'lesson details test'
                })
                .set('Authorization', 'Bearer '+token)
                .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
        });
    });
});


 describe('POST /language', function() {
    const token = jwt.sign({username: 'menna'},"my_secret_key");

    this.timeout(5000); // How long to wait for a response (ms)

        it('Should save language', function() {
            return chai.request(app)
            .post('/language')
                .send({
                    name: 'language test',
                    title: 'language description test',
                    introduction: 'language details test'
                })
                .set('Authorization', 'Bearer '+token)
                .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
        });
    });
});


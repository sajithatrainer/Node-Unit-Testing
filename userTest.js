//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/userModel');

//Require the dev-dependencies

let chai = require('chai');
const request = require('supertest') ;

let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let {expect}= chai.expect


chai.use(chaiHttp);

const validTempUser={
  "userName": "Sam",
  "email": "sam123@gmail.com",
  "password": "secret@123",
  "role": "guest",

}


const invalidTempUser={
  "userName": "Leo",
  "password": "secret@123",
  "role": "guest",

}


  //Test the /GET route
  
  describe('Checking /GET user', () => {

  //   beforeEach((done) => { //Before each test we empty the database
  //     User.deleteMany({});  
  //     done();      
  // });

      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/user')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  //res.body.length.should.be.eql(2);
              done();
            });
      }) ;
   

   
   
    it('it should post a user', (done) => {
       
        chai.request(server)
        .post('/api/user')
        .send(validTempUser)
        .end((err, res) => {
        res.should.have.status(201);
        
         res.body.should.be.a('object');
         res.body.should.have.property('userName');
         res.body.should.have.property('password');
        res.body.should.have.property('email');
        res.body.should.have.property('role');
          done();
        });
      })

  

      it("shouldn't accept if email is not passed", (done) => {
        chai.request(server)
          .post("/api/user/")
          .send(invalidTempUser)
          .end((err, res) => {
           res.should.have.status(400);
           res.body.should.be.a('object');
           console.log("Response " + res.body)
            res.body.should.have.property('errors');
           res.body.errors.should.have.property('email');
              res.body.errors.email.should.have.property('message').eql('email required');
            done();
          })
          
      });
    }); //end of describe

 
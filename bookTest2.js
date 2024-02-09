//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Book = require('../models/bookModel');

//Require the dev-dependencies

let chai = require('chai');

let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);


describe('/Test GET book', () => {
    xit('it should GET all the books', (done) => {
      chai.request(server)
          .get('/api/book')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                
            done();
          });
    }) ;

    it('it should have correct data type', (done) => {
        chai.request(server)
            .get('/api/book')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  
              done();
            });
      }) ;
});


const mongoose=require('mongoose')
const chai = require('chai');    // for assert
let chaiHttp = require('chai-http');
const expect = chai.expect;      // type of assert
const sinon = require("sinon");  // function mocking
chai.use(chaiHttp);

const User = require('../models/userModel') ;
const userController = require('../controllers/userController')
const userStubValue={
    "userName": "Jhon",
    "email": "jhon5@gmail.com",
    "password": "secret@123",
    "role": "guest",
  
  }
  const responseStubValue= {
    status:201,
    body:userStubValue
  }


describe("mock user create",  function() {
    it("should add a new user to the db", async function() {
      const userStub = sinon.stub(User, "create").returns(userStubValue);
      const controllerStub = sinon.stub(userController,"createUser").returns(responseStubValue)
      const response = await userController.createUser(userStub);
      expect(controllerStub.calledOnce).to.be.true;
       expect(response.status).to.equal(responseStubValue.status)
      expect(response.body).to.equal(responseStubValue.body)
       expect(response.body.userName).to.equal(userStubValue.userName);
    //   expect(user.email).to.equal(userStubValue.email);
    //   expect(user.password).to.equal(userStubValue.password);
    //   expect(user.role).to.equal(userStubValue.role);
    
    });

})
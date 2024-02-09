const request = require('supertest');

const url='http://localhost:4000'
describe('/Suprt Test GET book', () => {
    it('it should GET all the books', (done) => {
        request(url)
        .get('/api/book')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
        });
        done();
    }) ;

}); //end of describe




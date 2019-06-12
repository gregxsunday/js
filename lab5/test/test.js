//Source: https://codeforgeek.com/2015/07/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");
var chai = require('chai');
chai.use(require('chai-json'));

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");
var expect = chai.expect;

// UNIT test begin
describe('GET /', function() {
      it('respond with html', function(done) {
         server
         .get('/')
         .expect('Content-Type', /html/)
         .expect(200, done);
      });
});

describe('GET /add', function() {
      it('responds with 3', function(done) {
         server
         .get('/add')
         .expect('Content-Type', /html/)
         .expect(200)
         .expect('3', done);
      });
});

describe('GET /add/:x/:y', function() {
      it('responds with 8 on /add/3/5', function(done) {
         server
         .get('/add/3/5')
         .expect('Content-Type', /html/)
         .expect(200)
         .expect('8', done);
      });

      it('responds with 14 on /add/7/7', function(done) {
         server
         .get('/add/7/7')
         .expect('Content-Type', /html/)
         .expect(200)
         .expect('14', done);
      });
});

describe('GET /add', function() {
      it('responds with 3', function(done) {
         server
         .get('/add')
         .expect('Content-Type', /html/)
         .expect(200)
         .expect('3', done);
      });
});

describe('GET /math', function() {
  it('stores a valid JSON file', function(done) {
    chai.expect('math.json').to.be.a.jsonFile();
    done();
  });
});

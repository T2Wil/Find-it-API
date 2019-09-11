/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();
chai.expect();

describe('Suggestions', () => {
  describe('GET suggestions/', () => {
    it('should get a 404 error', (done) => {
      chai.request(app)
        .get('/suggestions/')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    describe('GET /suggestions/:q/:latitude?/:longitude?', () => {
      it('should return all matching cities', (done) => {
        const q = 'lon';
        const latitude = 12;
        const longitude = 34;
        chai.request(app)
          .get(`/suggestions/:${q}/:${latitude}?/:${longitude}?`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          });
      });
    });
  });
});

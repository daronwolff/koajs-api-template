const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../app');

const ROUTE = '/v1/devices';

describe('routes: devices/', () => {
  describe(`GET ${ROUTE}`, () => {
    it('should return json', (done) => {
      chai.request(server)
        .get(ROUTE)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          done();
        });
    });
  });
});

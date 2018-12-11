//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Fleet = require('../models/fleet');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Fleets', () => {
    beforeEach((done) => { //Before each test we empty the database
        Fleet.remove({}, (err) => { 
        });        
    });
/*
  * Test the /GET route
  */
  describe('/GET fleet', () => {
      it('it should GET all the fleets', (done) => {
        chai.request(app)
            .get('/fleets')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
      });
  });

  /*
  * Test the /POST route
  */
 describe('/POST fleet', () => {
    it('it should POST a fleet', (done) => {
        let fleet = {
            "make": "Tata",
            "model": "RT-345",
            "prod_year": "081356699890",
            "plate_number": "MVBG-34897",
            "category": "TRUCK"
        }
      chai.request(app)
          .post('/fleets/create')
          .send(fleet)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Fleet successfully added!');
            res.body.book.should.have.property('title');
            res.body.book.should.have.property('author');
            res.body.book.should.have.property('pages');
            res.body.book.should.have.property('year');
        done();
          });
    });

});

/*
  * Test the /GET/:id route
  */
 describe('/GET/:id fleet', () => {
    it('it should GET a fleet by the given id', (done) => {
        let fleet = new Fleet({
            "make": "Tata",
            "model": "RT-345",
            "prod_year": "081356699890",
            "plate_number": "MVBG-34897",
            "category": "TRUCK"
        });
        fleet.save((err, fleet) => {
            chai.request(server)
          .get('/fleets/' + fleet.id)
          .send(book)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('make');
                res.body.should.have.property('model');
                res.body.should.have.property('prod_year');
                res.body.should.have.property('plate_number');
                res.body.should.have.property('category');
                res.body.should.have.property('_id').eql(fleet.id);
            done();
          });
        });

    });

    /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id fleet', () => {
    it('it should UPDATE a fleet given the id', (done) => {
        let fleet = new Fleet({
            "make": "Tata",
            "model": "RT-345",
            "prod_year": "081356699890",
            "plate_number": "MVBG-34897",
            "category": "TRUCK"
        })
        fleet.save((err, fleet) => {
              chai.request(server)
              .put(`/fleets/${fleet.id}/update`)
              .send({
                "make": "Tata",
                "model": "RT-345",
                "prod_year": "081356699890",
                "plate_number": "MVBG-34897",
                "category": "CAR"
            })
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.book.should.have.property('category').eql("car");
                done();
              });
        });
    });
});

/*
  * Test the /DELETE/:id route
  */
 describe('/DELETE/:id Fleet', () => {
    it('it should DELETE a book given the id', (done) => {
        let fleet = new Fleet({
            "make": "Tata",
            "model": "RT-345",
            "prod_year": "081356699890",
            "plate_number": "MVBG-34897",
            "category": "CAR"
        })
        book.save((err, fleet) => {
              chai.request(server)
              .delete(`/fleets/${fleet.id}/delete`)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Deleted successfully!');
                done();
              });
        });
    });
});
});

});


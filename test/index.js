const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app.js');
const faker = require('faker')

chai.use(chaiHttp);
var token
describe('User Signin ', () => {
  describe('Signin', function() {
    it('Should sign in User', function(done) {
      chai.request(app)
        .post('/users/signin')
        .send({ username: 'admin', password: 'rahasia' })
        .end(function(err, res) {
           expect(res).to.have.status(200);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Success Signin');
           expect(res.body.data).to.have.property('token');
           token = res.body.data.token
           done();
        })
    })
    it('Should Give error when wrong credentials', function(done) {
      chai.request(app)
        .post('/users/signin')
        .send({ username: 'admin', password: 'rahasiasalah' })
        .end(function(err, res) {
           expect(res).to.have.status(403);
           expect(res).to.be.json;
           expect(res.body).to.have.property('message');
           expect(res.body.message).to.equal('Invalid Signin');
           done();
        })
    })
  })
})
var userId
describe('User Crud', function() {
  it('Should return all user', function(done) {
    chai.request(app)
      .get('/users')
      .set('token', token)
      .set('otoritas', 'get_user')
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Retrieve All Users');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should create new user', function(done) {
    chai.request(app)
      .post('/users')
      .set('token', token)
      .set('otoritas', 'create_user')
      .send({
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.firstName() })
      .end(function(err, res) {
         expect(res).to.have.status(201);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Create User');
         expect(res.body).to.have.property('data');
         userId = res.body.data.id
         done();
      })
  })
  it('Should Give error when create user without auth', function(done) {
    chai.request(app)
      .post('/users')
      .send({
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.firstName() })
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
  it('Should Update User', function(done) {
    chai.request(app)
      .put(`/users/${userId}`)
      .set('token', token)
      .set('otoritas', 'edit_user')
      .send({
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.name.firstName() })
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Update User');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Delete User', function(done) {
    chai.request(app)
      .del(`/users/${userId}`)
      .set('token', token)
      .set('otoritas', 'delete_user')
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Delete User');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Give error when delete a Password without auth', function(done) {
    chai.request(app)
      .del(`/users/${userId}`)
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
})

describe('Otoritas Management', function() {
  it('Should return all otoritas', function(done) {
    chai.request(app)
      .get('/otoritas')
      .set('token', token)
      .set('otoritas', 'get_otoritas')
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Read Otoritas');
         expect(res.body).to.have.property('data');
         done();
      })
  })

  it('Should return otoritas user', function(done) {
    chai.request(app)
      .get('/otoritas/user/1')
      .set('token', token)
      .set('otoritas', 'get_otoritas_user')
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Read Otoritas User');
         expect(res.body).to.have.property('data');
         done();
      })
  })
});
var kategoritransaksiId
describe('Kategori Transaksi Crud', function() {
  it('Should create new Kategori Transaksi', function(done) {
    chai.request(app)
      .post('/kategori-transaksi')
      .set('token', token)
      .set('otoritas','create_kategori_transaksi')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(201);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Create Kategori Transaksi');
         expect(res.body).to.have.property('data');
         kategoritransaksiId = res.body.data.id
         done();
      })
  })
  it('Should Give error when create new Kategori Transaksi without auth', function(done) {
    chai.request(app)
      .post('/kategori-transaksi')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
  it('Should Update Kategori Transaksi', function(done) {
    chai.request(app)
      .put(`/kategori-transaksi/${kategoritransaksiId}`)
      .set('token', token)
      .set('otoritas','edit_kategori_transaksi')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Update Kategori Transaksi');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Delete a KategoriTransaksi', function(done) {
    chai.request(app)
      .del(`/kategori-transaksi/${kategoritransaksiId}`)
      .set('token', token)
      .set('otoritas','delete_kategori_transaksi')
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Delete Kategori Transaksi');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Give error when delete a KategoriTransaksi without auth', function(done) {
    chai.request(app)
      .del(`/kategori-transaksi/${kategoritransaksiId}`)
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
})

var kategoriprodukId
describe('Kategori Transaksi Crud', function() {
  it('Should create new Kategori Produk', function(done) {
    chai.request(app)
      .post('/kategori-produk')
      .set('token', token)
      .set('otoritas','create_kategori_produk')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(201);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Create Kategori Produk');
         expect(res.body).to.have.property('data');
         kategoriprodukId = res.body.data.id
         done();
      })
  })
  it('Should Give error when create new Kategori Produk without auth', function(done) {
    chai.request(app)
      .post('/kategori-produk')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
  it('Should Update Kategori Produk', function(done) {
    chai.request(app)
      .put(`/kategori-produk/${kategoriprodukId}`)
      .set('token', token)
      .set('otoritas','edit_kategori_produk')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Update Kategori Produk');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Delete a KategoriProduk', function(done) {
    chai.request(app)
      .del(`/kategori-produk/${kategoriprodukId}`)
      .set('token', token)
      .set('otoritas','delete_kategori_produk')
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Delete Kategori Produk');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Give error when delete a Kategori Produk without auth', function(done) {
    chai.request(app)
      .del(`/kategori-produk/${kategoriprodukId}`)
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
})

var poliId
describe('Poli Crud', function() {
  it('Should create new Poli', function(done) {
    chai.request(app)
      .post('/poli')
      .set('token', token)
      .set('otoritas','create_poli')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(201);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Create Poli');
         expect(res.body).to.have.property('data');
         poliId = res.body.data.id
         done();
      })
  })
  it('Should Give error when create new Poli without auth', function(done) {
    chai.request(app)
      .post('/poli')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
  it('Should Update Poli', function(done) {
    chai.request(app)
      .put(`/poli/${poliId}`)
      .set('token', token)
      .set('otoritas','edit_poli')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Update Poli');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Delete a Poli', function(done) {
    chai.request(app)
      .del(`/poli/${poliId}`)
      .set('token', token)
      .set('otoritas','delete_poli')
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Delete Poli');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Give error when delete a Poli without auth', function(done) {
    chai.request(app)
      .del(`/poli/${poliId}`)
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
})

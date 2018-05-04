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

var satuanId
describe('Satuan Crud', function() {
  it('Should create new Satuan', function(done) {
    chai.request(app)
      .post('/satuan')
      .set('token', token)
      .set('otoritas','create_satuan')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(201);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Create Satuan');
         expect(res.body).to.have.property('data');
         satuanId = res.body.data.id
         done();
      })
  })
  it('Should Give error when create new Satuan without auth', function(done) {
    chai.request(app)
      .post('/satuan')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
  it('Should Update Satuan', function(done) {
    chai.request(app)
      .put(`/satuan/${satuanId}`)
      .set('token', token)
      .set('otoritas','edit_satuan')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Update Satuan');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Delete a Satuan', function(done) {
    chai.request(app)
      .del(`/satuan/${satuanId}`)
      .set('token', token)
      .set('otoritas','delete_satuan')
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Delete Satuan');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Give error when delete a Satuan without auth', function(done) {
    chai.request(app)
      .del(`/satuan/${satuanId}`)
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
})

var ruanganId
describe('Ruangan Crud', function() {
  it('Should create new Ruangan', function(done) {
    chai.request(app)
      .post('/ruangan')
      .set('token', token)
      .set('otoritas','create_ruangan')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(201);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Create Ruangan');
         expect(res.body).to.have.property('data');
         ruanganId = res.body.data.id
         done();
      })
  })
  it('Should Give error when create new Ruangan without auth', function(done) {
    chai.request(app)
      .post('/ruangan')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
  it('Should Update Ruangan', function(done) {
    chai.request(app)
      .put(`/ruangan/${ruanganId}`)
      .set('token', token)
      .set('otoritas','edit_ruangan')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Update Ruangan');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Delete a Ruangan', function(done) {
    chai.request(app)
      .del(`/ruangan/${ruanganId}`)
      .set('token', token)
      .set('otoritas','delete_ruangan')
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Delete Ruangan');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Give error when delete a Ruangan without auth', function(done) {
    chai.request(app)
      .del(`/ruangan/${ruanganId}`)
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
})

var kasId
describe('Kas Crud', function() {
  it('Should create new Kas', function(done) {
    chai.request(app)
      .post('/kas')
      .set('token', token)
      .set('otoritas','create_kas')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(201);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Create Kas');
         expect(res.body).to.have.property('data');
         kasId = res.body.data.id
         done();
      })
  })
  it('Should Give error when create new Kas without auth', function(done) {
    chai.request(app)
      .post('/kas')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
  it('Should Update Kas', function(done) {
    chai.request(app)
      .put(`/kas/${kasId}`)
      .set('token', token)
      .set('otoritas','edit_kas')
      .send({ name: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Update Kas');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Delete a Kas', function(done) {
    chai.request(app)
      .del(`/kas/${kasId}`)
      .set('token', token)
      .set('otoritas','delete_kas')
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Delete Kas');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Give error when delete a Kas without auth', function(done) {
    chai.request(app)
      .del(`/kas/${kasId}`)
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
})

var penjaminId
describe('Penjamin Crud', function() {
  it('Should create new Penjamin', function(done) {
    chai.request(app)
      .post('/penjamin')
      .set('token', token)
      .set('otoritas','create_penjamin')
      .send({ nama: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(201);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Create Penjamin');
         expect(res.body).to.have.property('data');
         penjaminId = res.body.data.id
         done();
      })
  })
  it('Should Give error when create new Penjamin without auth', function(done) {
    chai.request(app)
      .post('/penjamin')
      .send({ nama: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
  it('Should Update Penjamin', function(done) {
    chai.request(app)
      .put(`/penjamin/${penjaminId}`)
      .set('token', token)
      .set('otoritas','edit_penjamin')
      .send({ nama: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Update Penjamin');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Delete a Penjamin', function(done) {
    chai.request(app)
      .del(`/penjamin/${penjaminId}`)
      .set('token', token)
      .set('otoritas','delete_penjamin')
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Delete Penjamin');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Give error when delete a Penjamin without auth', function(done) {
    chai.request(app)
      .del(`/penjamin/${penjaminId}`)
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
})

var supplierId
describe('Supplier Crud', function() {
  it('Should create new Supplier', function(done) {
    chai.request(app)
      .post('/supplier')
      .set('token', token)
      .set('otoritas','create_supplier')
      .send({ nama: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(201);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Create Supplier');
         expect(res.body).to.have.property('data');
         supplierId = res.body.data.id
         done();
      })
  })
  it('Should Give error when create new Supplier without auth', function(done) {
    chai.request(app)
      .post('/supplier')
      .send({ nama: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
  it('Should Update Supplier', function(done) {
    chai.request(app)
      .put(`/supplier/${supplierId}`)
      .set('token', token)
      .set('otoritas','edit_supplier')
      .send({ nama: faker.internet.userName()})
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Update Supplier');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Delete a Supplier', function(done) {
    chai.request(app)
      .del(`/supplier/${supplierId}`)
      .set('token', token)
      .set('otoritas','delete_supplier')
      .end(function(err, res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Success Delete Supplier');
         expect(res.body).to.have.property('data');
         done();
      })
  })
  it('Should Give error when delete a Supplier without auth', function(done) {
    chai.request(app)
      .del(`/supplier/${supplierId}`)
      .end(function(err, res) {
         expect(res).to.have.status(403);
         expect(res).to.be.json;
         expect(res.body).to.have.property('message');
         expect(res.body.message).to.equal('Invalid Token');
         done();
      })
  })
})

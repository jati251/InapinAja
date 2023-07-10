const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const {getToken}=require('../helpers/')

let lodging=require('./lodging.json')
lodging.forEach(el => {
    delete el.id
  });

let token
  
beforeAll(async () => {
   
    await sequelize.queryInterface.bulkInsert('Users', [
        {
            username: 'jati251',
            email: 'jati.suryo@gmail.com',
            password: '12345678',
            role:'Customer',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);

    token=getToken({ id: 1 })

    await sequelize.queryInterface.bulkInsert('Types', [{
        name: 'room',
        createdAt: new Date(),
        updatedAt: new Date()
    }
    ]);
    
    await sequelize.queryInterface.bulkInsert('Lodgings', lodging);

    await sequelize.queryInterface.bulkInsert('WishLists', [
        {
            userId:1,
            lodgingId:2,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            userId:1,
            lodgingId:1,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);
})

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete('Lodgings', null, {
        restartIdentity: true,
        cascade: true,
        truncate: true,
    });

    await sequelize.queryInterface.bulkDelete('Types', null, {
        restartIdentity: true,
        cascade: true,
        truncate: true,
    });

    await sequelize.queryInterface.bulkDelete('Users', null, {
        restartIdentity: true,
        cascade: true,
        truncate: true,
    });

    await sequelize.queryInterface.bulkDelete('WishLists', null, {
        restartIdentity: true,
        cascade: true,
        truncate: true,
    });
})

describe("GET /wishlist", () => {
    it("should get all wishlist with id and return 200", async () => {

        const response = await request(app)
        .get('/inapinaja/wishlist')
        .set('access_token', token)
        expect(response.status).toBe(200)
    })

})

describe("POST /wishlist", () => {
    it("should create wishlist with id and return 201", async () => {
        const body={
           id:4
        }
        const response = await request(app)
        .post('/inapinaja/wishlist')
        .set('access_token', token)
        .send(body)
       
        expect(response.status).toBe(201)
    })

    it("should dont create wishlist with id not found and return 404", async () => {
        const body={
            id:21
        }
        const response = await request(app)
        .post('/inapinaja/wishlist')
        .set('access_token', token)
        .send(body)
        
        expect(response.status).toBe(404)
    })

    it("should dont create wishlist because no login and return 401", async () => {
        const body={
            id:19
        }
        const response = await request(app)
        .post('/inapinaja/wishlist')
        .send(body)
        
        expect(response.status).toBe(401)
    })

    it("should dont create wishlist because invalid token and return 401", async () => {
        const body={
            id:21
        }
        const response = await request(app)
        .post('/inapinaja/wishlist')
        .set('access_token', '12312d1d12')
        .send(body)
        
        expect(response.status).toBe(401)
    })

})


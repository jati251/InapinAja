const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')

let lodging=require('./lodging.json')
lodging.forEach(el => {
    delete el.id
  });
  
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

    await sequelize.queryInterface.bulkInsert('Types', [{
        name: 'room',
        createdAt: new Date(),
        updatedAt: new Date()
    }
    ]);
    
    await sequelize.queryInterface.bulkInsert('Lodgings', lodging);
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
})

describe("GET /lodging", () => {
    it("should get all lodging and return 200", async () => {

        const response = await request(app).get('/inapinaja/lodging')
        expect(response.status).toBe(200)
    })

    it("should get all lodging filter type and return 200", async () => {

        const response = await request(app).get('/inapinaja/lodging?type=1')
        expect(response.status).toBe(200)
    })

    it("should get all lodging page 1 and return 200", async () => {
        let bodyData={
            page:1
        }
        const response = await request(app).get('/inapinaja/lodging?type=1').send(bodyData)
        expect(response.status).toBe(200)
    })

    it("should get lodging with id and return 200", async () => {

        const response = await request(app).get('/inapinaja/lodging/1')
        expect(response.status).toBe(200)
    })

    it("should dont get lodging with id and return 404", async () => {

        const response = await request(app).get('/inapinaja/lodging/100')
        expect(response.status).toBe(404)
    })
})


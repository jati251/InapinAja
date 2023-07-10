const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const {hashPassword}=require('../helpers')


beforeAll(async () => {
    await sequelize.queryInterface.bulkInsert('Users', [
        {
            username: 'jati251',
            email: 'jati.suryo@gmail.com',
            password: hashPassword('12345678'),
            role:'Customer',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);
})

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete('Users', null, {
        restartIdentity: true,
        cascade: true,
        truncate: true,
    });
})

describe("POST /register", () => {
    it("should create new user and return 201", async () => {
        const bodyData = {
            username: 'alalala',
            email: 'jati.alala@gmail.com',
            password: '12345678',
            role:'Customer',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const response = await request(app).post('/inapinaja/register').send(bodyData)
        expect(response.status).toBe(201)
    })

    it("should have empty email and return 400", async () => {
        const bodyData = {
            username: 'asdsadas',
            email: '',
            password: '12345678',
            role:'Customer',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const response = await request(app).post('/inapinaja/register').send(bodyData)
        expect(response.status).toBe(400)
    })

    it("should have empty password and return 400", async () => {
        const bodyData = {
            username: 'asdsadas',
            email: 'jati.suryo@gmail.com',
            password: '',
            role:'Customer',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const response = await request(app).post('/inapinaja/register').send(bodyData)
        expect(response.status).toBe(400)
    })

    it("should already email and return 409", async () => {
        const bodyData = {
            username: 'asdsadas',
            email: 'jati.suryo@gmail.com',
            password: '12345678',
            role:'Customer',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const response = await request(app).post('/inapinaja/register').send(bodyData)
        expect(response.status).toBe(409)
    })

    it("should already email and return 400", async () => {
        const bodyData = {
            username: 'asdsadas',
            email: 'jati.suryo',
            password: '12345678',
            role:'Customer',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const response = await request(app).post('/inapinaja/register').send(bodyData)
        expect(response.status).toBe(400)
    })
})

describe('POST /login', ()=>{
    it("should login and return 200", async () => {
        const bodyData = {
            email: 'jati.suryo@gmail.com',
            password: '12345678'
        }

        const response = await request(app).post('/inapinaja/login').send(bodyData)
        expect(response.status).toBe(200)
    })

    it("should have wrong password and return 401", async () => {
        const bodyData = {
            email: 'jati.suryo@gmail.com',
            password: '2413r'
        }

        const response = await request(app).post('/inapinaja/login').send(bodyData)
        expect(response.status).toBe(401)
    })

    it("should have no email in database and return 401", async () => {
        const bodyData = {
            email: 'jaasadati.suryo@gmail.com',
            password: '2413r'
        }

        const response = await request(app).post('/inapinaja/login').send(bodyData)
        expect(response.status).toBe(401)
    })
})

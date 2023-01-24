const supertest = require("supertest")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

const app = require("../index")

const API_TEST_URL = process.env.API_TEST_URL;


beforeAll((done) => {
    mongoose.connect(API_TEST_URL);
    mongoose.connection.on('connected', async () => {
        console.log('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Error connecting to MongoDB', err);
    })
    done()
})

afterAll((done) => {
    mongoose.connection.close(done);
})

test('Sign Up', async () => {
    const userData = {
        first_name: "ramadan",
        last_name: "ramadan",
        email: "ramadan@gmail.com",
        password: "ramadan12345"
    }
    const res = await supertest(app).post("/auth/signup").set("content-type", "application/x-www-form-urlencoded").send(userData)
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe("success")
    expect(res.ok).toBe(true)
})


test('Log In', async () => {
    const userData = {
        email: "ramadan@gmail.com",
        password: "ramadan12345"
    }
    const res = await supertest(app).post("/auth/login").set("content-type", "application/x-www-form-urlencoded").send(userData)
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe("success")
    expect(res.ok).toBe(true)
})


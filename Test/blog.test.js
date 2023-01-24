const supertest = require("supertest")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

const app = require("../index")

const API_TEST_URL = process.env.API_TEST_URL;
const TEST_TOKEN = process.env.TEST_TOKEN;


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

test("Get all blogs", async () => {
    const res = await supertest(app).get("/blogs")
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe("success")
    expect(res.ok).toBe(true)
})

test("Get single blogs", async () => {
    const res = (await supertest(app).get("/blogs/637111b7b48d63a8c050ab2d").set("Authorization", `Bearer ${TEST_TOKEN}`))
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe("success")
    expect(res.ok).toBe(true)   
})

test("Get Published blogs", async () => {
    const res = (await supertest(app).get("/blogs/published"))
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe("success")
    expect(res.ok).toBe(true)
})

test("Create a blog", async () => {
    const data = {
        "title": "another another blog title",
        "body": "another blog 2 body",
        "tags": "another blog 2 tags",
        "author": "ramadan1234",
        "author_id": "6368f016fa770ead99ec50a5"
    }

    const res = await supertest(app).post("/blogs").set("Authorization", `Bearer ${TEST_TOKEN}`).send(data)
    expect(res.statusCode).toBe(201)
    expect(res.body.status).toBe("success")
    expect(res.ok).toBe(true)
    })

    test("Update a blog", async () => {
        const data = {
            "state": "published"
          }
    
        const res = await supertest(app).put("/blogs/owner/637112b786145aae3e47b2d4").set("Authorization", `Bearer ${TEST_TOKEN}`).send(data)
        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe("success")
        expect(res.ok).toBe(true)
        })
    

        test("Get Owner blogs", async () => {
            const res = await supertest(app).get("/blogs/owner/637112b786145aae3e47b2d4").set("Authorization", `Bearer ${TEST_TOKEN}`)
            expect(res.statusCode).toBe(200)
            expect(res.body.status).toBe("success")
            expect(res.ok).toBe(true)
            })


    test("Delete a blog", async () => {
        const res = await supertest(app).delete("/blogs/owner/637111b7b48d63a8c050ab2d").set("Authorization", `Bearer ${TEST_TOKEN}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe("success")
        expect(res.ok).toBe(true)
        })
        
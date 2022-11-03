const request = require("supertest");
const { It, Expect } = require('./utilities');
const { JwtService } = require('../app/services/jwt/JwtService');

describe("GET /", () => {
    const app = process.testSetup.app;

    const req = () => request(app).get("/");
    
    It.ShouldReturnStatus(req,403);
    
    it("should do something unqiue ... ", async () => {
        await req().then(res => {
            expect(true);
        });
    });

});



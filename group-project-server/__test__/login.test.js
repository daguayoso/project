const supertest = require('supertest')
const loginService = require('../routes/login');

const app = require('express');



describe ('login', ()=>{

    describe ('sign in (GET)', ()=>{

        it ("should return status code 200", async () =>{
        await supertest(app).get('/login/register').expect(200)
        });
        
    })
})
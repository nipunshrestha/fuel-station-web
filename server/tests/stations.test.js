/**
 * @jest-environment node
 */

 const mongoose = require('mongoose') 
 const supertest = require('supertest')
 const fs = require('fs')
 const app = require('../app')
 const users = require('../models/users')
  
 const api = supertest(app)
 
 describe('api', () => {
   
   test('Check for actual station location existance', async () => {
     await api.get('/api/stations/972')
     .expect(200)  
     .then((res) => {
        expect(res.headers['content-length']).not.toBe("0")
    })
   })

   test('No content for a station that does not exist', async () => {
    await api.get('/api/stations/312321123')
    // .expect(response => {response.headers['content-length']}).
    .expect(200)
    .then((res) => {
        expect(res.headers['content-length']).toEqual("0")
    })
    
    // expect(api.header['content-length']).toBe(0)
  })
 
 
   afterAll(async () => {
     await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
     mongoose.connection.close()
   });
   
 
 })
 
/**
 * @jest-environment node
 */

 const mongoose = require('mongoose') 
 const supertest = require('supertest')
 const fs = require('fs')
 const app = require('../app')
 const users = require('../models/users')
  
 const api = supertest(app)
 
 describe('Testing all fuel types (in sphagetti like fashion)', () => {
 
 
   test('E10', async () => {
     await api.get('/api/prices/fuel/E10')
     .expect(200);
   })
   
   test('95', async () => {

    const response = await api.get('/api/prices/fuel/95')
    .expect(200);
  })

  test('98', async () => {
     await api.get('/api/prices/fuel/98')
     .expect(200);
   })
   
   test('Diesel', async () => {
    const response = await api.get('/api/prices/fuel/Diesel')
    .expect(200);
  })
   
 
   afterAll(async () => {
     await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
     mongoose.connection.close()
   });
   
 
 })
 
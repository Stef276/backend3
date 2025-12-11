import request from 'supertest';
import app from '../src/app.js';
import mongoose from 'mongoose';
import UserModel from '../src/models/user.model.js';
import PetModel from '../src/models/pet.model.js';

describe("Adoption API", ()=>{
  beforeAll(async ()=>{
    await mongoose.connect("mongodb://localhost:27017/mocksDB_test");
    await UserModel.deleteMany({});
    await PetModel.deleteMany({});
  });
  afterAll(async ()=>{ await mongoose.connection.close(); });

  it("should adopt a pet", async()=>{
    const user = await UserModel.create({firstName:"a", lastName:"b", email:"a@b.com"});
    const pet = await PetModel.create({name:"p", species:"dog"});
    const res = await request(app).post(`/api/adoption/${user._id}/adopt/${pet._id}`);
    expect(res.status).toBe(200);
  });

  it("should fail for invalid user", async()=>{
    const pet = await PetModel.create({name:"p2", species:"cat"});
    const res = await request(app).post(`/api/adoption/123/adopt/${pet._id}`);
    expect(res.status).toBe(404);
  });
});

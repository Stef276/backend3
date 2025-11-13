import { Router } from "express";
import { generateUsers } from "../utils/mocking.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";
import PetModel from "../models/pet.model.js";

const router = Router();

router.get("/mockingpets", (req, res) => {
  const pets = [];

  for (let i = 0; i < 10; i++) {
    pets.push({
      name: faker.animal.petName(),
      species: faker.animal.type(),
      adopted: faker.datatype.boolean(),
    });
  }

  res.status(200).json({
    status: "success",
    payload: pets,
  });
});

router.get("/mockingusers", async (req, res) => {
  try {
    const users = await generateUsers(50);
    res.status(200).json({
      status: "success",
      payload: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Error generating users" });
  }
});

router.post("/generateData", async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const mockUsers = await generateUsers(users);
    const mockPets = Array.from({ length: pets }).map(() => ({
      name: faker.animal.petName(),
      species: faker.animal.type(),
      adopted: false,
    }));

    const insertedUsers = await UserModel.insertMany(mockUsers);
    const insertedPets = await PetModel.insertMany(mockPets);

    res.status(201).json({
      status: "success",
      message: "Data generated and inserted successfully",
      usersInserted: insertedUsers.length,
      petsInserted: insertedPets.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Error generating data" });
  }
});

export default router;

import { Router } from "express";
import UserModel from "../models/user.model.js";
import PetModel from "../models/pet.model.js";

const router = Router();

// adopt pet
router.post("/:userId/adopt/:petId", async (req,res)=>{
  const {userId, petId}=req.params;
  const user = await UserModel.findById(userId);
  const pet = await PetModel.findById(petId);
  if(!user || !pet) return res.status(404).json({error:"Not found"});
  pet.owner = user._id;
  await pet.save();
  return res.json({status:"ok"});
});

// list pets of user
router.get("/:userId", async (req,res)=>{
  const user = await UserModel.findById(req.params.userId);
  if(!user) return res.status(404).json({error:"User not found"});
  const pets = await PetModel.find({owner:user._id});
  res.json(pets);
});

export default router;

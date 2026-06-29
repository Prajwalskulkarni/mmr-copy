import express from 'express';
import {database} from '../db/config.js';


export const department = express.Router();

department.post("/addDepartment" ,async (req,res)=>{
    const{name}=req.body;
    if(!name){
        return res.status(400).json({error:"Department name is required"});
    }   
    const[response]=await database.query("INSERT INTO department(name)VALUES(?)",[name]);
    return res.status(200).json({message:"Department addedd successfully",departmentId:response.insertId});
});

department.get("/getDepartments",async(req,res)=>{
    const[response]=await database.query("SELECT * FROM department");
    return res.status(200).json({departments:response});
} );

department.get("/getDepartment/:name",async(req,res)=>{
    try{
        const{name}=req.params;
        const[response]=await database.query("SELECT * FROM department WHERE name =?",[name])
;
return res.status(200).json({department:response[0]});
    } catch(error){
        return res.status(500).json({error:"Internal server error"});
        }
})
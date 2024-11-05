const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const checkDocAuth = require("../middleware/check-docAuth");

const Supplier = require('../models/supplier');

router.post("",checkAuth,(req,res,next)=>{
  const supplier = new Supplier({
    supplierID: req.body.supplierID,
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    drugsAvailable: req.body.drugsAvailable
  });
  supplier.save().then(createdSupplier=>{
  res.status(201).json({
    message:'Supplier Added Successfully',
    supplierId : createdSupplier._id
  });

  });

  });

  router.put("/:id", checkAuth, (req, res, next) => {
    const updatedFields = {
      supplierID: req.body.supplierID,
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      drugsAvailable: req.body.drugsAvailable
    };
  
    Supplier.updateOne({ _id: req.params.id }, { $set: updatedFields }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Update Successful!" });
    }).catch(error => {
      console.error(error);
      res.status(500).json({ message: "Update failed!" });
    });
  });
  

  router.get("",(req,res,next)=>{
    Supplier.find().then(documents=>{
      res.status(200).json({
        message : 'supplier added sucessfully',
        suppliers :documents
      });
    });
  });


  router.get("/:id",(req,res,next)=>{
    Supplier.findById(req.params.id).then(supplier =>{
      if(supplier){
        res.status(200).json(supplier);
      }else{
        res.status(200).json({message:'suplier not found'});
      }
    });
  });

  router.delete("/:id", checkAuth,(req, res, next) => {
    Supplier.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: 'Supplier deleted!' });
    });
  });

  module.exports = router;

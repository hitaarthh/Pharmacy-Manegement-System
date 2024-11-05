const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
// var handlebars = require('handlebars');
// var fs = require('fs');

const DoctorOder = require('../models/doctorOders');


router.post("",(req,res,next)=>{
  const docOder = new DoctorOder({
    doctorName: req.body.doctorName,
    doctorContact: req.body.doctorContact,
    doctorID: req.body.doctorId,
    doctorEmail: req.body.doctorEmail,
    drugId: req.body.drugId,
    drugNames: req.body.drugName,
    drugPrice: req.body.drugPrice,
    drugQuantity: req.body.drugQuantity,
    realQuantity: req.body.realQuantity,
    totalAmount: req.body.totalAmount,
    pickupDate: req.body.pickupDate
  });
  docOder.save().then(createdDocOder=>{
  res.status(201).json({
    message:'Doctor Oder Added Successfully',
    doctorOderId : createdDocOder._id
  });

  });

  });

  router.get("",(req,res,next)=>{
    DoctorOder.find().then(documents=>{
      res.status(200).json({
        message : 'Doctor oder added sucessfully',
        doctorOders :documents
      });
    });
  });

  router.delete("/:id", (req, res, next) => {
    DoctorOder.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: 'Doctor order deleted!' });
    });
  });

  router.get("/:id", (req, res, next) => {
    DoctorOder.findById(req.params.id).then(order => {
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ message: "Order not found!" });
      }
    }).catch(error => {
      res.status(500).json({
        message: "Fetching order failed!",
        error: error
      });
    });
  });
  

  module.exports = router;

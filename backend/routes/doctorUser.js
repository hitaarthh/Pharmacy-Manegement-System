const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkDocAuth = require("../middleware/check-docAuth");

const DoctorUser = require('../models/doctorUser');

router.get("/", (req, res, next) => {
  DoctorUser.find().then(documents => {
    res.status(200).json({
      message: 'Doctor users fetched successfully!',
      doctorUsers: documents
    });
  });
});

router.post("/doctorSignup",(req,res,next)=>{

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const doctorUser = new DoctorUser({
        name : req.body.name,
        contact : req.body.contact,
        docId : req.body.docId,
        email : req.body.email,
        password : hash
      });

      doctorUser.save()
        .then(result =>{
          res.status(201).json({
            message : 'Doctor Account created!',
            result: result
          });
        })

        .catch(err =>{
          res.status(500).json({
            error :err
          });
        });
    })

});


router.post("/doctorLogin" , (req, res ,  next)=>{
  let fetchedUser;
  DoctorUser.findOne({email: req.body.email}).then(user=>{
    if(!user){
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    fetchedUser=user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result =>{
    if(!result){
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email , userId : fetchedUser ._id, name:fetchedUser.name, contact:fetchedUser.contact , docId:fetchedUser.docId} ,
      'this_is_the_webToken_secret_key' ,
      { expiresIn : "1h"}
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        name: fetchedUser.name,
        email: fetchedUser.email,
        contact: fetchedUser.contact,
        docId: fetchedUser.docId,
      });
  })
  .catch(err =>{
    return res.status(401).json({
      message: "Auth failed"
    });
  });
})

router.get("/getDoctorUserData",(req,res,next)=>{
  DoctorUser.find().then(documents=>{
    res.status(200).json({
      message : 'Doctor added sucessfully',
      doctors :documents
    });
  });
});

router.get("/:docId", (req, res, next) => {
  DoctorUser.findOne({ docId: req.params.docId }).then(doctor => {
    if (doctor) {
      res.status(200).json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  });
});


router.put("/:docId", (req, res, next) => {
  DoctorUser.updateOne({ docId: req.params.docId }, {
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact
  })
  .then(result => {
    res.status(200).json({ message: "Update doctor Successful!" });
  })
  .catch(err => {
    res.status(500).json({ error: err });
  });
});


router.delete("/:docId", (req, res, next) => {
  DoctorUser.deleteOne({ docId: req.params.docId }).then(result => {
    res.status(200).json({ message: 'Doctor deleted!' });
  });
});


router.get("/shoppingcart",(req,res,next)=>{

  console.log("sdfkjashdfjh");
});


module.exports = router;

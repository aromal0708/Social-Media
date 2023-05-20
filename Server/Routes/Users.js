const { Router } = require("express");

const router = require("express").Router();

router.get("/",(req,res) =>{
    res.send("Its User route")
})

module.exports = router


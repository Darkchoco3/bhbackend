// const { Console } = require("console");
const USER = require("../model/userModel");
// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");
//OWN ACCOUNT
const getBioProfile = async (req, res) => {
  const { userId } = req.user;
  try {
    let user = await USER.findById({ _id: userId })
      .select("-password")
      .populate("followers", "_id username profilePhoto")
      .populate("following", "_id username profilePhoto");
    if (!user) {
      res.status(404).json({ success: "false", message: "user not found" });
      return;
    }
    res.status(200).json({
      success: "true",
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};



//get acct
module.exports = {
  getBioProfile,
};

const express = require ("express");
const {getBioProfile} = require('../Controllers/userController');
const router = express.Router();
const authMiddleWare = require("../middlewares/auth")

//search users
// router.get("/search" ,searchUsers)
// own account
router.get('/' , authMiddleWare, getBioProfile);
//follower user
// router.post("/follow/:followersId" , authMiddleWare,followUser)
// unfollow user
// router.post("/unfollow/:followerId", authMiddleWare,unfollowUser);
// single user
// router.get("/userprofile/:userId", getSingleUser)
// all users
// router.get("/all" ,getAllUsers)
// update user profile
// router.patch('/update-profile', authMiddleWare,updateUserProfile)

module.exports = router
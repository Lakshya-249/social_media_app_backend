import { Router } from "express";
import { createUser } from "./user/createuser";
import { followuser, unfollowuser } from "./user/followuser";
import { sendmessage } from "./message/message";
import { posts } from "./posts/post";
import { deletePost } from "./posts/deletepost";
import { profile } from "./user/profile";
import { updateprofile } from "./user/updateprofile";
import { updatepost } from "./posts/updatepost";
import { deletemsg } from "./message/deletemsg";
import { getmessage, getuserfromMsg } from "./message/getmessage";
import { getmyposts } from "./posts/getmypost";
import { getuserposts } from "./posts/getuserposts";
import { postcomment } from "./comment/postcomment";
import { updatecomment } from "./comment/updatecomment";
import { deletecomment } from "./comment/deletecomment";
import { getcomments } from "./comment/getcomments";
import { deletelike, likepost } from "./likes/likes";
import { getuserlikes, ifLiked } from "./likes/getlikes";
import { getmystory, getuserstory } from "./Story/getstory";
import { deleteStory, postStory } from "./Story/storypost";
import {
  getallfollowers,
  getallfollowing,
  getfollowedUser,
  getusername,
} from "./user/getuser";

const router = Router();

router.get("/getmessage", getmessage);
router.get("/getpost", getmyposts);
router.get("/getuserpost", getuserposts);
router.get("/getcomment", getcomments);
router.get("/getlikes", getuserlikes);
router.get("/checklike", ifLiked);
router.get("/getuserstory", getuserstory);
router.get("/getstory", getmystory);
router.get("/getusermsg", getuserfromMsg);
router.get("/getallfollowers", getallfollowers);
router.get("/getallfollowing", getallfollowing);
router.get("/getfolloweduser", getfollowedUser);
router.get("/getusername", getusername);

router.post("/createuser", createUser);
router.post("/follow", followuser);
router.post("/message", sendmessage);
router.post("/post", posts);
router.post("/createprofile", profile);
router.post("/postcomment", postcomment);
router.post("/likepost", likepost);
router.post("/poststory", postStory);

router.put("/updateprofile", updateprofile);
router.put("/updatepost", updatepost);
router.put("/updatecomment", updatecomment);

router.delete("/deletePost", deletePost);
router.delete("/deletemessage", deletemsg);
router.delete("/deletecomment", deletecomment);
router.delete("/deletelike", deletelike);
router.delete("/deletestory", deleteStory);
router.delete("/unfollowuser", unfollowuser);

export default router;

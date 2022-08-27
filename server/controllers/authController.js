import user from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createuser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const count = await user.countDocuments({ email: email });
    console.log(count);
    if (count === 0) {
      const hashpassword = await bcrypt.hash(password, 12);
      const user1 = await user.create({
        email: email,
        password: hashpassword,
        firstName: firstName,
        lastName: lastName,
      });
      const user_token = jwt.sign(
        { email: user1.email, id: user1._id },
        "murali",
        { expiresIn: "1h" }
      );

      return res.status(200).json({ user1, user_token });
    }
    return res.status(200).json({ message: `user with given eamil is exists` });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Failed to create the user data" });
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
 try {
  const userData = user
  .findOne({ email: email })
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error);
  });
console.log(userData);
const hashpassword = await bcrypt.hash(password, 12);
const checkPasswordMatch = await bcrypt.compare(password, hashpassword);
if (checkPasswordMatch) {
  const user_token = jwt.sign(
    { email: userData.email, id: userData._id },
    "murali",
    { expiresIn: "1h" }
  );
  return res.status(200).json({ userData,user_token})
} else {
  return res.status(400).json({message:`invalid password`})
}
 } catch (error) {
  console.log('error')
  return res.status(400).json({message:`failed to login`})
 }
};
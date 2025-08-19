// import jwt from "jsonwebtoken";

// // Function to generate a token for a user
// export const generateToken = (userld)=>{
// const token = jwt.sign({userld}, process.env.JWT_SECRET); I
// return token;

// }

import jwt from "jsonwebtoken";

// ✅ Correct: use "userId" with a capital I
export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
  return token;
};

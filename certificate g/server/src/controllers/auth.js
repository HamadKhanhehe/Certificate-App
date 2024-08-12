import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from 'nodemailer';


// Register User

export const register = async (req,res) => {
try{
    const {
        firstName,
        lastName,
        email,
        password,
        role
    } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashPassword,
        role,
    })
    const savedUser = await newUser.save()
    res.status(201).json(savedUser);
} catch (err) {
res.status(500).json({error: err.message});
}
}



/* LOGGING IN */
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };







export const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Email does not exist" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
      }
    });

    const mailOptions = {
      from: process.env.USER_EMAIL, // Sender's email address
      to: user, // Recipient's email address (user's email)
      subject: 'RESET PASSWORD EMAIL',
      text: `Reset your password using this link: http://localhost:3002/auth/fpswd`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error sending email" });
      } else {
        console.log('Email sent: ' + info.response);
        return res.json({ msg: "Email sent successfully", info });
      }
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};



// give permission
export const givePermission = async (req,res) => {
  const { userId, hasPermission } = req.body;
  try {
    // Find the user and update the permission
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.hasPermission = hasPermission;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update permission' });
  }
};


//all users
export const allUser = async (req,res) => {
  try {  
    const users2 = await User.find({role: 'user'});
  res.status(200).json(users2);
  } catch (error) {
    res.status(500).json({error: 'failed to fetch users' })
  }
}
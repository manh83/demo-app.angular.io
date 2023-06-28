import User from "../models/user";
import { signupSchema, signinSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import Cart from '../models/cart'

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const { error } = signupSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(401).json({
        message: errors,
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ _id: user._id }, "manhcx", { expiresIn: "1h" });

    user.password = undefined;
    return res.status(201).json({
      message: "User created successfully",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message
    })
  }
};

export const signin = async function (req, res) {
  try {
    const { email, password } = req.body;
    const { error } = signinSchema.validate(
      { email, password },
      { abortEarly: false }
    );
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Tài khoản không tồn tại",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Mật khẩu không đúng",
      });
    }

    // Kiểm tra nếu người dùng chưa có giỏ hàng
    if (!user.cart) {
      const cart = await Cart.create({ products: [] });
      user.cart = cart._id;
      await user.save();
    }

    const token = jwt.sign({ _id: user._id }, "manhcx", { expiresIn: "1h" });
    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
     return res.status(500).json({
      message: error.message
     })
  }
};

const generateNewPassword = () => {
  const length = 8;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let newPassword = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    newPassword += charset.charAt(randomIndex);
  }

  return newPassword;
};


// kiểm tra email và lấy lại mật khẩu
// const sendResetPasswordEmail = async (email, resetToken) => {
//   try {
//     // Cấu hình Nodemailer để gửi email
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'your-email@example.com',
//         pass: 'your-email-password',
//       },
//     });

//     // Tạo nội dung email
//     const mailOptions = {
//       from: 'your-email@example.com',
//       to: email,
//       subject: 'Reset Password',
//       html: `<p>Click the following link to reset your password: <a href="your-website.com/reset-password?token=${resetToken}">Reset Password</a></p>`,
//     };

//     // Gửi email
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.log('Error sending email:', error);
//   }
// };

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'Email không tồn tại!',
      });
    }

    // Generate a new password
    const newPassword = generateNewPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();


    return res.status(200).json({
      message: 'Lấy lại mật khẩu thành công',
      newPassword
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred',
      error: error.message,
    });
  }
};


// ĐỔI MẬT KHẨU
export const changePassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;

    // Xác thực người dùng
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'Email không tồn tại!',
      });
    }

    // Kiểm tra xác thực mật khẩu hiện tại
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Mật khẩu hiện tại không chính xác',
      });
    }

    // Tạo mật khẩu mới và cập nhật trong cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: 'Đổi mật khẩu thành công'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};





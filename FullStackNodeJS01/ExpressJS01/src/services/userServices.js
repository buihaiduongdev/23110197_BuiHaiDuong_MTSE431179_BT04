require("dotenv").config();
const { prisma } = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const createUserService = async (name, email, password, role = "User") => {
  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) return { EC: 1, EM: "Email đã tồn tại!" };

    const hashPassword = await bcrypt.hash(password, saltRounds);
    await prisma.user.create({
      data: { name, email, password: hashPassword, role: role || "User" },
    });
    return { EC: 0, EM: "Đăng ký thành công" };
  } catch (error) {
    console.log(error);
    return { EC: -1, EM: "Lỗi server" };
  }
};

const loginService = async (email, password) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { EC: 1, EM: "Email/Password không hợp lệ" };

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) return { EC: 2, EM: "Email/Password không hợp lệ" };

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return { EC: 0, access_token, user: payload };
  } catch (error) {
    console.log(error);
    return { EC: -1, EM: "Lỗi server" };
  }
};

const getUserService = async () => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    });
    return users;
  } catch (error) {
    return null;
  }
};

const forgotPasswordService = async (email, oldPassword, newPassword) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { EC: 1, EM: "Email không tồn tại trong hệ thống" };

    const isMatchPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isMatchPassword) return { EC: 2, EM: "Mật khẩu cũ không chính xác" };

    const hashPassword = await bcrypt.hash(newPassword, saltRounds);

    await prisma.user.update({
      where: { email },
      data: { password: hashPassword },
    });

    return { EC: 0, EM: "Đổi mật khẩu thành công!" };
  } catch (error) {
    console.log(error);
    return { EC: -1, EM: "Lỗi server" };
  }
};

module.exports = {
  createUserService,
  loginService,
  getUserService,
  forgotPasswordService,
};

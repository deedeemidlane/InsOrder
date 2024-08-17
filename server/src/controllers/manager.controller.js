import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";

export const getShopInfo = async (req, res) => {
  try {
    console.log(req.payload);

    if (req.payload.role !== "MANAGER") {
      return res
        .status(401)
        .json({ error: "Unauthorized - Not manager token" });
    }

    const shopInfo = await prisma.user.findUnique({
      where: {
        id: req.payload.id,
      },
      select: {
        name: true,
        username: true,
        shop: true,
      },
    });

    console.log(shopInfo);

    if (shopInfo) {
      res.status(200).json(shopInfo);
    } else {
      res.status(404).json({ error: "Không tìm thấy tài nguyên" });
    }
  } catch (error) {
    console.log("Error in getShopInfo controller: ", error.message);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};

export const createDish = async (req, res) => {
  try {
    console.log(req.payload);

    if (req.payload.role !== "MANAGER") {
      return res
        .status(401)
        .json({ error: "Unauthorized - Not manager token" });
    }

    const { name, image, price } = req.body;

    const newDish = await prisma.product.create({
      data: {
        name,
        price,
        image: "",
        status: true,
        shopId: req.payload.shopId,
      },
    });

    if (newDish) {
      res.status(201).json({ message: "Thêm món thành công!" });
    } else {
      res.status(400).json({ error: "Dữ liệu không hợp lệ" });
    }
  } catch (error) {
    console.log("Error in createDish controller: ", error.message);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};

export const getMenu = async (req, res) => {
  try {
    console.log(req.payload);

    if (req.payload.role !== "MANAGER") {
      return res
        .status(401)
        .json({ error: "Unauthorized - Not manager token" });
    }

    const products = await prisma.product.findMany({
      where: {
        shopId: req.payload.shopId,
      },
    });

    console.log(products);

    if (products) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ error: "Không tìm thấy tài nguyên" });
    }
  } catch (error) {
    console.log("Error in getMenu controller: ", error.message);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};

export const createStaffAccount = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      return res.status(400).json({ error: "Tên đăng nhập đã tồn tại" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
        role: "STAFF",
        shopId: req.payload.shopId,
      },
    });

    if (newUser) {
      res.status(201).json({ message: "Tạo tài khoản nhân viên thành công!" });
    } else {
      res.status(400).json({ error: "Dữ liệu không hợp lệ" });
    }
  } catch (error) {
    console.log("Error in createAccount controller: ", error.message);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};

export const getStaffs = async (req, res) => {
  try {
    console.log(req.payload);

    if (req.payload.role !== "MANAGER") {
      return res
        .status(401)
        .json({ error: "Unauthorized - Not manager token" });
    }

    const staffs = await prisma.user.findMany({
      where: {
        shopId: req.payload.shopId,
        role: "STAFF",
      },
    });

    console.log(staffs);

    if (staffs) {
      res.status(200).json(staffs);
    } else {
      res.status(404).json({ error: "Không tìm thấy tài nguyên" });
    }
  } catch (error) {
    console.log("Error in getStaffs controller: ", error.message);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};

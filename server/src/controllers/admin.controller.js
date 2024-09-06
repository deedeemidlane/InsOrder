import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";
import { removeVietnameseTones } from "../utils/removeVietnameseTones.js";

export function generateUrl(shopName) {
  return removeVietnameseTones(shopName.trim().toLowerCase()).replaceAll(
    " ",
    "-",
  );
}

export const createShop = async (req, res) => {
  try {
    if (req.payload.role !== "ADMIN") {
      return res.status(401).json({ error: "Unauthorized - Not admin token" });
    }

    const {
      shopName,
      accountNo,
      accountName,
      acqId,
      managerName,
      username,
      password,
    } = req.body;

    const shopUrl = generateUrl(shopName);

    // const shop = await prisma.shop.findUnique({ where: { shopUrl } });

    // if (shop) {
    //   return res.status(400).json({ error: "Tên cửa hàng đã tồn tại" });
    // }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newShop = await prisma.shop.create({
      data: {
        name: shopName,
        accountName,
        accountNo,
        acqId,
        shopUrl,
        active: true,
      },
    });

    if (newShop) {
      const newManager = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          name: managerName,
          role: "MANAGER",
          shopId: newShop.id,
        },
      });

      if (newManager) {
        res.status(201).json({ message: "Tạo cửa hàng thành công!" });
      } else {
        res.status(400).json({ error: "Dữ liệu không hợp lệ" });
      }
    } else {
      res.status(400).json({ error: "Dữ liệu không hợp lệ" });
    }
  } catch (error) {
    console.log("Error in createShop controller: ", error.message);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};

export const getShops = async (req, res) => {
  try {
    if (req.payload.role !== "ADMIN") {
      return res.status(401).json({ error: "Unauthorized - Not admin token" });
    }

    // const shops = await prisma.shop.findMany();

    // const shopsWithManagers = await prisma.shop.findMany({
    //   include: {
    //     users: {
    //       where: {
    //         role: "MANAGER",
    //       },
    //     },
    //   },
    // });

    const shopsWithManagers = await prisma.user.findMany({
      where: {
        role: "MANAGER",
      },
      select: {
        name: true,
        shop: true,
      },
    });

    if (shopsWithManagers) {
      res.status(200).json(shopsWithManagers);
    } else {
      res.status(404).json({ error: "Không tìm thấy tài nguyên" });
    }
  } catch (error) {
    console.log("Error in getShops controller: ", error.message);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};

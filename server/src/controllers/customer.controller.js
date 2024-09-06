import prisma from "../db/prisma.js";

export const placeOrder = async (req, res) => {
  try {
    const { customerName, tableNo, shopUrl, orderItems } = req.body;

    const shop = await prisma.shop.findFirst({
      where: { shopUrl },
    });

    const newOrder = await prisma.order.create({
      data: {
        customerName,
        tableNo,
        status: "PROCESSING",
        shopId: shop.id,
      },
    });

    if (newOrder) {
      const newItems = orderItems.map((item) => ({
        orderId: newOrder.id,
        productId: item.id,
        quantity: item.quantity,
      }));

      const newOrderItems = await prisma.orderItem.createMany({
        data: newItems,
      });

      if (newOrderItems) {
        res.status(200).json({ orderId: newOrder.id });
      } else {
        res.status(400).json({ error: "Có lỗi xảy ra" });
      }
    } else {
      res.status(400).json({ error: "Có lỗi xảy ra" });
    }
  } catch (error) {
    console.log("Error in placeOrder controller: ", error.message);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};

export const getMenu = async (req, res) => {
  try {
    const { shopUrl } = req.body;

    const shop = await prisma.shop.findFirst({ where: { shopUrl } });

    const products = await prisma.product.findMany({
      where: {
        shopId: shop.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (products) {
      res.status(200).json({ products: products, shopName: shop.name });
    } else {
      res.status(404).json({ error: "Không tìm thấy tài nguyên" });
    }
  } catch (error) {
    console.log("Error in getMenu controller: ", error.message);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};

export const getShopInfo = async (req, res) => {
  try {
    const { shopUrl } = req.body;

    const shop = await prisma.shop.findFirst({ where: { shopUrl } });

    if (shop) {
      res.status(200).json(shop);
    } else {
      res.status(404).json({ error: "Không tìm thấy tài nguyên" });
    }
  } catch (error) {
    console.log("Error in getShopInfo controller: ", error.message);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { orderId, shopUrl } = req.body;

    const shop = await prisma.shop.findFirst({ where: { shopUrl } });

    const order = await prisma.order.findUnique({
      where: { id: orderId, shopId: shop.id },
      include: { orderItems: true },
    });

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Đơn hàng không tồn tại hoặc đã bị xóa" });
    }
  } catch (error) {
    console.log("Error in getMenu controller: ", error.message);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};

import prisma from "../db/prisma.js";

export const getOrders = async (req, res) => {
  try {
    if (req.payload.role !== "STAFF") {
      return res.status(401).json({ error: "Unauthorized - Not staff token" });
    }

    const orders = await prisma.order.findMany({
      where: {
        shopId: req.payload.shopId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ error: "Không tìm thấy tài nguyên" });
    }
  } catch (error) {
    console.log("Error in getOrders controller: ", error.message);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    if (req.payload.role !== "STAFF") {
      return res.status(401).json({ error: "Unauthorized - Not staff token" });
    }

    const { orderId } = req.body;

    const order = await prisma.order.findFirst({ where: { id: orderId } });

    if (!order) {
      return res.status(404).json({ error: "Không tìm thấy tài nguyên" });
    }

    const currentStatus = order.status;

    if (currentStatus === "COMPLETED") {
      const deleteOrderItems = await prisma.orderItem.deleteMany({
        where: {
          orderId: orderId,
        },
      });

      if (deleteOrderItems) {
        const deleteOrder = await prisma.order.delete({
          where: {
            id: orderId,
          },
        });

        if (deleteOrder) {
          return res
            .status(200)
            .json({ message: "Đã xóa đơn hàng", nextStatus: "PROCESSING" });
        } else {
          return res.status(404).json({ error: "Xóa thất bại" });
        }
      } else {
        return res.status(404).json({ error: "Có lỗi xảy ra" });
      }
    }

    let nextStatus = "";

    switch (currentStatus) {
      case "PROCESSING":
        nextStatus = "CONFIRMED";
        break;
      case "CONFIRMED":
        nextStatus = "PREPARING";
        break;
      case "PREPARING":
        nextStatus = "COMPLETED";
        break;

      default:
        break;
    }

    const updateOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: nextStatus,
      },
    });

    if (updateOrder) {
      res
        .status(200)
        .json({ message: "Cập nhật thành công", nextStatus: nextStatus });
    } else {
      res.status(404).json({ error: "Cập nhật thất bại" });
    }
  } catch (error) {
    console.log("Error in updateOrderStatus controller: ", error.message);
    res.status(500).json({ error: "Lỗi hệ thống" });
  }
};

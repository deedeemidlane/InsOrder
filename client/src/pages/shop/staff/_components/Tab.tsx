import React from "react";

import {
  HandPlatter,
  HandCoins,
  AlarmClock,
  ChefHat,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import {
  formatDate,
  formatPriceInVND,
  formatTime,
} from "@/utils/helperFunctions";
import { Spinner } from "flowbite-react";
import { TOrder } from "../Staff";

const tabContent: {
  [key: string]: { title: string; color: string; button: React.JSX.Element };
} = {
  processing: {
    title: "Đơn hàng chờ xác nhận",
    color: "bg-yellow-300/60",
    button: (
      <>
        <HandCoins className="h-4 mr-1" />
        Xác nhận thanh toán
      </>
    ),
  },
  confirmed: {
    title: "Đơn hàng đã thanh toán",
    color: "bg-teal-400/60",
    button: (
      <>
        <ChefHat className="h-4 mr-1" />
        Chuẩn bị món
      </>
    ),
  },
  preparing: {
    title: "Đơn hàng đang chuẩn bị",
    color: "bg-red-500 text-white",
    button: (
      <>
        <HandPlatter className="h-4 mr-1" />
        Phục vụ
      </>
    ),
  },
  completed: {
    title: "Đơn hàng đã hoàn tất",
    color: "bg-green-500/80 text-white",
    button: (
      <>
        <Trash2 className="h-4 mr-1" />
        Xóa
      </>
    ),
  },
};

export default function Tab({
  orders,
  updateStatus,
  updateOrderLoading,
  tabValue,
  currentOrderId,
}: {
  orders: TOrder[] | undefined;
  updateStatus: (orderId: number) => void;
  updateOrderLoading: boolean;
  tabValue: string;
  currentOrderId: number | undefined;
}) {
  return (
    <Card x-chunk="dashboard-06-chunk-0" className="overflow-y-auto h-[80vh]">
      <CardHeader>
        <CardTitle>{tabContent[tabValue].title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4 xl:gap-8">
          {orders?.map((order) => (
            <div key={tabValue + order.id}>
              <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader
                  className={
                    "flex flex-row items-start " + tabContent[tabValue].color
                  }
                >
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      Đơn số <span className="font-thin">#{order.id}</span>
                    </CardTitle>
                    <CardDescription>
                      <span
                        className={
                          "flex items-center text-black gap-1 " +
                          (tabValue === "preparing" || tabValue === "completed"
                            ? "text-white"
                            : "")
                        }
                      >
                        <AlarmClock className="h-5" />
                        {formatTime(order.createdAt)}{" "}
                        {formatDate(order.createdAt)}
                      </span>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="font-semibold">Chi tiết đơn hàng</div>
                    <ul className="grid gap-3">
                      {order.orderItems.map((orderItem) => (
                        <li
                          key={orderItem.id}
                          className="flex items-center justify-between"
                        >
                          <span className="text-muted-foreground">
                            {orderItem.product.name} x{" "}
                            <span>{orderItem.quantity}</span>
                          </span>
                          <span>
                            {formatPriceInVND(orderItem.product.price)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Separator className="my-2" />
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between font-semibold">
                        <span className="text-muted-foreground">Tổng</span>
                        <span>
                          {formatPriceInVND(
                            order.orderItems.reduce(
                              (accumulator, currentValue) =>
                                accumulator +
                                currentValue.product.price *
                                  currentValue.quantity,
                              0,
                            ),
                          )}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Thông tin thêm</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Khách hàng</dt>
                        <dd>{order.customerName}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Bàn số</dt>
                        <dd>{order.tableNo}</dd>
                      </div>
                    </dl>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center gap-4">
                    <Button
                      size="sm"
                      className="w-full"
                      variant="outline"
                      onClick={() => updateStatus(order.id)}
                      disabled={
                        updateOrderLoading && currentOrderId === order.id
                      }
                    >
                      {updateOrderLoading && currentOrderId === order.id ? (
                        <Spinner />
                      ) : (
                        tabContent[tabValue].button
                      )}
                    </Button>
                  </div>
                </CardContent>
                <CardFooter
                  className={
                    "flex flex-row items-center border-t px-6 py-3 " +
                    tabContent[tabValue].color
                  }
                ></CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

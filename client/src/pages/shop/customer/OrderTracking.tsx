import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { Button as ShadButton } from "@/components/ui/button";
import {
  AlarmClock,
  ChefHat,
  CircleCheck,
  HandCoins,
  Info,
  Search,
  ShoppingCart,
  Utensils,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  formatDate,
  formatPriceInVND,
  formatTime,
} from "@/utils/helperFunctions";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import useGetMenu from "@/hooks/customer/useGetMenu";

import useGetOrder from "@/hooks/customer/useGetOrder";

function generateOrderStatusButton(orderStatus: string | undefined) {
  switch (orderStatus) {
    case "PROCESSING":
      return (
        <Button
          size="sm"
          className="w-full bg-yellow-300/60 text-black disabled:opacity-80"
          disabled
        >
          <HandCoins className="h-4 mr-1" />
          Đang xử lý
        </Button>
      );

    case "CONFIRMED":
    case "PREPARING":
      return (
        <Button
          size="sm"
          className="w-full bg-red-500 disabled:opacity-80"
          disabled
        >
          <ChefHat className="h-4 mr-1" />
          Đang chuẩn bị
        </Button>
      );

    case "COMPLETED":
      return (
        <Button
          size="sm"
          className="w-full bg-green-500/80 disabled:opacity-80"
          disabled
        >
          <CircleCheck className="h-4 mr-1" />
          Đã xong
        </Button>
      );

    default:
      break;
  }
}

type TOrder = {
  id: number;
  customerName: string;
  tableNo: number;
  status: string;
  shopId: number;
  createdAt: string;
  updatedAt: string;
  orderItems: {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    createdAt: string;
    updatedAt: string;
  }[];
};

type TProduct = {
  id: number;
  image: string;
  name: string;
  price: number;
  status: boolean;
  createdAt: string;
};

export default function OrderTrackingPage() {
  const { shopUrl } = useParams();

  const { getMenu } = useGetMenu();

  const [shopName, setShopName] = useState("");
  const [menu, setMenu] = useState<TProduct[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const fetchedMenu = await getMenu(shopUrl);
      console.log(fetchedMenu);

      setShopName(fetchedMenu.shopName);
      setMenu(fetchedMenu.products);
    };

    fetchMenu();
  }, []);

  const [cart, setCart] = useState<
    {
      id: number;
      name: string | undefined;
      price: number | undefined;
      quantity: number;
      image: string | undefined;
    }[]
  >([]);

  useEffect(() => {
    try {
      const key = shopUrl ? shopUrl : "";
      const localCart = localStorage.getItem(key);

      if (localCart) {
        setCart(JSON.parse(localCart));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const [order, setOrder] = useState<TOrder>();

  const { getOrder } = useGetOrder();

  const [orderId, setOrderId] = useState<number | null>(null);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await getOrder(orderId || 0, shopUrl || "");

    setOrder(res);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-30 bg-white transition-all shadow-md pt-0">
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto flex justify-between py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <div className="flex gap-2">
              <img
                alt="Shop image"
                className="aspect-square w-12 rounded-full border-2 border-red-500 object-cover"
                src="/shop-image.jpg"
              />
              <div className="flex items-center">
                <h1 className="font-semibold md:text-xl">{shopName}</h1>
              </div>
            </div>
          </div>
          <ul className="hidden lg:flex col-start-4 col-end-8 text-black-500  items-center">
            <Link
              to="../"
              className="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative text-black-500 hover:text-red-500"
            >
              Thực đơn
            </Link>
            <Link
              to="./"
              className="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative text-red-500 border-b-2 border-red-500"
            >
              Theo dõi đơn hàng
            </Link>
            <Link
              to="../shop-info"
              className="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative text-black-500 hover:text-red-500"
            >
              Thông tin shop
            </Link>
          </ul>
          <div className="col-start-10 col-end-12 font-medium flex justify-end items-center ">
            <Link to="../cart">
              <Button outline gradientMonochrome="failure">
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline mr-2">Giỏ hàng</span>
                <Badge>
                  {cart.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.quantity,
                    0,
                  )}
                </Badge>
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-inner">
        <div className="bg-white sm:px-3">
          <ul className="flex w-full justify-between items-center text-black-500">
            <Link
              to="../"
              className="mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all border-transparent"
            >
              <Utensils className="w-6 h-6" />
              Thực đơn
            </Link>
            <Link
              to="./"
              className="mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all border-red-500 text-red-500"
            >
              <Search className="w-6 h-6" />
              Theo dõi đơn hàng
            </Link>
            <Link
              to="../shop-info"
              className="mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all border-transparent"
            >
              <Info className="w-6 h-6" />
              Thông tin
            </Link>
          </ul>
        </div>
      </nav>
      {/* End Mobile Navigation */}

      {/* Main content */}
      <div className="flex justify-center items-center my-20">
        <div className="mx-4">
          <div className="flex w-full flex-col justify-center">
            <h1 className="my-4 text-center text-3xl font-bold md:text-left">
              Theo dõi đơn hàng của bạn tại đây
            </h1>

            <div className="w-full">
              <form onSubmit={handleSubmitForm} className="relative">
                <input
                  type="number"
                  placeholder="Nhập mã đơn hàng"
                  required
                  className="z-0 h-14 w-full rounded-lg border-2 pl-5 pr-20 focus:shadow focus:outline-none"
                  value={orderId || ""}
                  onChange={(e) => setOrderId(parseInt(e.target.value))}
                />
                <ShadButton type="submit" className="absolute right-2 top-2">
                  Tìm kiếm
                </ShadButton>
              </form>
            </div>
          </div>

          {order && (
            <Card className="overflow-hidden mt-3">
              <CardHeader className="flex flex-row items-start bg-muted/60">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Đơn số <span className="font-thin">#{order?.id}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center text-black gap-1">
                    <AlarmClock className="h-5" />
                    {formatTime(order?.createdAt || "")}{" "}
                    {formatDate(order?.createdAt || "")}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Chi tiết đơn hàng</div>
                  <ul className="grid gap-3">
                    {order?.orderItems.map((product, index) => (
                      <li
                        className="flex items-center justify-between"
                        key={index}
                      >
                        <span className="text-muted-foreground">
                          {menu.find((e) => e.id === product.productId)?.name} x{" "}
                          <span>{product.quantity}</span>
                        </span>
                        <span>
                          {formatPriceInVND(
                            menu.find((e) => e.id === product.productId)
                              ?.price || 0,
                          )}
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
                          order?.orderItems.reduce(
                            (accumulator, currentValue) =>
                              accumulator +
                              (menu.find((e) => e.id === currentValue.productId)
                                ?.price || 0) *
                                currentValue.quantity,
                            0,
                          ) || 0,
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
                      <dd>{order?.customerName}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Bàn số</dt>
                      <dd>{order?.tableNo}</dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center gap-4">
                  {generateOrderStatusButton(order?.status)}
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t  bg-muted/60 px-6 py-3"></CardFooter>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

import {
  CircleUser,
  Menu,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Separator } from "@/components/ui/separator";

import "../../../index.css";

function formatDate(dateString: string) {
  // Create a new Date object from the string
  const date = new Date(dateString);

  // Extract the day, month, and year from the date
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  // Format the date as dd/mm/yyyy
  return `${day}/${month}/${year}`;
}

function formatTime(dateString: string) {
  const date = new Date(dateString);

  // Extract hours, minutes, and seconds
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  // const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format the time as hh:mm:ss
  return `${hours}:${minutes}`;
}

function formatPriceInVND(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

const templateOrderData = [
  {
    id: "1",
    createdAt: "2024-08-12T15:47:09.130Z",
    products: [
      { name: "Americano", quantity: 1, price: 50000 },
      { name: "Espresso", quantity: 2, price: 40000 },
    ],
    customerName: "Nguyễn Việt Anh",
    tableNo: 10,
  },
  {
    id: "2",
    createdAt: "2024-08-12T15:47:09.130Z",
    products: [{ name: "Coldbrew", quantity: 1, price: 60000 }],
    customerName: "Nguyễn Việt Anh",
    tableNo: 2,
  },
  // {
  //   id: "3",
  //   createdAt: "2024-08-12T15:47:09.130Z",
  //   products: [{ name: "Coldbrew", quantity: 1, price: 60000 }],
  //   customerName: "Nguyễn Việt Anh",
  //   tableNo: 2,
  // },
  // {
  //   id: "4",
  //   createdAt: "2024-08-12T15:47:09.130Z",
  //   products: [
  //     { name: "Coldbrew", quantity: 1, price: 60000 },
  //     { name: "Americano", quantity: 1, price: 50000 },
  //     { name: "Espresso", quantity: 2, price: 40000 },
  //   ],
  //   customerName: "Nguyễn Việt Anh",
  //   tableNo: 2,
  // },
];

export default function StaffPage() {
  const name = "admin";

  const logout = () => {
    console.log("Logged out!");
  };
  return (
    <div className="grid w-full lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <div className="hidden border-r bg-muted/40 lg:block min-h-screen">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="/" className="flex items-center gap-2 font-semibold">
              <img src="/logo.png" className="h-6 w-6" />
              <span className="">Trang quản lý</span>
            </a>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <HandPlatter className="h-4 w-4" />
                Quản lý đơn hàng
              </a>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          {/* Sidebar responsive */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <a
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <img src="/logo.png" className="h-6 w-6" />
                  <span className="">Trang quản lý</span>
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <HandPlatter className="h-4 w-4" />
                  Quản lý đơn hàng
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          {/* Search box */}
          <div className="w-full flex-1">
            {/* <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form> */}
          </div>
          {/* Avatar button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Hỗ trợ</DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="items-start gap-4 p-4 sm:px-6 sm:py-0 sm:pt-4 md:gap-8  ">
          <Tabs defaultValue="processing">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="processing">Chờ xác nhận</TabsTrigger>
                <TabsTrigger value="confirmed">Đã thanh toán</TabsTrigger>
                <TabsTrigger value="preparing">Đang chuẩn bị</TabsTrigger>
                <TabsTrigger value="completed">Đã hoàn tất</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="processing">
              <Card
                x-chunk="dashboard-06-chunk-0"
                className="overflow-y-auto h-[80vh]"
              >
                <CardHeader>
                  <CardTitle>Đơn hàng chờ xác nhận</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 xl:gap-8">
                    {templateOrderData.map((order) => (
                      <div key={order.id}>
                        <Card
                          className="overflow-hidden"
                          x-chunk="dashboard-05-chunk-4"
                        >
                          <CardHeader className="flex flex-row items-start bg-yellow-300/60">
                            <div className="grid gap-0.5">
                              <CardTitle className="group flex items-center gap-2 text-lg">
                                Đơn số{" "}
                                <span className="font-thin">#{order.id}</span>
                              </CardTitle>
                              <CardDescription>
                                <div className="flex items-center text-black gap-1">
                                  <AlarmClock className="h-5" />
                                  {formatTime(order.createdAt)}{" "}
                                  {formatDate(order.createdAt)}
                                </div>
                              </CardDescription>
                            </div>
                            {/* <div className="ml-auto flex items-center gap-1">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                  >
                                    <MoreVertical className="h-3.5 w-3.5" />
                                    <span className="sr-only">More</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem>Export</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Trash</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div> */}
                          </CardHeader>
                          <CardContent className="p-6 text-sm">
                            <div className="grid gap-3">
                              <div className="font-semibold">
                                Chi tiết đơn hàng
                              </div>
                              <ul className="grid gap-3">
                                {order.products.map((product) => (
                                  <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                      {product.name} x{" "}
                                      <span>{product.quantity}</span>
                                    </span>
                                    <span>
                                      {formatPriceInVND(product.price)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              <Separator className="my-2" />
                              <ul className="grid gap-3">
                                <li className="flex items-center justify-between font-semibold">
                                  <span className="text-muted-foreground">
                                    Tổng
                                  </span>
                                  <span>
                                    {formatPriceInVND(
                                      order.products.reduce(
                                        (accumulator, currentValue) =>
                                          accumulator +
                                          currentValue.price *
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
                              <div className="font-semibold">
                                Thông tin thêm
                              </div>
                              <dl className="grid gap-3">
                                <div className="flex items-center justify-between">
                                  <dt className="text-muted-foreground">
                                    Khách hàng
                                  </dt>
                                  <dd>{order.customerName}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                  <dt className="text-muted-foreground">
                                    Bàn số
                                  </dt>
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
                              >
                                <HandCoins className="h-4 mr-1" />
                                Xác nhận thanh toán
                              </Button>
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-row items-center border-t bg-yellow-300/60 px-6 py-3"></CardFooter>
                        </Card>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="confirmed">
              <Card
                x-chunk="dashboard-06-chunk-0"
                className="overflow-y-auto h-[80vh]"
              >
                <CardHeader>
                  <CardTitle>Đơn hàng đã thanh toán</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 xl:gap-8">
                    {templateOrderData.map((order) => (
                      <div key={order.id}>
                        <Card
                          className="overflow-hidden"
                          x-chunk="dashboard-05-chunk-4"
                        >
                          <CardHeader className="flex flex-row items-start bg-teal-400/60">
                            <div className="grid gap-0.5">
                              <CardTitle className="group flex items-center gap-2 text-lg">
                                Đơn số{" "}
                                <span className="font-thin">#{order.id}</span>
                              </CardTitle>
                              <CardDescription>
                                <div className="flex items-center text-black gap-1">
                                  <AlarmClock className="h-5" />
                                  {formatTime(order.createdAt)}{" "}
                                  {formatDate(order.createdAt)}
                                </div>
                              </CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent className="p-6 text-sm">
                            <div className="grid gap-3">
                              <div className="font-semibold">
                                Chi tiết đơn hàng
                              </div>
                              <ul className="grid gap-3">
                                {order.products.map((product) => (
                                  <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                      {product.name} x{" "}
                                      <span>{product.quantity}</span>
                                    </span>
                                    <span>
                                      {formatPriceInVND(product.price)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              <Separator className="my-2" />
                              <ul className="grid gap-3">
                                <li className="flex items-center justify-between font-semibold">
                                  <span className="text-muted-foreground">
                                    Tổng
                                  </span>
                                  <span>
                                    {formatPriceInVND(
                                      order.products.reduce(
                                        (accumulator, currentValue) =>
                                          accumulator +
                                          currentValue.price *
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
                              <div className="font-semibold">
                                Thông tin thêm
                              </div>
                              <dl className="grid gap-3">
                                <div className="flex items-center justify-between">
                                  <dt className="text-muted-foreground">
                                    Khách hàng
                                  </dt>
                                  <dd>{order.customerName}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                  <dt className="text-muted-foreground">
                                    Bàn số
                                  </dt>
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
                              >
                                <ChefHat className="h-4 mr-1" />
                                Chuẩn bị món
                              </Button>
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-row items-center border-t  bg-teal-400/60 px-6 py-3"></CardFooter>
                        </Card>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="preparing">
              <Card
                x-chunk="dashboard-06-chunk-0"
                className="overflow-y-auto h-[80vh]"
              >
                <CardHeader>
                  <CardTitle>Đơn hàng đang chuẩn bị</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 xl:gap-8">
                    {templateOrderData.map((order) => (
                      <div key={order.id}>
                        <Card
                          className="overflow-hidden"
                          x-chunk="dashboard-05-chunk-4"
                        >
                          <CardHeader className="flex flex-row items-start bg-red-500 text-white">
                            <div className="grid gap-0.5">
                              <CardTitle className="group flex items-center gap-2 text-lg">
                                Đơn số{" "}
                                <span className="font-thin">#{order.id}</span>
                              </CardTitle>
                              <CardDescription>
                                <div className="flex items-center text-white gap-1">
                                  <AlarmClock className="h-5" />
                                  {formatTime(order.createdAt)}{" "}
                                  {formatDate(order.createdAt)}
                                </div>
                              </CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent className="p-6 text-sm">
                            <div className="grid gap-3">
                              <div className="font-semibold">
                                Chi tiết đơn hàng
                              </div>
                              <ul className="grid gap-3">
                                {order.products.map((product) => (
                                  <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                      {product.name} x{" "}
                                      <span>{product.quantity}</span>
                                    </span>
                                    <span>
                                      {formatPriceInVND(product.price)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              <Separator className="my-2" />
                              <ul className="grid gap-3">
                                <li className="flex items-center justify-between font-semibold">
                                  <span className="text-muted-foreground">
                                    Tổng
                                  </span>
                                  <span>
                                    {formatPriceInVND(
                                      order.products.reduce(
                                        (accumulator, currentValue) =>
                                          accumulator +
                                          currentValue.price *
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
                              <div className="font-semibold">
                                Thông tin thêm
                              </div>
                              <dl className="grid gap-3">
                                <div className="flex items-center justify-between">
                                  <dt className="text-muted-foreground">
                                    Khách hàng
                                  </dt>
                                  <dd>{order.customerName}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                  <dt className="text-muted-foreground">
                                    Bàn số
                                  </dt>
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
                              >
                                <HandPlatter className="h-4 mr-1" />
                                Phục vụ
                              </Button>
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-row items-center border-t bg-red-500 px-6 py-3"></CardFooter>
                        </Card>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="completed">
              <Card
                x-chunk="dashboard-06-chunk-0"
                className="overflow-y-auto h-[80vh]"
              >
                <CardHeader>
                  <CardTitle>Đơn hàng đã hoàn tất</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 xl:gap-8">
                    {templateOrderData.map((order) => (
                      <div key={order.id}>
                        <Card
                          className="overflow-hidden"
                          x-chunk="dashboard-05-chunk-4"
                        >
                          <CardHeader className="flex flex-row items-start bg-green-500/80 text-white">
                            <div className="grid gap-0.5">
                              <CardTitle className="group flex items-center gap-2 text-lg">
                                Đơn số{" "}
                                <span className="font-thin">#{order.id}</span>
                              </CardTitle>
                              <CardDescription>
                                <div className="flex items-center text-white gap-1">
                                  <AlarmClock className="h-5" />
                                  {formatTime(order.createdAt)}{" "}
                                  {formatDate(order.createdAt)}
                                </div>
                              </CardDescription>
                            </div>
                          </CardHeader>
                          <CardContent className="p-6 text-sm">
                            <div className="grid gap-3">
                              <div className="font-semibold">
                                Chi tiết đơn hàng
                              </div>
                              <ul className="grid gap-3">
                                {order.products.map((product) => (
                                  <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                      {product.name} x{" "}
                                      <span>{product.quantity}</span>
                                    </span>
                                    <span>
                                      {formatPriceInVND(product.price)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              <Separator className="my-2" />
                              <ul className="grid gap-3">
                                <li className="flex items-center justify-between font-semibold">
                                  <span className="text-muted-foreground">
                                    Tổng
                                  </span>
                                  <span>
                                    {formatPriceInVND(
                                      order.products.reduce(
                                        (accumulator, currentValue) =>
                                          accumulator +
                                          currentValue.price *
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
                              <div className="font-semibold">
                                Thông tin thêm
                              </div>
                              <dl className="grid gap-3">
                                <div className="flex items-center justify-between">
                                  <dt className="text-muted-foreground">
                                    Khách hàng
                                  </dt>
                                  <dd>{order.customerName}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                  <dt className="text-muted-foreground">
                                    Bàn số
                                  </dt>
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
                              >
                                <Trash2 className="h-4 mr-1" />
                                Xóa
                              </Button>
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-row items-center border-t bg-green-500/80 px-6 py-3"></CardFooter>
                        </Card>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

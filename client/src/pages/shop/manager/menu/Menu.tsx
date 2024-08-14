import {
  CircleUser,
  Menu,
  Store,
  MoreHorizontal,
  ChefHat,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import AddDishModal from "../modals/AddDishModal";

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

function formatPriceInVND(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

const templateTableData = [
  {
    id: 1,
    image: "",
    name: "Americano",
    price: 50000,
    status: true,
    createdAt: "2024-08-12T15:47:09.130Z",
  },
  {
    id: 2,
    image: "",
    name: "Trà đào cam sả",
    price: 55000,
    status: false,
    createdAt: "2024-08-12T15:47:09.130Z",
  },
];

const templateShopData = {
  shopName: "DeeDeeShop",
  image: "/logo.png",
  accountNo: "21510003888097",
  acqId: "970401",
  isActive: false,
  managerName: "Nguyễn Việt Anh",
  managerUsername: "deedee",
};

export default function MenuManagementPage() {
  const name = "manager";

  const logout = () => {
    console.log("Logged out!");
  };
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="#" className="flex items-center gap-2 font-semibold">
              <img src="/logo.png" className="h-6 w-6" />
              <span className="">{templateShopData.shopName}</span>
            </a>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                to="/shop/manager"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Store className="h-4 w-4" />
                Thông tin cửa hàng{" "}
              </Link>
              <Link
                to="/shop/manager/menu"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <ChefHat className="h-4 w-4" />
                Thực đơn
              </Link>
              <Link
                to="/shop/manager/staff"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Nhân viên
              </Link>
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
                className="shrink-0 md:hidden"
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
                  <span className="">{templateShopData.shopName}</span>
                </a>
                <Link
                  to="/shop/manager"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Store className="h-4 w-4" />
                  Thông tin cửa hàng{" "}
                </Link>
                <Link
                  to="/shop/manager/menu"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ChefHat className="h-4 w-4" />
                  Thực đơn
                </Link>
                <Link
                  to="/shop/manager/staff"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-4 w-4" />
                  Nhân viên
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          {/* Search box */}
          <div className="w-full flex-1"></div>
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
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 sm:pt-4 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Thực đơn</CardTitle>
              <CardDescription>
                Quản lý danh sách các món trong thực đơn.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="flex items-center gap-2 mb-4">
                  <AddDishModal />
                </div>
              </div>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[120px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Tên món</TableHead>
                      <TableHead>Giá</TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Trạng thái
                      </TableHead>

                      <TableHead className="hidden md:table-cell">
                        Ngày tạo
                      </TableHead>

                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {templateTableData.map((shop) => (
                      <TableRow key={shop.id}>
                        <TableCell className="hidden sm:table-cell">
                          <img
                            alt="Ảnh minh họa món"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={shop.image}
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {shop.name}
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatPriceInVND(shop.price)}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {shop.status ? (
                            <Badge variant="active">Còn hàng</Badge>
                          ) : (
                            <Badge variant="destructive">Hết hàng</Badge>
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {formatDate(shop.createdAt)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                              <DropdownMenuItem>Xóa</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </CardContent>
            <CardFooter>
              {/* <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div> */}
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}

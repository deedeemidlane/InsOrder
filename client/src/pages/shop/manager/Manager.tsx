import { CircleUser, Menu, Store, ChefHat, Users } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import ChangePasswordModal from "./modals/ChangePasswordModal";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import useLogout from "@/hooks/authentication/useLogout";
import useGetShopInfo from "@/hooks/manager/useGetShopInfo";

type TShop = {
  name: string;
  username: string;
  shop: {
    id: number;
    name: string;
    image: string;
    accountNo: string;
    acqId: string;
    shopUrl: string;
    active: boolean;
    createdAt: string;
  };
};

export default function ManagerPage() {
  const { authUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (authUser?.role !== "MANAGER") {
      navigate("/login");
    }
  }, [authUser]);

  const { logout } = useLogout();

  const { getShopInfo } = useGetShopInfo();

  const [shopInfo, setShopInfo] = useState<TShop>();

  useEffect(() => {
    const fetchShop = async () => {
      const fetchedShop = await getShopInfo();
      setShopInfo(fetchedShop);
    };

    fetchShop();
  }, []);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] xl:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <div className="hidden border-r md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="#" className="flex items-center gap-2 font-semibold">
              <img src="/logo.png" className="h-6 w-6" />
              <span className="">Trang quản lý</span>
            </a>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                to="/shop/manager"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Store className="h-4 w-4" />
                Thông tin cửa hàng{" "}
              </Link>
              <Link
                to="/shop/manager/menu"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
        <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
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
                  <span className="">{shopInfo?.shop.name}</span>
                </a>
                <Link
                  to="/shop/manager"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <Store className="h-4 w-4" />
                  Thông tin cửa hàng{" "}
                </Link>
                <Link
                  to="/shop/manager/menu"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
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
              <DropdownMenuLabel>{authUser?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Hỗ trợ</DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-5 md:gap-8 bg-muted/40">
          <div className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4">
            <div className="grid gap-4 lg:grid-cols-4 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Thông tin cửa hàng</CardTitle>
                    <CardDescription>
                      Cập nhật thông tin cửa hàng của bạn tại đây.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <img
                          alt="Shop image"
                          className="aspect-square w-full rounded-full border-2 object-cover"
                          height="84"
                          src="/hero.png"
                          width="84"
                        />
                      </div>
                      <div className="flex items-center col-span-2">
                        <h1 className="font-semibold text-xl">
                          {shopInfo?.shop.name}
                        </h1>
                      </div>
                    </div>
                    <div className="grid gap-4 py-4 sm:px-2">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="shopName" className="text-right">
                          Tên
                        </Label>
                        <Input
                          id="shopName"
                          className="col-span-3"
                          placeholder="Nhập tên cửa hàng"
                          defaultValue={shopInfo?.shop.name}
                        />
                      </div>
                      {/* <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                          Ảnh đại diện
                        </Label>
                        <Input
                          id="image"
                          className="col-span-3 p-0"
                          type="file"
                        />
                      </div> */}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="accountNo" className="text-right">
                          Số tài khoản
                        </Label>
                        <Input
                          id="accountNo"
                          className="col-span-3"
                          defaultValue={shopInfo?.shop.accountNo}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="BIN" className="text-right">
                          Mã BIN ngân hàng
                        </Label>
                        <InputOTP
                          maxLength={6}
                          pattern={REGEXP_ONLY_DIGITS}
                          value={shopInfo?.shop.acqId}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                          Trạng thái
                        </Label>
                        <div className="col-span-3">
                          <Select value={shopInfo?.shop.active ? "1" : "0"}>
                            <SelectTrigger
                              id="status"
                              aria-label="Select status"
                            >
                              <SelectValue placeholder="Lựa chọn trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Hoạt động</SelectItem>
                              <SelectItem value="0">Tạm dừng</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-6">
                        <div className="grid gap-3"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button size="sm" className="w-full">
                        Lưu thay đổi
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Thông tin quản lý</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 py-4 sm:px-2">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="managerName" className="text-right">
                          Họ và tên
                        </Label>
                        <Input
                          id="managerName"
                          className="col-span-3"
                          placeholder="Nhập tên quản lý"
                          defaultValue={shopInfo?.name}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Tên đăng nhập
                        </Label>
                        <Input
                          id="username"
                          className="col-span-3"
                          defaultValue={shopInfo?.username}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="gap-2 md:flex w-full">
                      <Button size="sm" className="w-full">
                        Lưu thay đổi
                      </Button>
                      <ChangePasswordModal />
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

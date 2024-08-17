import { CircleUser, Menu, Store, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddShopModal from "./modals/AddShopModal";
import useLogout from "@/hooks/authentication/useLogout";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useCreateShop from "@/hooks/admin/useCreateShop";
import useGetShops from "@/hooks/admin/useGetShops";
import { Spinner } from "flowbite-react";
import { formatDate } from "@/utils/helperFunctions";

type TShop = {
  name: string;
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

export default function AdminPage() {
  const { authUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (authUser?.role !== "ADMIN") {
      navigate("/login");
    }
  }, [authUser]);

  const { logout } = useLogout();

  const { loading: createShopLoading, createShop } = useCreateShop();
  const { loading: getShopsLoading, getShops } = useGetShops();

  const [openAddShopModal, setOpenAddShopModal] = useState(false);

  const [shops, setShops] = useState<TShop[]>([]);

  const handleSubmitForm = async (e: React.FormEvent, inputs: {}) => {
    e.preventDefault();

    await createShop(inputs);

    setOpenAddShopModal(false);
  };

  useEffect(() => {
    const fetchShops = async () => {
      const fetchedShops = await getShops();
      setShops(fetchedShops);
    };

    fetchShops();
  }, []);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block">
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
                <Store className="h-4 w-4" />
                Danh sách cửa hàng{" "}
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
                  <span className="">Trang quản lý</span>
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <Store className="h-4 w-4" />
                  Danh sách cửa hàng{" "}
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
              <DropdownMenuLabel>{authUser?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Hỗ trợ</DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 sm:pt-4 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Danh sách cửa hàng</CardTitle>
              <CardDescription>
                Theo dõi các cửa hàng đã đăng ký trên hệ thống.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getShopsLoading ? (
                <div className="w-full text-center">
                  <Spinner size="lg" />
                </div>
              ) : (
                <>
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 mb-4">
                      <AddShopModal
                        handleSubmitForm={handleSubmitForm}
                        open={openAddShopModal}
                        setOpen={setOpenAddShopModal}
                        loading={createShopLoading}
                      />
                    </div>
                  </div>
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                          </TableHead>
                          <TableHead>Tên cửa hàng</TableHead>
                          <TableHead className="hidden lg:table-cell">
                            Trạng thái
                          </TableHead>
                          <TableHead>Quản lý</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Ngày tạo
                          </TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {shops.map((shop, index) => (
                          <TableRow key={index}>
                            <TableCell className="hidden sm:table-cell">
                              {/* <img
                                alt="Ảnh đại diện Shop"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={shop.shop.image}
                                width="64"
                              /> */}
                              <img
                                alt="Ảnh đại diện Shop"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src="/placeholder.svg"
                                width="64"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              {shop.shop.name}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {shop.shop.active ? (
                                <Badge variant="active">Hoạt động</Badge>
                              ) : (
                                <Badge variant="destructive">Tạm dừng</Badge>
                              )}
                            </TableCell>
                            <TableCell>{shop.name}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {formatDate(shop.shop.createdAt)}
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
                </>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

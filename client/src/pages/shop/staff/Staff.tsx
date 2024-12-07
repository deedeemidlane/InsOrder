import { CircleUser, Menu, HandPlatter } from "lucide-react";

import { Button } from "@/components/ui/button";
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

import useLogout from "@/hooks/authentication/useLogout";
import { useAuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetOrders from "@/hooks/staff/useGetOrders";
import { Spinner } from "flowbite-react";
import useUpdateOrderStatus from "@/hooks/staff/useUpdateOrderStatus";
import Tab from "./_components/Tab";

export type TOrder = {
  id: number;
  customerName: string;
  tableNo: number;
  status: string;
  shopId: number;
  createdAt: string;
  orderItems: {
    id: number;
    quantity: number;
    product: {
      name: string;
      price: number;
    };
  }[];
};

export default function StaffPage() {
  const { authUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (authUser?.role !== "STAFF") {
      navigate("/login");
    }
  }, [authUser]);

  const { logout } = useLogout();

  const [orders, setOrders] = useState<TOrder[]>();

  const [currentOrderId, setCurrentOrderId] = useState<number>();

  const { loading: getOrdersLoading, getOrders } = useGetOrders();

  const { loading: updateOrderLoading, updateOrderStatus } =
    useUpdateOrderStatus();

  const [tab, setTab] = useState("processing");

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrders();

      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, [tab, currentOrderId]);

  const updateStatus = async (orderId: number) => {
    setCurrentOrderId(orderId);
    const nextStatus = await updateOrderStatus(orderId);
    setTab(nextStatus.toLowerCase());
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

        <main className="items-start gap-4 p-4 sm:px-6 sm:py-0 sm:pt-4 md:gap-8">
          {getOrdersLoading ? (
            <div className="w-full text-center mt-10">
              <Spinner size="xl" />
            </div>
          ) : (
            <Tabs defaultValue={tab}>
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="processing">Chờ xác nhận</TabsTrigger>
                  <TabsTrigger value="confirmed">Đã thanh toán</TabsTrigger>
                  <TabsTrigger value="preparing">Đang chuẩn bị</TabsTrigger>
                  <TabsTrigger value="completed">Đã hoàn tất</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="processing">
                <Tab
                  orders={orders?.filter(
                    (order) => order.status === "PROCESSING",
                  )}
                  updateStatus={updateStatus}
                  updateOrderLoading={updateOrderLoading}
                  tabValue="processing"
                  currentOrderId={currentOrderId}
                />
              </TabsContent>
              <TabsContent value="confirmed">
                <Tab
                  orders={orders?.filter(
                    (order) => order.status === "CONFIRMED",
                  )}
                  updateStatus={updateStatus}
                  updateOrderLoading={updateOrderLoading}
                  tabValue="confirmed"
                  currentOrderId={currentOrderId}
                />
              </TabsContent>
              <TabsContent value="preparing">
                <Tab
                  orders={orders?.filter(
                    (order) => order.status === "PREPARING",
                  )}
                  updateStatus={updateStatus}
                  updateOrderLoading={updateOrderLoading}
                  tabValue="preparing"
                  currentOrderId={currentOrderId}
                />
              </TabsContent>
              <TabsContent value="completed">
                <Tab
                  orders={orders?.filter(
                    (order) => order.status === "COMPLETED",
                  )}
                  updateStatus={updateStatus}
                  updateOrderLoading={updateOrderLoading}
                  tabValue="completed"
                  currentOrderId={currentOrderId}
                />
              </TabsContent>
            </Tabs>
          )}
        </main>
      </div>
    </div>
  );
}

import {
  CircleUser,
  Menu,
  Store,
  MoreHorizontal,
  ChefHat,
  Users,
} from "lucide-react";

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
import { Link, useNavigate } from "react-router-dom";
import AddStaffModal from "../modals/AddStaffModal";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import useLogout from "@/hooks/authentication/useLogout";
import useGetStaffs from "@/hooks/manager/useGetStaffs";
import { formatDate } from "@/utils/helperFunctions";
import useCreateStaffAccount from "@/hooks/manager/useCreateStaffAccount";
import { Spinner } from "flowbite-react";

type Staff = {
  id: number;
  name: string;
  username: string;
  createdAt: string;
};

export default function StaffManagementPage() {
  const { authUser } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (authUser?.role !== "MANAGER") {
      navigate("/login");
    }
  }, [authUser]);

  const { logout } = useLogout();

  const { loading: getStaffsLoading, getStaffs } = useGetStaffs();
  const { loading: createStaffAccountLoading, createStaffAccount } =
    useCreateStaffAccount();

  const [staffs, setStaffs] = useState<Staff[]>([]);

  const [openAddStaffAccountModal, setOpenAddStaffAccountModal] =
    useState(false);

  const handleSubmitForm = async (e: React.FormEvent, inputs: {}) => {
    e.preventDefault();

    await createStaffAccount(inputs);

    setOpenAddStaffAccountModal(false);
  };

  useEffect(() => {
    const fetchStaffs = async () => {
      const fetchedStaffs = await getStaffs();
      setStaffs(fetchedStaffs);
    };

    fetchStaffs();
  }, [createStaffAccountLoading]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block">
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
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
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
                  <span className="">Trang quản lý</span>
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
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <ChefHat className="h-4 w-4" />
                  Thực đơn
                </Link>
                <Link
                  to="/shop/manager/staff"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
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
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 sm:pt-4 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Danh sách nhân viên</CardTitle>
              <CardDescription>
                Quản lý tài khoản nhân viên tại đây.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getStaffsLoading ? (
                <div className="w-full text-center">
                  <Spinner size="lg" />
                </div>
              ) : (
                <>
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 mb-4">
                      <AddStaffModal
                        handleSubmitForm={handleSubmitForm}
                        open={openAddStaffAccountModal}
                        setOpen={setOpenAddStaffAccountModal}
                        loading={createStaffAccountLoading}
                      />
                    </div>
                  </div>
                  <Card>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-center w-[50px] hidden sm:table-cell">
                            STT
                          </TableHead>
                          <TableHead>Tên nhân viên</TableHead>
                          <TableHead>Tên đăng nhập</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Ngày tạo
                          </TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {staffs.map((staff, index) => (
                          <TableRow key={staff.id}>
                            <TableCell className="hidden sm:table-cell text-center">
                              {index + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                              {staff.name}
                            </TableCell>
                            <TableCell>{staff.username}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {formatDate(staff.createdAt)}
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

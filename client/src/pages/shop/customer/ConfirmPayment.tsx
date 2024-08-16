import { Label, TextInput } from "flowbite-react";
import { ShoppingCart, Utensils, Search, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button as FlowbiteButton } from "flowbite-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ConfirmPaymentPage() {
  return (
    <>
      <header className="fixed top-0 w-full z-30 bg-white transition-all shadow-md pt-0">
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto flex justify-between py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <div className="flex gap-2">
              <img
                alt="Shop image"
                className="aspect-square w-12 rounded-full border-2 border-red-500 object-cover"
                src="/hero.png"
              />
              <div className="flex items-center">
                <h1 className="font-semibold text-xl">DeeDeeShop</h1>
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
              to="../order-tracking"
              className="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative text-black-500 hover:text-red-500"
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
              <FlowbiteButton outline gradientMonochrome="failure">
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline mr-2">Giỏ hàng</span>
                <Badge>6</Badge>
              </FlowbiteButton>
            </Link>
          </div>
        </nav>
      </header>
      {/* Mobile Navigation */}
      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 border-t-2 bg-white">
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
              to="../order-tracking"
              className="mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all border-transparent"
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
      <main
        className={`flex h-screen align-middle sm:bg-[url('/login-background.jpg')]`}
      >
        <div className="m-auto w-96 rounded-lg border-gray-500 bg-white/90 p-5 shadow-lg dark:bg-zinc-800 dark:sm:border-4">
          <h1 className="text-center whitespace-nowrap text-3xl font-bold dark:text-white my-3 mb-6">
            Xác nhận thanh toán
          </h1>

          <form className="flex max-w-md flex-col gap-4" method="post">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Họ và tên" />
              </div>
              <TextInput
                id="name"
                type="text"
                required
                placeholder="Nhập tên của bạn"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Số bàn" />
              </div>
              <TextInput
                id="password"
                type="text"
                required
                shadow
                placeholder="Nhập số bàn"
              />
            </div>

            <div className="flex flex-col gap-3">
              <Link to="../qr-pay">
                <Button className="w-full">Xác nhận</Button>
              </Link>

              <Link to="../cart">
                <Button className="w-full" variant="secondary">
                  Quay lại
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

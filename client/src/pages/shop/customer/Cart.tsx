import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useGetMenu from "@/hooks/customer/useGetMenu";
import { formatPriceInVND } from "@/utils/helperFunctions";
import { Button as FlowbiteButton, Spinner } from "flowbite-react";
import {
  ShoppingCart,
  Utensils,
  Search,
  Info,
  X,
  Plus,
  Minus,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function CartPage() {
  const { shopUrl } = useParams();

  const { loading, getMenu } = useGetMenu();

  const [shopName, setShopName] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      const fetchedMenu = await getMenu(shopUrl);
      console.log(fetchedMenu);

      setShopName(fetchedMenu.shopName);
    };

    fetchMenu();
  }, []);

  const [cart, setCart] = useState<
    {
      id: number;
      name: string;
      price: number;
      quantity: number;
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

  const minusQuantity = (id: number) => {
    let temp = [...cart];

    const index = temp.findIndex((e) => e.id === id);

    if (index !== -1) {
      if (temp[index].quantity === 1) {
        temp.splice(index, 1);
      } else {
        temp[index] = { ...temp[index], quantity: temp[index].quantity - 1 };
      }
    }

    const key = shopUrl ? shopUrl : "";
    localStorage.setItem(key, JSON.stringify(temp));

    setCart(temp);
  };

  const addQuantity = (id: number) => {
    let temp = [...cart];

    const index = temp.findIndex((e) => e.id === id);

    if (index !== -1) {
      temp[index] = { ...temp[index], quantity: temp[index].quantity + 1 };
    }

    const key = shopUrl ? shopUrl : "";
    localStorage.setItem(key, JSON.stringify(temp));

    setCart(temp);
  };

  const removeProduct = (id: number) => {
    let temp = [...cart];

    const index = temp.findIndex((e) => e.id === id);

    if (index !== -1) {
      temp.splice(index, 1);
    }

    const key = shopUrl ? shopUrl : "";
    localStorage.setItem(key, JSON.stringify(temp));

    setCart(temp);
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
                src="/hero.png"
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
            <Link to="./">
              <FlowbiteButton outline gradientMonochrome="failure">
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline mr-2">Giỏ hàng</span>
                <Badge>
                  {cart.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.quantity,
                    0,
                  )}
                </Badge>
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
      <section className="bg-white my-20">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 sm:pt-8">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Giỏ hàng
          </h2>

          {loading ? (
            <main className="flex items-center justify-center mt-10">
              <Spinner size="xl" color="failure" />
            </main>
          ) : (
            <div className="mt-2 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {cart.map((product, index) => (
                    <div key={index}>
                      <div className="hidden md:block rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                          <div className="shrink-0 md:order-1">
                            <img
                              src="/placeholder.svg"
                              alt="product image"
                              className="h-20 w-20 rounded-md border-2"
                            />
                          </div>

                          <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center">
                              {/* Decrease button */}
                              <button
                                type="button"
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 "
                                onClick={() => minusQuantity(product.id)}
                              >
                                <Minus className="h-3" />
                              </button>
                              <div className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white">
                                {product.quantity}
                              </div>
                              {/* Increase button */}
                              <button
                                type="button"
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 "
                                onClick={() => addQuantity(product.id)}
                              >
                                <Plus className="h-3" />
                              </button>
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                              <p className="text-base font-bold text-gray-900 dark:text-white">
                                {formatPriceInVND(
                                  product.price * product.quantity,
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <div className="text-xl font-medium text-gray-900">
                              {product.name}
                            </div>

                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                onClick={() => removeProduct(product.id)}
                              >
                                <X className="me-1.5 h-5 w-5" />
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mobile cart */}
                      <div className="md:hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="shrink-0 md:order-1">
                              <img
                                src="/placeholder.svg"
                                alt="product image"
                                className="h-20 w-20 rounded-md border-2"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="text-md font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="flex items-center">
                                {/* Decrease button */}
                                <button
                                  type="button"
                                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 "
                                  onClick={() => minusQuantity(product.id)}
                                >
                                  <Minus className="h-3" />
                                </button>
                                <div className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white">
                                  {product.quantity}
                                </div>
                                {/* Increase button */}
                                <button
                                  type="button"
                                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 "
                                  onClick={() => addQuantity(product.id)}
                                >
                                  <Plus className="h-3" />
                                </button>
                              </div>
                              <div className="md:order-4 md:w-32">
                                <p className="text-base font-bold text-gray-900 dark:text-white">
                                  {formatPriceInVND(
                                    product.price * product.quantity,
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeProduct(product.id)}
                          >
                            <X className="h-5 text-red-600" />
                          </Button>
                        </div>
                      </div>
                      {/* End mobile cart */}
                    </div>
                  ))}
                </div>
              </div>

              {/* Order summary */}
              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    Tổng kết hóa đơn
                  </p>

                  <div className="space-y-4">
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Tổng
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        {formatPriceInVND(
                          cart.reduce(
                            (accumulator, currentValue) =>
                              accumulator +
                              currentValue.price * currentValue.quantity,
                            0,
                          ),
                        )}
                      </dd>
                    </dl>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link to="../confirm-payment">
                      <Button className="w-full">Thanh toán</Button>
                    </Link>

                    <Link to="../">
                      <Button className="w-full" variant="secondary">
                        Quay lại
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

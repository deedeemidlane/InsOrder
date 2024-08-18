import { Button, Spinner } from "flowbite-react";
import { Info, Search, ShoppingCart, Utensils } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button as FlowbiteButton, Card as FlowbiteCard } from "flowbite-react";
import { formatPriceInVND } from "@/utils/helperFunctions";
import { BiSolidCartAdd } from "react-icons/bi";
import { Badge } from "@/components/ui/badge";
import useGetMenu from "@/hooks/customer/useGetMenu";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type TProduct = {
  id: number;
  image: string;
  name: string;
  price: number;
  status: boolean;
  createdAt: string;
};

export default function MenuPage() {
  const { shopUrl } = useParams();

  const { loading, getMenu } = useGetMenu();

  const [menu, setMenu] = useState<TProduct[]>([]);
  const [shopName, setShopName] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      const fetchedMenu = await getMenu(shopUrl);
      console.log(fetchedMenu);

      setMenu(fetchedMenu.products);
      setShopName(fetchedMenu.shopName);
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

  const addToCart = (id: number) => {
    let temp = [...cart];

    const product = menu.find((e) => e.id === id);

    const index = temp.findIndex((e) => e.id === id);

    if (index !== -1) {
      temp[index] = { ...temp[index], quantity: temp[index].quantity + 1 };
    } else {
      temp.push({
        id: id,
        name: product?.name,
        price: product?.price,
        quantity: 1,
        image: product?.image,
      });
    }

    const key = shopUrl ? shopUrl : "";
    localStorage.setItem(key, JSON.stringify(temp));

    setCart(temp);

    toast.success("Thêm món thành công!");
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
              to="./"
              className="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative text-red-500 border-b-2 border-red-500"
            >
              Thực đơn
            </Link>
            <Link
              to="./order-tracking"
              className="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative text-black-500 hover:text-red-500"
            >
              Theo dõi đơn hàng
            </Link>
            <Link
              to="./shop-info"
              className="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative text-black-500 hover:text-red-500"
            >
              Thông tin shop
            </Link>
          </ul>
          <div className="col-start-10 col-end-12 font-medium flex justify-end items-center ">
            <Link to="./cart">
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
              to="./"
              className="mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all border-red-500 text-red-500"
            >
              <Utensils className="w-6 h-6" />
              Thực đơn
            </Link>
            <Link
              to="./order-tracking"
              className="mx-1 sm:mx-2 px-3 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all border-transparent"
            >
              <Search className="w-6 h-6" />
              Theo dõi đơn hàng
            </Link>
            <Link
              to="./shop-info"
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
      {loading ? (
        <main className="flex h-screen items-center justify-center">
          <Spinner size="xl" color="failure" />
        </main>
      ) : (
        <div className="flex justify-center items-center my-20">
          <div className="grid md:grid-cols-2 gap-4 xl:gap-8 my-4">
            {menu?.map((product) => (
              <FlowbiteCard className="sm:pr-8" key={product.id}>
                <div className="flex gap-4">
                  <img
                    src={product.image}
                    alt="product image"
                    className="h-24 w-24 object-cover border-2 rounded-md"
                  />
                  <div className="flex flex-col justify-between">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <p>{formatPriceInVND(product.price)}</p>
                    <div>
                      <FlowbiteButton
                        size="xs"
                        outline
                        onClick={() => addToCart(product.id)}
                      >
                        <div className="flex items-center">
                          <BiSolidCartAdd className="sm:mr-1 text-xl" />
                          <span>Thêm vào giỏ hàng</span>
                        </div>
                      </FlowbiteButton>
                    </div>
                  </div>
                </div>
              </FlowbiteCard>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

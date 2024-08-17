import { ShoppingCart, Utensils, Search, Info, Download } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button as FlowbiteButton, Spinner } from "flowbite-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import useGetShopInfo from "@/hooks/customer/useGetShopInfo";
import usePlaceOrder from "@/hooks/customer/usePlaceOrder";
// import axios from "axios";

type TShop = {
  id: number;
  name: string;
  image: string;
  accountNo: string;
  accountName: string;
  acqId: string;
  shopUrl: string;
  active: boolean;
  createdAt: string;
};

export default function QrPaymentPage() {
  const { shopUrl } = useParams();

  const { getShopInfo } = useGetShopInfo();

  const [shop, setShop] = useState<TShop>();

  useEffect(() => {
    const fetchShop = async () => {
      const fetchedShop = await getShopInfo(shopUrl);

      console.log("fetched shop: ", fetchedShop);

      setShop(fetchedShop);
    };

    fetchShop();
  }, []);

  const [cart, setCart] = useState<
    {
      id: number;
      name: string;
      price: number;
      quantity: number;
    }[]
  >([]);

  const [customerInfo, setCustomerInfo] = useState<{
    customerName: string;
    tableNo: number;
  }>();

  useEffect(() => {
    try {
      const cartKey = shopUrl ? shopUrl : "";
      const customerKey = shopUrl ? shopUrl + "customerInfo" : "";
      const localCart = localStorage.getItem(cartKey);

      if (localCart) {
        setCart(JSON.parse(localCart));
      }

      const localCustomerInfo = localStorage.getItem(customerKey);

      if (localCustomerInfo) {
        setCustomerInfo(JSON.parse(localCustomerInfo));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const [QRImageData, setQRImageData] = useState("");

  useEffect(() => {
    const generateQR = async () => {
      const values = {
        accountNo: shop?.accountNo,
        accountName: shop?.accountName,
        acqId: shop?.acqId,
        addInfo: `Thanh toán hóa đơn từ ${shop?.name}`,
        amount: `${cart.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.price * currentValue.quantity,
          0,
        )}`,
        template: "print",
      };

      console.log("values: ", values);

      // const resQR = await axios.post(
      //   `https://api.vietqr.io/v2/generate`,
      //   values,
      // );

      const res = await fetch("https://api.vietqr.io/v2/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": "e72fa13f-ca76-4957-b7c1-e080f368dcd8",
          "x-api-key": "0bffd4a8-daed-4f3c-8eb5-f70088f70aca",
        },
        body: JSON.stringify(values),
      });

      const resQR = await res.json();

      console.log("resQR: ", resQR);

      const qrDataURL = resQR.data;

      console.log("QR data: ", qrDataURL);

      setQRImageData(qrDataURL["qrDataURL"]);
    };

    if (shop) {
      generateQR();
    }
  }, [shop]);

  const { loading, placeOrder } = usePlaceOrder();

  const navigate = useNavigate();

  const sendOrder = async () => {
    const res = await placeOrder(
      customerInfo?.customerName,
      customerInfo?.tableNo,
      shopUrl,
      cart,
    );

    console.log(res);

    const key = shopUrl ? shopUrl : "";

    localStorage.removeItem(key);

    localStorage.setItem(key + "orderId", res.orderId);

    navigate("../after-payment");
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
                <h1 className="font-semibold md:text-xl">{shop?.name}</h1>
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
      <main className="mt-20 mb-20 md:mb-5">
        <div className="m-auto w-96 rounded-lg border-gray-500 bg-white/90 p-5 shadow-inner">
          <h1 className="text-center text-lg sm:text-3xl font-bold dark:text-white sm:my-3">
            Quét mã dưới đây để thực hiện thanh toán
          </h1>

          {QRImageData ? (
            <div className="flex flex-col items-center">
              <img src={QRImageData} alt="qrcode" className="w-full" />
              <a href={QRImageData} download>
                <FlowbiteButton
                  className="flex items-center"
                  disabled={loading}
                >
                  <span>
                    <Download className="h-5 w-5 mr-2" />
                  </span>
                  <span>Tải ảnh xuống</span>
                </FlowbiteButton>
              </a>
            </div>
          ) : (
            <div className="w-full text-center">
              <Spinner size="xl" />
            </div>
          )}

          <div className="flex flex-col gap-3 mt-3">
            {loading ? (
              <Button className="w-full" onClick={sendOrder} disabled>
                <Spinner />
              </Button>
            ) : (
              <>
                <Button className="w-full" onClick={sendOrder}>
                  Xác nhận thanh toán thành công
                </Button>

                <Link to="../confirm-payment">
                  <Button className="w-full" variant="secondary">
                    Quay lại
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

import { useState } from "react";
import toast from "react-hot-toast";

const usePlaceOrder = () => {
  const [loading, setLoading] = useState(false);

  const placeOrder = async (
    customerName: string | undefined,
    tableNo: number | undefined,
    shopUrl: string | undefined,
    orderItems: {
      id: number;
      name: string;
      price: number;
      quantity: number;
    }[],
  ) => {
    try {
      setLoading(true);
      const res = await fetch("/api/customer/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName, tableNo, shopUrl, orderItems }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) throw new Error(data.error);

      return data;
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, placeOrder };
};
export default usePlaceOrder;

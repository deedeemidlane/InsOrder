import { useState } from "react";
import toast from "react-hot-toast";

const useGetOrder = () => {
  const [loading, setLoading] = useState(false);

  const getOrder = async (orderId: number, shopUrl: string) => {
    try {
      setLoading(true);
      const res = await fetch("/api/customer/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, shopUrl }),
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

  return { loading, getOrder };
};
export default useGetOrder;

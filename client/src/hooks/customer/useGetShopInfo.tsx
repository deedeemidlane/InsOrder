import { useState } from "react";
import toast from "react-hot-toast";

const useGetShopInfo = () => {
  const [loading, setLoading] = useState(false);

  const getShopInfo = async (shopUrl: string | undefined) => {
    try {
      setLoading(true);
      const res = await fetch("/api/customer/shop-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopUrl }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      return data;
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getShopInfo };
};
export default useGetShopInfo;

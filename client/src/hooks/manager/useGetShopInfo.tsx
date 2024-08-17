import { useState } from "react";
import toast from "react-hot-toast";

const useGetShopInfo = () => {
  const [loading, setLoading] = useState(false);

  const getShopInfo = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/manager/shop-info");

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

  return { loading, getShopInfo };
};
export default useGetShopInfo;

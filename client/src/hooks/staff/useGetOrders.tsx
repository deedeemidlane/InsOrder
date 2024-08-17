import { useState } from "react";
import toast from "react-hot-toast";

const useGetOrders = () => {
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/staff/orders");

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

  return { loading, getOrders };
};
export default useGetOrders;

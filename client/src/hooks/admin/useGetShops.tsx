import { useState } from "react";
import toast from "react-hot-toast";

const useGetShops = () => {
  const [loading, setLoading] = useState(false);

  const getShops = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/shops");

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

  return { loading, getShops };
};
export default useGetShops;

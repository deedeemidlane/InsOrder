import { getToken } from "@/services/token";
import { useState } from "react";
import toast from "react-hot-toast";

const useGetShops = () => {
  const [loading, setLoading] = useState(false);

  const getShops = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/shops`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        },
      );

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

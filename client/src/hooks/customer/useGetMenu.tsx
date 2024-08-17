import { useState } from "react";
import toast from "react-hot-toast";

const useGetMenu = () => {
  const [loading, setLoading] = useState(false);

  const getMenu = async (shopUrl: string | undefined) => {
    try {
      setLoading(true);
      const res = await fetch("/api/customer/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shopUrl }),
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

  return { loading, getMenu };
};
export default useGetMenu;

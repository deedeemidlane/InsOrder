import { useState } from "react";
import toast from "react-hot-toast";

const useCreateShop = () => {
  const [loading, setLoading] = useState(false);
  // const { setAuthUser } = useAuthContext();

  const createShop = async (inputs: {}) => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/create-shop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) throw new Error(data.error);

      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createShop };
};
export default useCreateShop;

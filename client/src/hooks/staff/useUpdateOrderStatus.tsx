import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateOrderStatus = () => {
  const [loading, setLoading] = useState(false);

  const updateOrderStatus = async (orderId: number) => {
    try {
      setLoading(true);
      const res = await fetch("/api/staff/update-order-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) throw new Error(data.error);

      toast.success(data.message);

      return data.nextStatus;
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateOrderStatus };
};
export default useUpdateOrderStatus;

import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteDish = () => {
  const [loading, setLoading] = useState(false);

  const deleteDish = async (dishId: number) => {
    try {
      setLoading(true);
      const res = await fetch("/api/manager/delete-dish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dishId: dishId }),
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

  return { loading, deleteDish };
};
export default useDeleteDish;

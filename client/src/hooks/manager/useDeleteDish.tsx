import { getToken } from "@/services/token";
import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteDish = () => {
  const [loading, setLoading] = useState(false);

  const deleteDish = async (dishId: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/manager/delete-dish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
          },
          body: JSON.stringify({ dishId: dishId }),
        },
      );

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

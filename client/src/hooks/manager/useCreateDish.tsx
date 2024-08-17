import { useState } from "react";
import toast from "react-hot-toast";

const useCreateDish = () => {
  const [loading, setLoading] = useState(false);

  const createDish = async (inputs: {}) => {
    try {
      setLoading(true);
      const res = await fetch("/api/manager/create-dish", {
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

  return { loading, createDish };
};
export default useCreateDish;

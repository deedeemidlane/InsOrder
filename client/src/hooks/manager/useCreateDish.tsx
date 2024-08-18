import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useCreateDish = () => {
  const [loading, setLoading] = useState(false);

  const createDish = async (formData: FormData) => {
    try {
      setLoading(true);

      const res = await axios.post("/api/manager/create-dish", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res);

      if (res.status >= 400) throw new Error(res.data.error);

      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createDish };
};
export default useCreateDish;

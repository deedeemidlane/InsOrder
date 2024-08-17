import { useState } from "react";
import toast from "react-hot-toast";

const useCreateStaffAccount = () => {
  const [loading, setLoading] = useState(false);

  const createStaffAccount = async (inputs: {}) => {
    try {
      setLoading(true);
      const res = await fetch("/api/manager/create-staff-account", {
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

  return { loading, createStaffAccount };
};
export default useCreateStaffAccount;

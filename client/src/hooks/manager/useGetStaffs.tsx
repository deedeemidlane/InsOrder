import { useState } from "react";
import toast from "react-hot-toast";

const useGetStaffs = () => {
  const [loading, setLoading] = useState(false);

  const getStaffs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/manager/staffs");

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

  return { loading, getStaffs };
};
export default useGetStaffs;

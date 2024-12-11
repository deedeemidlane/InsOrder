import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { getToken, removeToken } from "@/services/token";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      removeToken();

      setAuthUser(null);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;

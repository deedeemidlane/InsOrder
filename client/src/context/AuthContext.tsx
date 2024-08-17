import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type TAuthUser = {
  id: string;
  username: string;
  name: string;
  role: string;
  shopId: string;
};

const AuthContext = createContext<{
  authUser: TAuthUser | null;
  setAuthUser: Dispatch<SetStateAction<TAuthUser | null>>;
  isLoading: boolean;
}>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<TAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await fetch("/api/auth/user");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        setAuthUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isLoading,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type Product = {
  id: number;
  quantity: number;
};

const CartContext = createContext<{
  cart: Product[];
  setCart: Dispatch<SetStateAction<Product[]>>;
}>({
  cart: [],
  setCart: () => {},
});

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const key = shopUrl ? shopUrl : "";
      const localCart = localStorage.getItem(key);

      if (localCart) {
        setCart(JSON.parse(localCart));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        authUser,
        isLoading,
        setCartUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};

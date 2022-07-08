import React from "react";

type Props = {
  children: React.ReactNode;
};

type CartType = {
  itemId: number;
  title: string;
  price: number;
  qty: number;
};

type CartContextType = {
  cart: CartType[] | null;
  addToCart: (data: CartType) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CartContext = React.createContext<CartContextType | null>(null);

const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = React.useState<CartType[]>([]);
  const addToCart = (data: CartType) => {
    const itemAvailable = cart.filter(
      (cartItem) => cartItem.itemId == data.itemId
    );
    const otherData = cart.filter(
      (cartItem) => cartItem.itemId !== data.itemId
    );
    if (itemAvailable.length > 0) {
      const updatedData = {
        itemId: itemAvailable[0].itemId,
        title: itemAvailable[0].title,
        price: itemAvailable[0].price,
        qty: itemAvailable[0].qty + data.qty,
      };
      console.log(otherData);
      setCart([...otherData, updatedData]);
    } else {
      setCart([...cart, data]);
    }
  };
  const removeFromCart = (id: number) => {
    setCart(cart.filter((cartItem) => cartItem.itemId !== id));
  };
  const clearCart = () => {
    setCart([]);
  };
  const memoedValue = React.useMemo(
    () => ({ cart, addToCart, removeFromCart, clearCart }),
    [cart]
  );
  return (
    <CartContext.Provider value={memoedValue}>{children}</CartContext.Provider>
  );
};

const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart can only be used inside CartProvider");
  }
  return context;
};

export { useCart, CartProvider };

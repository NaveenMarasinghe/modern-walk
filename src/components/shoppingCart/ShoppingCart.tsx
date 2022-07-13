import { Dispatch, Fragment, useState } from "react";
import { Popover, Transition, Dialog } from "@headlessui/react";
import ShoppingCartTable from "../shoppingCartTable/ShoppingCartTable";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ProductAPI } from "../../services/product.services";
import { useUser } from "../../context/userContext";
import { useMutation, useQueryClient } from "react-query";
import Button from "../../components/button/Button";

type Props = {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

export default function ShoppingCart({ setOpen, open }: Props) {
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const { user } = useUser();
  const queryClient = useQueryClient();
  const handleClose = () => {
    setOpen(false);
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleShoppingCartButton = () => {
    setShowShoppingCart(!showShoppingCart);
  };

  const clearCart = async () => {
    if (user?.id) {
      const res = ProductAPI.clearCart(user?.id);
      console.log(res);
      return res;
    }
  };

  const mutation = useMutation(clearCart, {
    onSuccess: () => {
      queryClient.invalidateQueries("getCart");
    },
  });

  const handleClearCart = () => {
    mutation.mutate();
    closeModal();
  };

  return (
    <Popover className="relative">
      <Popover.Button
        className="btn-2-primary mx-4 hover:btn-2-primary-hover active:btn-2-primary-clicked"
        onClick={handleShoppingCartButton}
      >
        <ShoppingCartIcon />
      </Popover.Button>

      {/* clear cart modal */}
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                    <div className="flex justify-between px-8 pt-8">
                      <Dialog.Title as="div" className="text-2xl font-bold">
                        Clear cart
                      </Dialog.Title>
                      <div className="cursor-pointer" onClick={closeModal}>
                        X
                      </div>
                    </div>
                    <div className="px-8 h-24">
                      <p className="text-base font-normal">
                        Are you sure you want to remove all items in the
                        shopping cart?
                      </p>
                    </div>

                    <div className="py-[18px] px-8 flex justify-end bg-bg-elephant-grey">
                      <button
                        type="button"
                        className="btn-danger-sec hover:btn-danger-sec-hover active:btn-danger-sec-clicked m-0 hover:m-0 active:m-0 mr-4 hover:mr-4 active:mr-4"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn-danger-primary m-0 hover:m-0 active:m-0 hover:btn-danger-primary-hover active:btn-danger-primary-clicked"
                        onClick={handleClearCart}
                      >
                        Clear cart
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>

      <Transition
        as={Fragment}
        show={showShoppingCart}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel unmount={false} className="absolute z-10 right-0">
          <div className="bg-white rounded-xl pt-8 drop-shadow-selected">
            <ShoppingCartTable />
            <div className="flex justify-end mr-4 py-3">
              <button
                className="btn-1 mx-2 hover:btn-1-hover active:btn-1-clicked border-dashed"
                onClick={async () => {
                  setShowShoppingCart(false);
                }}
              >
                Close
              </button>
              <button
                className="btn-2-primary mx-2 hover:btn-2-primary-hover active:btn-2-primary-clicked"
                onClick={openModal}
              >
                Clear cart
              </button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

import { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Items } from "@typesData/items";
import { useCart } from "../../context/cartContext";
import { useUser } from "../../context/userContext";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { ProductAPI } from "../../services/product.services";

type Props = {
  data: Items;
};

export default function AddToCartModal({ data }: Props) {
  let [isOpen, setIsOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(data.price);
  const { cart, addToCart } = useCart();
  const { user } = useUser();
  const [added, setAdded] = useState(false);

  const queryClient = useQueryClient();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handlePlus = () => {
    setQty(qty + 1);
  };
  const handleMinus = () => {
    setQty(qty - 1);
  };
  useEffect(() => {
    setTotal(qty * data.price);
  }, [qty]);

  const patchCart = async (items: any) => {
    if (user?.id) {
      const res = ProductAPI.addToCart(items, user?.id);
      console.log(res);
      return res;
    }
  };

  const mutation = useMutation(patchCart, {
    onSuccess: () => {
      queryClient.invalidateQueries("getCart");
      setAdded(true);
    },
  });

  const handleAdd = async () => {
    if (user?.id) {
      const itemData = {
        userId: user.id,
        itemId: data.id,
        title: data.title,
        price: data.price,
        qty: qty,
      };
      addToCart(itemData);
      mutation.mutate(itemData);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setAdded(false);
      //   closeModal();
    }, 5000);
  }, [added]);

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hover:cursor-pointer"
        >
          Add to cart
        </button>
      </div>

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900 mt-0 text-center"
                  >
                    Add to cart
                  </Dialog.Title>
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="flex flex-col bg-white p-3">
                      <div className="flex">
                        <div className="image flex-1">
                          <img src={data.image} className="w-36" />
                        </div>
                        <div className="flex-2 flex-col w-full text-xl mx-3">
                          <div className="title w-full text-xl ml-3">
                            {data.title}
                          </div>
                          <div className="title w-full text-xl ml-3 mt-5">
                            {"Rs. " + data.price}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="flex-1">
                          <div className="mb-1 text-center">Qty</div>
                          <div className="flex justify-center">
                            <button
                              className="mx-2"
                              onClick={() => handleMinus()}
                            >
                              -
                            </button>
                            <div className="div">{qty}</div>
                            <button
                              className="mx-2"
                              onClick={() => {
                                handlePlus();
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 text-center">Total</div>
                          <div className="flex justify-center">{total}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-50 text-center p-2">
                      {!added ? (
                        <button className=" p-2 " onClick={handleAdd}>
                          Add to cart
                        </button>
                      ) : (
                        <div className=" text-green-700 text-lg">
                          Item added successfully
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

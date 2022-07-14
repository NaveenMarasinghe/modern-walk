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
          className="btn-2-primary hover:btn-2-primary-hover active:btn-2-primary-clicked"
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all drop-shadow-selected">
                  <div className="flex justify-between p-8">
                    <Dialog.Title as="div" className="text-2xl font-bold">
                      Add to cart
                    </Dialog.Title>
                    <div
                      className="text-xl text-gray cursor-pointer"
                      onClick={closeModal}
                    >
                      x
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-lg px-8">
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
                              className="h-8 w-8 rounded-lg border-none text-2xl bg-transparent hover:bg-primary-inverse-hover active:bg-primary-inverse-hover-click text-primary mx-2 align-middle"
                              onClick={() => handleMinus()}
                            >
                              -
                            </button>
                            <div className="h-8 w-8 text-center inline-flex justify-center items-center">
                              {qty}
                            </div>
                            <button
                              className="h-8 w-8 rounded-lg border-none text-2xl bg-transparent hover:bg-primary-inverse-hover active:bg-primary-inverse-hover-click text-primary mx-2 align-middle"
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
                  </div>
                  {!added ? (
                    <div className="bg-elephant-grey text-center p-4 flex">
                      <button
                        className="btn-1 mx-4 hover:btn-1-hover active:btn-1-clicked w-full flex-1 border-dashed"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn-2-primary mx-4 hover:btn-2-primary-hover active:btn-2-primary-clicked w-full flex-1"
                        onClick={handleAdd}
                      >
                        Add to cart
                      </button>
                    </div>
                  ) : (
                    <div className="flex bg-elephant-grey justify-center items-center h-20">
                      <div className=" text-primary text-lg">
                        Item added successfully
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

// import { useEffect } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useState } from "react";
// import { Items } from "@typesData/items";
// import { useCart } from "../../context/cartContext";
// import { useUser } from "../../context/userContext";
// import { useQueryClient, useMutation, useQuery } from "react-query";
// import { ProductAPI } from "../../services/product.services";
// import Styles from "./addToCartModal.module.scss";
// import Button from "../../components/button/Button";

// type Props = {
//   data: Items;
// };

// export default function AddToCartModal({ data }: Props) {
//   let [isOpen, setIsOpen] = useState(false);
//   const [qty, setQty] = useState(1);
//   const [total, setTotal] = useState(data.price);
//   const { cart, addToCart } = useCart();
//   const { user } = useUser();
//   const [added, setAdded] = useState(false);

//   const queryClient = useQueryClient();

//   function closeModal() {
//     setIsOpen(false);
//   }

//   function openModal() {
//     setIsOpen(true);
//   }

//   const handlePlus = () => {
//     setQty(qty + 1);
//   };
//   const handleMinus = () => {
//     setQty(qty - 1);
//   };
//   useEffect(() => {
//     setTotal(qty * data.price);
//   }, [qty]);

//   const patchCart = async (items: any) => {
//     if (user?.id) {
//       const res = ProductAPI.addToCart(items, user?.id);
//       console.log(res);
//       return res;
//     }
//   };

//   const mutation = useMutation(patchCart, {
//     onSuccess: () => {
//       queryClient.invalidateQueries("getCart");
//       setAdded(true);
//     },
//   });

//   const handleAdd = async () => {
//     if (user?.id) {
//       const itemData = {
//         userId: user.id,
//         itemId: data.id,
//         title: data.title,
//         price: data.price,
//         qty: qty,
//       };
//       addToCart(itemData);
//       mutation.mutate(itemData);
//     }
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       setAdded(false);
//       //   closeModal();
//     }, 5000);
//   }, [added]);

//   return (
//     <>
//       <div className="">
//         <Button onClick={openModal} varient="primary">
//           Add to cart
//         </Button>
//       </div>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className={Styles["addToCartModalTransitionDiv"]} />
//           </Transition.Child>

//           <div className={Styles["addToCartModalContainer"]}>
//             <div className={Styles["addToCartModalContent"]}>
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className={Styles["addToCartModalDialogPanel"]}>
//                   <div className={Styles["addToCartModalTitleContainer"]}>
//                     <Dialog.Title
//                       as="div"
//                       className={Styles["addToCartModalTitle"]}
//                     >
//                       Add to cart
//                     </Dialog.Title>
//                     <div
//                       className={Styles["addToCartModalClose"]}
//                       onClick={closeModal}
//                     >
//                       x
//                     </div>
//                   </div>

//                   <div className={Styles["addToCartModalContentContainer"]}>
//                     <div className={Styles["addToCartModalContent"]}>
//                       <div className={Styles["addToCartModalContentBody"]}>
//                         <div className={Styles["addToCartModalContentImage"]}>
//                           <img
//                             src={data.image}
//                             className={Styles["addToCartModalContentImageFile"]}
//                           />
//                         </div>
//                         <div className={Styles["addToCartModalContentDetails"]}>
//                           <div className={Styles["addToCartModalContentTitle"]}>
//                             {data.title}
//                           </div>
//                           <div className={Styles["addToCartModalContentPrice"]}>
//                             {"Rs. " + data.price}
//                           </div>
//                         </div>
//                       </div>
//                       <div className={Styles["addToCartModalQtyContainer"]}>
//                         <div className={Styles["addToCartModalQtyBody"]}>
//                           <div className={Styles["addToCartModalQtyTitle"]}>
//                             Qty
//                           </div>
//                           <div
//                             className={Styles["addToCartModalQtyChangeBody"]}
//                           >
//                             <button
//                               className={
//                                 Styles["addToCartModalQtyChangeButton"]
//                               }
//                               onClick={() => handleMinus()}
//                             >
//                               -
//                             </button>
//                             <div className={Styles["addToCartModalQtyAmount"]}>
//                               {qty}
//                             </div>
//                             <button
//                               className={
//                                 Styles["addToCartModalQtyChangeButton"]
//                               }
//                               onClick={() => {
//                                 handlePlus();
//                               }}
//                             >
//                               +
//                             </button>
//                           </div>
//                         </div>
//                         <div className={Styles["addToCartModalTotalBody"]}>
//                           <div className={Styles["addToCartModalTotalTitle"]}>
//                             Total
//                           </div>
//                           <div className={Styles["addToCartModalTotalAmount"]}>
//                             {total}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   {!added ? (
//                     <div className={Styles["addToCartModalButtonsContainer"]}>
//                       <Button varient="secondary" onClick={closeModal}>
//                         Cancel
//                       </Button>
//                       <Button varient="primary" onClick={handleAdd}>
//                         Add to cart
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className={Styles["addToCartModalSuccessMessage"]}>
//                       <div className="addToCartModalSuccessMessageBody">
//                         Item added successfully
//                       </div>
//                     </div>
//                   )}
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// }

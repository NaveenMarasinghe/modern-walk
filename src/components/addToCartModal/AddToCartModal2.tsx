import { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Items } from "@typesData/items";
import { useCart } from "../../context/cartContext";
import { useUser } from "../../context/userContext";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { ProductAPI } from "../../services/product.services";
import Styles from "./addToCartModal.module.scss";
import Button from "../../components/button/Button";

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
        <Button onClick={openModal} varient="primary">
          Add to cart
        </Button>
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
            <div className={Styles["addToCartModalTransitionDiv"]} />
          </Transition.Child>

          <div className={Styles["addToCartModalContainer"]}>
            <div className={Styles["addToCartModalContent"]}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={Styles["addToCartModalDialogPanel"]}>
                  <div className={Styles["addToCartModalTitleContainer"]}>
                    <Dialog.Title
                      as="div"
                      className={Styles["addToCartModalTitle"]}
                    >
                      Add to cart
                    </Dialog.Title>
                    <div
                      className={Styles["addToCartModalClose"]}
                      onClick={closeModal}
                    >
                      x
                    </div>
                  </div>

                  <div className={Styles["addToCartModalContentContainer"]}>
                    <div className={Styles["addToCartModalContent"]}>
                      <div className={Styles["addToCartModalContentBody"]}>
                        <div className={Styles["addToCartModalContentImage"]}>
                          <img
                            src={data.image}
                            className={Styles["addToCartModalContentImageFile"]}
                          />
                        </div>
                        <div className={Styles["addToCartModalContentDetails"]}>
                          <div className={Styles["addToCartModalContentTitle"]}>
                            {data.title}
                          </div>
                          <div className={Styles["addToCartModalContentPrice"]}>
                            {"Rs. " + data.price}
                          </div>
                        </div>
                      </div>
                      <div className={Styles["addToCartModalQtyContainer"]}>
                        <div className={Styles["addToCartModalQtyBody"]}>
                          <div className={Styles["addToCartModalQtyTitle"]}>
                            Qty
                          </div>
                          <div
                            className={Styles["addToCartModalQtyChangeBody"]}
                          >
                            <button
                              className={
                                Styles["addToCartModalQtyChangeButton"]
                              }
                              onClick={() => handleMinus()}
                            >
                              -
                            </button>
                            <div className={Styles["addToCartModalQtyAmount"]}>
                              {qty}
                            </div>
                            <button
                              className={
                                Styles["addToCartModalQtyChangeButton"]
                              }
                              onClick={() => {
                                handlePlus();
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className={Styles["addToCartModalTotalBody"]}>
                          <div className={Styles["addToCartModalTotalTitle"]}>
                            Total
                          </div>
                          <div className={Styles["addToCartModalTotalAmount"]}>
                            {total}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!added ? (
                    <div className={Styles["addToCartModalButtonsContainer"]}>
                      <Button varient="secondary" onClick={closeModal}>
                        Cancel
                      </Button>
                      <Button varient="primary" onClick={handleAdd}>
                        Add to cart
                      </Button>
                    </div>
                  ) : (
                    <div className={Styles["addToCartModalSuccessMessage"]}>
                      <div className="addToCartModalSuccessMessageBody">
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

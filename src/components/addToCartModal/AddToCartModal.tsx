import { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Items } from "@typesData/items";
import { useCart } from "../../context/cartContext";
import { useUser } from "../../context/userContext";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { ProductAPI } from "../../services/product.services";
import styles from "./addToCartModal.module.scss";
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
      <div>
        <Button varient="primary" onClick={openModal}>
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
            <div className={styles.modalRoot} />
          </Transition.Child>

          <div className={styles.container}>
            <div className={styles.body}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={styles.panel}>
                  <div className={styles.panelTitle}>
                    <Dialog.Title as="div" className={styles.panelTitleText}>
                      Add to cart
                    </Dialog.Title>
                    <div className={styles.panelCloseIcon} onClick={closeModal}>
                      x
                    </div>
                  </div>

                  <div className={styles.details}>
                    <div className={styles.detailsBody}>
                      <div className={styles.detailsBodyImage}>
                        <img
                          src={data.image}
                          className={styles.detailsBodyImageFile}
                        />
                      </div>
                      <div className={styles.detailsTitle}>
                        <div className={styles.detailsTitleText}>
                          {data.title}
                        </div>
                        <div className={styles.detailsPrice}>
                          {"Rs. " + data.price}
                        </div>
                      </div>
                    </div>
                    <div className={styles.qtyContainer}>
                      <div className={styles.qtyBody}>
                        <div className={styles.qtyTitle}>Qty</div>
                        <div className={styles.qtyChange}>
                          <button
                            className={styles.qtyChangeIcon}
                            onClick={() => handleMinus()}
                          >
                            -
                          </button>
                          <div className={styles.qtyAmount}>{qty}</div>
                          <button
                            className={styles.qtyChangeIcon}
                            onClick={() => {
                              handlePlus();
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className={styles.qtyTotal}>
                        <div className={styles.qtyTotalTitle}>Total</div>
                        <div className={styles.qtyTotalAmount}>{total}</div>
                      </div>
                    </div>
                  </div>
                  {!added ? (
                    <div className={styles.buttons}>
                      <Button
                        varient="secondary"
                        className={styles.button}
                        onClick={closeModal}
                      >
                        Cancel
                      </Button>
                      <Button
                        varient="primary"
                        className={styles.button}
                        onClick={handleAdd}
                      >
                        Add to cart
                      </Button>
                    </div>
                  ) : (
                    <div className={styles.itemAdded}>
                      <div className={styles.itemAddedText}>
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

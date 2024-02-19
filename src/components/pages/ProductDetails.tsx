import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";

export interface TEyeglasses {
  _id: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  frameMaterial: string;
  frameShape: string;
  lensType: string;
  brand: string;
  gender: "men" | "women";
  productImage: string;
  color: string;
}

const ProductDetails = ({
  productName,
  productPrice,
  productQuantity,
  frameMaterial,
  frameShape,
  lensType,
  brand,
  gender,
  productImage,
  color,
}: TEyeglasses) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  //modal close functio
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button
        onClick={openModal}
        className="btn btn-ghost bg-[#09867E] hover:bg-[#055752] text-white"
      >
        <IoEyeSharp />
      </button>
      {isOpen && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom py-5 sm:modal-middle md:w-1/2 mx-auto"
          open
        >
          <div className="card lg:card-side bg-base-100 shadow-xl p-10">
            <img src={productImage} alt="Album" className="w-52 h-full" />

            <div className="card-body">
              <h2 className="card-title">Name: {productName}</h2>
              <div className="flex items-center">
                <p>Price: {productPrice}</p>
                <p>Quantity: {productQuantity}</p>
              </div>
              <div className="flex items-center">
                <p>frameShape: {frameShape}</p>
                <p>gender: {gender}</p>
              </div>
              <div className="flex items-center">
                <p>lensType: {lensType}</p>
                <p>brand: {brand}</p>
              </div>
              <p>frameMaterial: {frameMaterial}</p>
              <p>color: {color}</p>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-circle text-white absolute hover:bg-red-800 right-2 top-2 bg-red-600"
                onClick={closeModal}
              >
                &#10005;
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};
export default ProductDetails;

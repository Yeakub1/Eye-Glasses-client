import moment from "moment";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export interface TEyeglasses {
  quantity: number;
  buyerName: string;
  saledata: Date;
  userEmail: string;
  productId: {
    _id: string;
    productName: string;
    productPrice: number;
    productQuantity: number;
    frameMaterial: string;
    frameShape: string;
    lensType: string;
    brand: string;
    productImage: string;
    color: string;
  };
}

const Invoice = ({
  productId,
  userEmail,
  buyerName,
  saledata,
  quantity,
}: TEyeglasses) => {
  const [isOpen, setIsOpen] = useState(false);

  //modal open function
  const openModal = () => {
    setIsOpen(true);
  };
  //modal close functio
  const closeModal = () => {
    setIsOpen(false);
  };

  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      <button
        onClick={openModal}
        className="btn bg-[#09867E] hover:bg-[#044b47] text-white"
      >
        Download
      </button>
      {isOpen && (
        <dialog id="my_modal_5" open className="modal">
          <div className="modal-box">
            <div ref={componentRef} className="p-5">
              <h1 className="text-lg text-center mb-2 text-emerald-500  font-bold ">
                Download Invoice
              </h1>
              <div className="flex justify-between">
                <div className="">
                  <p className="font-semibold">Eye Glass</p>
                  <p className="text-sm">eyeglass@gmail.com</p>
                  <p className="text-sm">+880 1811548765</p>
                  <p className="text-sm">VAT: +880 1797657407</p>
                </div>
                <div>
                  <p className="font-bold text-gray-800">Bill to:</p>
                  <p className="">{buyerName}</p>
                  <p className="">{userEmail}</p>
                  {moment(saledata).format("lll")}
                </div>
              </div>
              <div className="mt-10">
                <table className="table table-zebra w-full">
                  {/* head */}
                  <thead>
                    <tr className="text-xs">
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th> Quantity</th>
                      <th>Brand</th>
                      <th>Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-sm">
                      <th>
                        <img
                          className="w-10 h-10 rounded-full"
                          src={productId?.productImage}
                          alt="glass Photo"
                          draggable="false"
                        />
                      </th>
                      <td>{buyerName}</td>
                      <td>{productId.productPrice}</td>
                      <td>{quantity}</td>
                      <td>{productId.brand}</td>
                      <td>{productId.color}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="">
              <div className="modal-action">
                <button
                  className="btn btn-sm btn-circle text-white absolute hover:bg-red-800 right-2 top-2 bg-red-600"
                  onClick={closeModal}
                >
                  &#10005;
                </button>
              </div>
              <button
                onClick={handlePrint}
                className="btn bg-[#09867E] hover:bg-[#044b47] text-white"
              >
                Download PDF
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};
export default Invoice;

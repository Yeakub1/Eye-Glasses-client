/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaCartPlus } from "react-icons/fa";
import { toast } from "sonner";
import { useSellEyeGlassMutation } from "../../redux/features/eyeGlass/eyeGlassApi";
import { useAppSelector } from "../../redux/hooks";
import { TUser, selectCurrentUser } from "../../redux/features/auth/authSlice";

export type TSales = {
  _id: string;
  quantity: number;
};

const SellsFrom = ({ _id, quantity }: TSales) => {
  const [sellEyeGlass] = useSellEyeGlassMutation();
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);

  const role = (user as TUser).role;
  const email = (user as TUser).email;

  const openModal = () => {
    setIsOpen(true);
  };
  //modal close function
  const closeModal = () => {
    setIsOpen(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
      if (quantity > Number(data?.quantity)) {
        return toast.error(
          `At this time, the requested quantity is not available in stock: ${data?.quantity} current stock is ${quantity}`
        );
      }
    try {
    
      console.log(data);
      const selldata = {
        productId: _id,
        buyerName: data?.buyerName,
        saledata: data?.saledata,
        quantity: Number(data?.quantity),
        userEmail: email,
        role: role,
      };
      const result = await sellEyeGlass(selldata).unwrap();
      toast.success(`${result?.message}`);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "An error occurred");
    } finally {
      setTimeout(closeModal, 2000);
    }
  };
  return (
    <div>
      <button
        onClick={openModal}
        className="btn btn-ghost hover:bg-[#09867E] bg-[#042a27]   text-white"
      >
        <FaCartPlus />
      </button>
      {isOpen && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom py-5 sm:modal-middle md:w-1/2 mx-auto"
          open
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="dialog"
            className="relative modal-box border-[3px] border-gray-300"
          >
            <h1 className="text-center py-3 text-2xl font-semibold">
              Sales Management
            </h1>
            <div className="grid grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name of the buyer</span>
                </label>

                <input
                  type="text"
                  {...register("buyerName", { required: true })}
                  placeholder="product Name"
                  className="input input-bordered"
                />
                {errors.buyerName && (
                  <span className="text-red-800">
                    Name of the buyer is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date of the sale</span>
                </label>

                <input
                  type="date"
                  {...register("saledata", { required: true })}
                  placeholder="Date of the sale"
                  className="input input-bordered"
                />
                {errors.saledata && (
                  <span className="text-red-800">
                    Date of the sale is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Quantity</span>
                </label>

                <input
                  type="number"
                  {...register("quantity", { required: true })}
                  placeholder="Quantity"
                  className="input input-bordered"
                />
                {errors.quantity && (
                  <span className="text-red-800">Quantity is required</span>
                )}
              </div>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-sm btn-circle text-white absolute hover:bg-red-800 right-2 top-2 bg-red-600"
                onClick={closeModal}
              >
                &#10005;
              </button>
            </div>
            <div className="flex justify-center">
              <input
                className="btn btn-active btn-accent text-white"
                type="submit"
                value="submit"
              />
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};
export default SellsFrom;

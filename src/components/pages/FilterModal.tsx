import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
type PropsSearch = {
  setFilter: Dispatch<SetStateAction<object>>;
};
const FilterModal = ({ setFilter }: PropsSearch) => {
  const [isOpen, setIsOpen] = useState(false);

  //modal open function
  const openModal = () => {
    setIsOpen(true);
  };
  //modal close functio
  const closeModal = () => {
    setIsOpen(false);
  };

  const { register, handleSubmit, reset } = useForm();

  const handledormData = (data: FieldValues) => {
    const isValidNumber = (value: number) =>
      !isNaN(value) && typeof value === "number";
    const shoeInfo = {
      productQuantity: isValidNumber(data?.productQuantity)
        ? parseInt(data?.productQuantity)
        : undefined,
      productPrice: isValidNumber(data?.productPrice)
        ? parseInt(data?.productPrice)
        : undefined,
      productName: data?.productName,
      brand: data?.brand,
      frameMaterial: data?.frameMaterial,
      frameShape: data?.frameShape,
      lensType: data?.lensType,
      color: data?.color,
      gender: data?.gender,
    };
    reset();
    const filteredShoeInfo = Object.fromEntries(
      Object.entries(shoeInfo).filter(([_, value]) => value !== undefined)
    );
    setFilter(filteredShoeInfo);
    closeModal();
    console.log(data);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="btn bg-[#09867E] hover:bg-[#044b47] text-white"
      >
        Filter Glasses
      </button>
      {isOpen && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom py-5 flex justify-center items-center h-full w-full"
          open
        >
          <form
            onSubmit={handleSubmit(handledormData)}
            className="border-[3px] border-gray-300 p-8 relative  rounded-lg bg-gray-100 auth-shadow"
          >
            <h1 className="text-lg text-center mb-2 text-emerald-500  font-bold ">
              Filter Glass
            </h1>
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">Name</span>
                </label>
                <input
                  type="text"
                  {...register("productName")}
                  placeholder="Enter Name"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">Quantity</span>
                </label>
                <input
                  type="number"
                  {...register("productQuantity")}
                  placeholder="Enter quantity"
                  className="input input-bordered"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">Price</span>
                </label>
                <input
                  type="number"
                  {...register("productPrice")}
                  placeholder="Enter price"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">frameShape</span>
                </label>
                <select
                  {...register("frameShape")}
                  className="select select-bordered w-full "
                >
                  <option disabled value="">
                    select Frame Shape
                  </option>
                  <option value="rectangular">rectangular</option>
                  <option value="round">round</option>
                  <option value="cat-eye">cat-eye</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">Brand</span>
                </label>
                <input
                  type="text"
                  {...register("brand")}
                  placeholder="Enter brand"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">frame Material</span>
                </label>
                <select
                  {...register("frameMaterial")}
                  className="select select-bordered w-full "
                >
                  <option disabled value="">
                    select Frame Material
                  </option>
                  <option value="metal">metal</option>
                  <option value="plastic">plastic</option>
                  <option value="acetate">acetate</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">Color</span>
                </label>
                <input
                  type="text"
                  {...register("color")}
                  placeholder="Enter color"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-color">Gender</span>
                </label>
                <select
                  {...register("gender")}
                  className="select select-bordered w-full "
                >
                  <option disabled value="">
                    select gender
                  </option>
                  <option value="men">men</option>
                  <option value="women">women</option>
                  <option value="unisex">unisex</option>
                </select>
              </div>
            </div>
            {/* sisth row */}
            <div className="form-control w-full mt-4">
              <button
                type="submit"
                className="btn bg-[#09867E] text-white hover:bg-[#04514b] border-0"
              >
                Filter
              </button>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-circle text-white absolute hover:bg-red-800 right-2 top-2 bg-red-600"
                onClick={closeModal}
              >
                &#10005;
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default FilterModal;

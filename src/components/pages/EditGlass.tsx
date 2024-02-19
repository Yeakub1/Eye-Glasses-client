/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "sonner";
import { useUpdateEyeGlassMutation } from "../../redux/features/eyeGlass/eyeGlassApi";
const image_upload_token = import.meta.env.VITE_Image_Upload_Token;

export type TEyeglasses ={
  _id: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  frameMaterial: string;
  frameShape: string;
  lensType: string;
  brand: string;
  gender: "men" | "women" | "unisex";
  productImage: string;
  color: string;
}

const EditGlass = ({
  _id,
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
  const [updateEyeGlass] = useUpdateEyeGlassMutation();

  const [isOpen, setIsOpen] = useState(false);
  const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;
  const openModal = () => {
    setIsOpen(true);
  };
  //modal close functio
  const closeModal = () => {
    setIsOpen(false);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    try {
      let imgUrl: string | undefined = undefined;

      if (data.productImage?.length > 0) {
        const imgdata = new FormData();
        imgdata.append("image", data?.productImage[0]);

        const response = await fetch(image_upload_url, {
          method: "POST",
          body: imgdata,
        });

        const uploadImage = await response.json();
        if (uploadImage.success) {
          imgUrl = uploadImage?.data?.display_url;
        }
      }

      const glassInfo = {
        id: _id,
        eyeglass: {
          productName: data?.productName || productName,
          productImage: imgUrl || productImage,
          productPrice: parseInt(data?.productPrice) || productPrice,
          price: parseInt(data?.price),
          productQuantity: parseInt(data?.productQuantity) || productQuantity,
          brand: data?.brand || brand,
          frameMaterial: data?.frameMaterial || frameMaterial,
          frameShape: data?.frameShape || frameShape,
          lensType: data?.lensType || lensType,
          color: data?.color || color,
          gender: data?.gender || gender,
        },
      };
      const result = await updateEyeGlass(glassInfo).unwrap();
      toast.success(`${result?.message}`);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "An error occurred");
    } finally {
      closeModal();
    }
  };
  return (
    <div>
      <button
        onClick={openModal}
        className="btn btn-ghost hover:bg-[#09867E] bg-[#042a27]   text-white"
      >
        <FaRegEdit />
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
            className="relative modal-box"
          >
            <h1 className="text-center py-3 text-3xl font-semibold">
              Edit Product
            </h1>
            <div className="grid grid-cols-2 gap-3">
              <div className="">
                <p>Product Name</p>
                <input
                  type="text"
                  {...register("productName")}
                  placeholder="Type here"
                  defaultValue={productName}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="">
                <p>Product Price</p>
                <input
                  type="text"
                  {...register("productPrice")}
                  placeholder="Type here"
                  defaultValue={productPrice}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="">
                <p>Product Quantity</p>
                <input
                  type="text"
                  {...register("productQuantity")}
                  placeholder="Type here"
                  defaultValue={productQuantity}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="">
                <p>frameMaterial</p>
                <input
                  type="text"
                  {...register("frameMaterial")}
                  placeholder="Type here"
                  defaultValue={frameMaterial}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="">
                <p>frame Shape</p>
                <input
                  type="text"
                  {...register("frameShape")}
                  placeholder="Type here"
                  defaultValue={frameShape}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="">
                <p>lens Type</p>
                <input
                  type="text"
                  {...register("lensType")}
                  placeholder="Type here"
                  defaultValue={lensType}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="">
                <p>Brand</p>
                <input
                  type="text"
                  {...register("brand")}
                  placeholder="Type here"
                  defaultValue={brand}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="">
                <p>Gender</p>
                <input
                  type="text"
                  {...register("gender")}
                  placeholder="Type here"
                  defaultValue={gender}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="">
                <p>Image</p>
                <input
                  type="file"
                  {...register("productImage")}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="">
                <p>Color</p>
                <input
                  {...register("color")}
                  type="text"
                  placeholder="Type here"
                  defaultValue={color}
                  className="input input-bordered w-full max-w-xs"
                />
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
export default EditGlass;

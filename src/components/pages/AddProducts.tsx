import { FieldValues, useForm } from "react-hook-form";
import { useAddEyeGlassMutation } from "../../redux/features/eyeGlass/eyeGlassApi";
import { toast } from "sonner";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
const image_upload_token = import.meta.env.VITE_Image_Upload_Token;

const AddProducts = () => {
    const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_upload_token}`;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addGlass] = useAddEyeGlassMutation({});
  const user = useAppSelector(selectCurrentUser);

 const onSubmit = (data: FieldValues) => {
   const toastId = toast.loading("Please wait...");
   try {
     const formData = new FormData();
     formData.append("image", data.productImage[0]);
     fetch(image_upload_url, {
       method: "POST",
       body: formData,
     })
       .then((res) => res.json())
       .then(async (profileResponse) => {
         if (profileResponse.success) {
           const productImageURL = profileResponse.data.display_url;
           const productPriceConvert = Number(data.productPrice);
           const productQuantityConvert = Number(data.productQuantity);

           const {
             productName,
             frameMaterial,
             frameShape,
             lensType,
             brand,
             gender,
             color,
           } = data;

           const glassData = {
             productName,
             productPrice: productPriceConvert,
             productQuantity: productQuantityConvert,
             productImage: productImageURL,
             frameMaterial,
             frameShape,
             lensType,
             brand,
             gender,
             color,
             userEmail: user?.email,
           };
           await addGlass(glassData);
           console.log({ glassData });
           reset()
           toast.success("Product added successfully!", {
             id: toastId,
             duration: 2000,
           });
         }
       });
   } catch (error) {
     toast.error("Something went wrong!", { id: toastId, duration: 2000 });
   }
 };
  return (
    <div className="">
      <div className="flex justify-center p-5 bg-[#09867E] text-white text-2xl font-semibold">
        <h1> Add Procuct</h1>
      </div>
      <div className="max-w-7xl mx-auto mt-7">
        <div className="card mx-auto flex-shrink-0  max-w-4xl shadow-2xl bg-base-100">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body grid md:grid-cols-2 items-center border-[3px] border-gray-300"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product name</span>
              </label>

              <input
                type="text"
                {...register("productName", { required: true })}
                placeholder="product Name"
                className="input input-bordered"
              />
              {errors.productName && (
                <span className="text-red-800">product Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product price</span>
              </label>

              <input
                type="number"
                {...register("productPrice", { required: true })}
                placeholder="Product price"
                className="input input-bordered"
              />
              {errors.productPrice && (
                <span className="text-red-800">Product price is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product quantity</span>
              </label>

              <input
                type="number"
                {...register("productQuantity", { required: true })}
                placeholder="Product quantity"
                className="input input-bordered"
              />
              {errors.productQuantity && (
                <span className="text-red-800">
                  Product quantity is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Frame Material</span>
              </label>

              <select
                {...register("frameMaterial", { required: true })}
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Frame Shape</span>
              </label>
              <select
                {...register("frameShape", { required: true })}
                className="select select-bordered w-full "
              >
                <option disabled value="">
                  select Frame Shape
                </option>
                <option value="rectangular">rectangular</option>
                <option value="round">round</option>
                <option value="cat-eye">cat-eye</option>
              </select>
              {errors.frameShape && (
                <span className="text-red-800">Frame Shape is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Lens Type</span>
              </label>

              <input
                type="text"
                {...register("lensType", { required: true })}
                placeholder="Lens Type"
                className="input input-bordered"
              />
              {errors.lensType && (
                <span className="text-red-800">Lens Type is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Brand</span>
              </label>

              <input
                type="text"
                {...register("brand", { required: true })}
                placeholder="Brand"
                className="input input-bordered"
              />
              {errors.brand && (
                <span className="text-red-800">Brand is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">gender</span>
              </label>
              <div className="border-2 rounded-lg">
                <select
                  className="select select-ghost w-full max-w-full"
                  {...register("gender", { required: true })}
                >
                  <option disabled selected>
                    Select gender
                  </option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>

              {errors.gender && (
                <span className="text-red-800">gender is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">product Image</span>
              </label>

              <input
                type="file"
                {...register("productImage", { required: true })}
                placeholder="product Image"
                className="input input-bordered"
              />
              {errors.productImage && (
                <span className="text-red-800">product Image is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product color</span>
              </label>

              <input
                type="text"
                {...register("color", { required: true })}
                placeholder="product color"
                className="input input-bordered"
              />
              {errors.color && (
                <span className="text-red-800">product color is required</span>
              )}
            </div>

            <div className="form-control mt-6 ">
              <input
                className="btn bg-[#09867E] text-white hover:bg-[#04514b] "
                type="submit"
                value="Add Product"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddProducts;

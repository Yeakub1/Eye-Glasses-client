/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { TUser, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetAllEyeGlassQuery } from "../../redux/features/eyeGlass/eyeGlassApi";
import { useAppSelector } from "../../redux/hooks";
import Lodaing from "../../utils/Lodaing";
import ProductDetails from "./ProductDetails";
import SellsFrom from "./SellsFrom";

const SalesProducts = () => {
  const user = useAppSelector(selectCurrentUser);
   const role = (user as TUser).role;
   const email = (user as TUser).email;
  
  const [name, setName] = useState<string>('');
  const { data: allglass, isLoading } = useGetAllEyeGlassQuery({name, role, email});
  if (isLoading) {
    return <Lodaing/>
    }
    


  return (
    <div className="">
      <div className="flex justify-center p-5 bg-[#09867E] text-white text-2xl font-semibold">
        <h1> All Products</h1>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center px-10">
          <h3 className="text-xl font-semibold my-4">
            Total glasss: {allglass?.data?.length}
          </h3>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered"
            placeholder="Product Name"
          />
        </div>
        <div className="overflow-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr className="text-lg">
                <th>Sl</th>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Details</th>
                <th>Sell</th>
              </tr>
            </thead>
            <tbody>
              {allglass && allglass.data.length > 0 ? (
                allglass?.data.map((glass: any, index: number) => (
                  <tr key={glass?._id}>
                    <th>{index + 1}</th>
                    <th>
                      <img
                        className="w-12 h-12 rounded-full"
                        src={glass.productImage}
                        alt="glass Photo"
                        draggable="false"
                      />
                    </th>
                    <td>{glass?.productName}</td>
                    <td>{glass.productQuantity}</td>
                    <td>
                      <ProductDetails {...glass} />
                    </td>

                    <td>
                      <SellsFrom {...glass} />
                    </td>
                  </tr>
                ))
              ) : (
                <p>No glasses available</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default SalesProducts;

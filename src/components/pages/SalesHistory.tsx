/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductDetails from "./ProductDetails";
import { useState } from "react";
import { useGetAllSalesQuery } from "../../redux/features/sales/salesApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import Invoice from "./Invoice";

const SalesHistory = () => {
  const user = useAppSelector(selectCurrentUser);
  const [params, setParams] = useState({ filter: "" });
  const { data: getAllSales } = useGetAllSalesQuery({ params, user });
  console.log(getAllSales)
  return (
    <div className="">
      <div className="flex justify-center p-5 bg-[#09867E] text-white text-2xl font-semibold">
        <h1> Sales History</h1>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center px-10">
          <h3 className="text-xl font-semibold my-4">
            Total Sales: {getAllSales?.data?.length}
          </h3>
          <select
            onChange={(event) => setParams({ filter: event.target.value })}
            className="select select-accent  w-full lg:w-56"
          >
            <option disabled defaultValue="">
              Filter By Date
            </option>
            <option value={""}>All Sells</option>
            <option value={"daily"}>Daily</option>
            <option value={"weekly"}>Weekly</option>
            <option value={"monthly"}>Monthly</option>
            <option value={"yearly"}>Yearly</option>
          </select>
        </div>
        <div className="overflow-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr className="text-lg">
                <th>SL</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Details</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {getAllSales && getAllSales.data.length > 0 ? (
                getAllSales?.data.map((glass: any, index: number) => (
                  <tr key={glass?._id}>
                    <th>{index + 1}</th>
                    <th>
                      <img
                        className="w-12 h-12 rounded-full"
                        src={glass?.productId?.productImage}
                        alt="glass Photo"
                        draggable="false"
                      />
                    </th>
                    <td>{glass?.buyerName}</td>

                    <td>
                      <td>{glass.quantity}</td>
                    </td>
                    <td>
                      <ProductDetails {...glass?.productId} />
                    </td>
                    <td>
                      <Invoice {...glass} />
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
export default SalesHistory;

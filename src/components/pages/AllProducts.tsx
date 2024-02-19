/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaTrash, FaTrashAlt } from "react-icons/fa";
import {
  useAlldeleteEyeGlassMutation,
  useDeleteEyeGlassMutation,
  useGetAllEyeGlassQuery,
} from "../../redux/features/eyeGlass/eyeGlassApi";
import { toast } from "sonner";
import Swal from "sweetalert2";
import EditGlass from "./EditGlass";
import ProductDetails from "./ProductDetails";
import FilterModal from "./FilterModal";
import { useState } from "react";
import CreateVarient from "./CreateVarient";
import Lodaing from "../../utils/Lodaing";
import { useAppSelector } from "../../redux/hooks";
import { TUser, selectCurrentUser } from "../../redux/features/auth/authSlice";

const AllProducts = () => {
  const [deleteEyeGlass] = useDeleteEyeGlassMutation();
  const [filter, setFilter] = useState({});
  const [delet, setDelet] = useState<string[]>([]);
  const [alldeleteEyeGlass] = useAlldeleteEyeGlassMutation();
  const user = useAppSelector(selectCurrentUser);

 const role = (user as TUser).role;
 const email = (user as TUser).email;
  
    
  
  const { data: allglass, isLoading } = useGetAllEyeGlassQuery({...filter,role, email});
  if (isLoading) {
    return <Lodaing/>
  }

  const handleDeleteglass = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteEyeGlass(id).unwrap();
        toast.success(result?.message);
      }
    });
  };

   const deleteMultipullGlass = async () => {
     Swal.fire({
       title: "Are you sure?",
       text: "You won't be able to revert this!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Yes, delete it!",
     }).then(async (result) => {
       if (result.isConfirmed) {
         const result = await alldeleteEyeGlass(delet).unwrap();
         toast.success(result?.message);
       }
     });
   };

  const handleCheckboxChange = (glassId: string) => {
    setDelet((prevDelet) => {
      if (prevDelet.includes(glassId)) {
        return prevDelet.filter((id) => id !== glassId);
      } else {
        return [...prevDelet, glassId];
      }
    });
  };

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
          <FilterModal setFilter={setFilter} />
        </div>
        <div className="overflow-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr className="text-lg">
                <th>
                  <button
                    onClick={deleteMultipullGlass}
                    className={`${
                      delet.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={delet?.length === 0}
                  >
                    <FaTrash className="text-xl " />
                  </button>
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Details</th>
                <th>Edit</th>
                <th>Create Variant</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allglass && allglass.data.length > 0 ? (
                allglass?.data.map((glass:any) => (
                  <tr key={glass?._id}>
                    <th>
                      <input
                        className="mr-3"
                        onChange={() => handleCheckboxChange(glass?._id)}
                        type="checkbox"
                        name="complet"
                        id="complet"
                        checked={delet.includes(glass?._id)}
                      />
                    </th>
                    <th>
                      <img
                        className="w-12 h-12 rounded-full"
                        src={glass.productImage}
                        alt="glass Photo"
                        draggable="false"
                      />
                    </th>
                    <td>{glass?.productName}</td>
                    <td>
                      <ProductDetails {...glass} />
                    </td>
                    <td>
                      <EditGlass {...glass} />
                    </td>
                    <td>
                      <CreateVarient  {...glass} />
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteglass(glass?._id)}
                        className="btn btn-ghost bg-red-600 hover:bg-red-900  text-white"
                      >
                        <FaTrashAlt />
                      </button>
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
export default AllProducts;

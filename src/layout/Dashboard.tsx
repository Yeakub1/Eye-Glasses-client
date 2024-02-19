import { Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { PiEyeglassesBold} from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { GrHistory } from "react-icons/gr";
import ActiveLink from "../components/hooks/ActiveLink";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "sonner";
import { logout } from "../redux/features/auth/authSlice";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Dashbord = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const toastId = toast.loading("loading...");
    dispatch(logout());
    toast.success("Logged out", { id: toastId, duration: 2000 });
  };
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className=" flex justify-center drawer-button lg:hidden"
          >
            <div className="btn bg-[#09867E] text-white text-2xl font-bold ">
              <IoMenu />
            </div>
          </label>
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 bg-[#09867E]  min-h-full text-white text-lg">
            <div className="flex flex-col items-center mt-6 mb-5 -mx-2">
              <h4 className="mx-2 text-center font-medium text-white flex items-center gap-3">
                <PiEyeglassesBold className="text-3xl" /> Eye Glasses
              </h4>
            </div>
            {/* Sidebar content here */}
            <>
              <ActiveLink to="/">
                <li>
                  <p>All Procucts</p>
                </li>
              </ActiveLink>
              <ActiveLink to="add-product">
                <li>
                  <p>
                    <IoIosAddCircleOutline />
                    Add Product
                  </p>
                </li>
              </ActiveLink>
              <ActiveLink to="sales-product">
                <li>
                  <p>
                    <FaShoppingCart />
                    Sales Product
                  </p>
                </li>
              </ActiveLink>
              <ActiveLink to="sales-history">
                <li>
                  <p>
                    <GrHistory />
                    Sales History
                  </p>
                </li>
              </ActiveLink>
            </>
            <li onClick={handleLogout} className="mt-10 cursor-pointer flex items-center gap-2">
              <RiLogoutCircleRLine className="h-5 w-5 text-white" />
              Log Out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashbord;

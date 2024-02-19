import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { TUser, setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

    const navigate = useNavigate();
    const [userLogin] = useLoginMutation();
    const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {
    try {
     const toastId = toast.loading("Logging in...");

    const userInfo = {
      email: data.email,
      password: data.password,
    };
    
    const res = await userLogin(userInfo).unwrap();
    const user = verifyToken(res.data.accessToken) as TUser;
    dispatch(setUser({ user, token: res.data.accessToken }));
    toast.success("Logged in", { id: toastId, duration: 2000 });
    navigate(`/`);
    } catch (err) {
      console.log(err)
  }
  };
    return (
      <div className="max-w-7xl mx-auto mt-32">
        <div className="card mx-auto flex-shrink-0 max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-center text-3xl font-semibold py-2">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-800">Email is required</span>
              )}
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                  })}
                  placeholder="password"
                  className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full"
                />
                <div
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEye className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaEyeSlash className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>

              {errors.password && (
                <p className="text-red-800">Password is required</p>
              )}
            </div>
            <label className="label">
              <Link
                to="/resetpassword"
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </Link>
            </label>

            <div className="form-control mt-6">
              <input
                className="btn bg-[#09867E] hover:bg-[#044d48] text-white "
                type="submit"
                value="Login"
              />
            </div>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Registration here
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
};

export default Login;

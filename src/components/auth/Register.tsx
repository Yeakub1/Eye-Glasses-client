/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { useUserRegisterMutation } from "../../redux/features/auth/authApi";

const Register = () => {
  const [userRegister] = useUserRegisterMutation()
    const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

const onSubmit = async (data: FieldValues) => {
  const toastId = toast.loading("Please wait...");
  try {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    console.log(userInfo)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await userRegister(userInfo);

    if (res?.error?.data) {
      toast.error(`${data.email} Already used`, {
        id: toastId,
        duration: 2000,
      });
    } else {
      toast.success("Registration successful!", {
        id: toastId,
        duration: 2000,
      });
      navigate("/login");
    }
  } catch (error) {
    toast.error("Something went wrong!", { id: toastId, duration: 2000 });
  }
};

  return (
    <div className="max-w-7xl mx-auto mt-28">
      <div className="card mx-auto flex-shrink-0  max-w-sm shadow-2xl bg-base-100">
        <h1 className="text-center text-3xl font-semibold py-2">
          Registration
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>

            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Your Name"
              className="input input-bordered"
            />
            {errors.name && (
              <span className="text-red-800">Name is required</span>
            )}
          </div>
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
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
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
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">is less than 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600">don't have a capital letter</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">don't have a special character</p>
            )}
          </div>

          <div className="form-control mt-6">
            <input
              className="btn bg-[#09867E] hover:bg-[#044d48] text-white"
              type="submit"
              value="Registration"
            />
          </div>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

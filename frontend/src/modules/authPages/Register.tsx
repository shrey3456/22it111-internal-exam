import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/authSlice";

// Types
import { IRegisterUser } from "./type";
import { userApiEndPoint } from "../../utils/apiEndPoints";
import { RootState } from "../../redux/store";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterUser>();

  // Submit function
  const submitData = async (data: IRegisterUser) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("role", data.role);
    if (data.profilePhoto?.[0]) {
      formData.append("profilePhoto", data.profilePhoto[0]);
    }

    try {
      dispatch(setLoading(true));
      const response = await fetch(`${userApiEndPoint}/register`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        navigate("/login");
        toast.success(responseData.message);
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.message || "An error occurred during registration"
        );
      }
    } catch (error) {
      console.log("Error while registering user", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <main className="w-full relaive z-[1] md:h-screen py-[20px] bg-[url('/image/auth-bg.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
      <div className="fixed top-0  left-0 w-full h-full bg-gradient-to-b from-transparent to-[#161c2d]" />
      <div className="relative z-[1] flex items-center justify-center w-full h-full  px-[20px]">
        {/* Form section */}
        <form
          className="max-w-[400px] w-full p-4 bg-dark-blue rounded-lg"
          onSubmit={handleSubmit(submitData)}
        >
          <img
            src="/image/logo-light.png"
            className="w-[120px] h-auto object-cover mx-auto"
            alt=""
          />
          <h1 className="!text-white font-poppin font-medium my-2">Register</h1>

          {/* Fullname input */}
          <div className="mb-2">
            <label className="text-xs text-white font-poppin">Your Name:</label>
            <input
              type="text"
              className="mt-1 w-full h-[40px] placeholder:text-slate text-slate rounded-md px-2 border text-xs focus:outline-none border-[#94a3b857] bg-transparent focus:border-green"
              placeholder="Harry"
              {...register("fullName", { required: "Name is required" })}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* email input */}
          <div className="mb-2">
            <label className="text-xs text-white font-poppin">
              Your Email:
            </label>
            <input
              type="email"
              className="mt-1 w-full h-[40px] placeholder:text-slate text-slate rounded-md px-2 border text-xs focus:outline-none border-[#94a3b857] bg-transparent focus:border-green"
              placeholder="Testing@gmail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone input */}
          <div className="mb-2">
            <label
              htmlFor="username"
              className="text-xs text-white font-poppin"
            >
              Number:
            </label>
            <input
              type="tel"
              className="mt-1 w-full h-[40px] placeholder:text-slate text-slate rounded-md px-2 border text-xs focus:outline-none border-[#94a3b857] bg-transparent focus:border-green"
              placeholder="03230838836"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* password input */}
          <div className="mb-2">
            <label
              htmlFor="password"
              className="text-xs text-white font-poppin"
            >
              Password:
            </label>
            <input
              type="password"
              className="mt-1 w-full h-[40px] placeholder:text-slate text-slate rounded-md px-2 border text-xs focus:outline-none border-[#94a3b857] bg-transparent focus:border-green"
              placeholder="Harry"
              {...register("password", { required: "Name is required" })}
              onFocus={(e) => (e.target.type = "text")}
              onBlur={(e) => (e.target.type = "password")}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* File input */}
          <div className="!text-xs">
            <label
              htmlFor="password"
              className="text-xs text-white font-poppin"
            >
              Select Image:
            </label>
            <input
              accept="image/*"
              type="file"
              className="mt-1 w-full h-[40px] max-w-full text-xs text-white bg-transparent file-input rounded-md border border-[#94a3b857]"
              {...register("profilePhoto", { required: "Image is required" })}
            />
            {errors.profilePhoto && (
              <p className="mt-1 text-xs text-red-500">
                {errors.profilePhoto.message}
              </p>
            )}
          </div>

          {/* Select role */}
          <div>
            <span className="text-xs text-white font-poppin">Select Role:</span>
            <div className="flex mt-2 gap-x-4">
              <div className="flex items-center text-xs text-white gap-x-1">
                <input
                  type="radio"
                  className="radio radio-xs radio-accent"
                  value="student"
                  {...register("role", { required: "Role is required" })}
                />
                <span>Student</span>
              </div>
              <div className="flex items-center text-xs text-white gap-x-1">
                <input
                  type="radio"
                  className="radio radio-xs radio-accent"
                  value="recruitor"
                  {...register("role", { required: "Role is required" })}
                />
                <span>Recruitor</span>
              </div>
            </div>
            {errors.role && (
              <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>
            )}
          </div>

          {/* Submit button */}
          <div className="mt-3">
            <button type="submit" className="w-full primary-btn">
              {loading ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                "Register"
              )}
            </button>
            <p className="mt-2 text-xs text-center text-white">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-green">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;

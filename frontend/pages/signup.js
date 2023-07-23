import Link from "next/link";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import MainLayout from "../layouts/mainLayout";
import { AppContext } from "../contexts/appContext";
import { callApi } from "../apis/callApi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
export default function Login() {
  return (
    <MainLayout title={"Create an account"}>
      <Signup />
    </MainLayout>
  );
}

function Signup() {
  const { push } = useRouter();

  const { setLoader, session } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoader(true);
    const { response, err } = await callApi("POST", "/user/signup", data);
    setLoader(false);
    if (err) {
      toast(err.message || JSON.stringify(err));
    } else {
      toast("User signup successfully!");
      push("/login");
    }
  };
  useEffect(() => {
    if (session?.isLoggedIn) {
      push("/");
    }
  }, [session]);

  return (
    <div className="p-10">
      <div className="grid grid-cols-1">
        <form
          className="col-span-1 justify-center align-middle m-auto rounded-md px-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" text-center bg-gray-400 rounded-sm p-10">
            <div className="">
              <h1 className="text-2xl font-semibold">Blogsite Account</h1>
              <small className="text-sm text-gray-600">
                Fill the details and create your account for free
              </small>
            </div>
          </div>
          <div className="mt-3">
            <div>
              <div className="pt-3">
                <input
                  className="w-full border-blue-500 text-sm font-bold border mt-2 px-4 py-2 rounded-sm"
                  placeholder="Full name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-xs text-red-600 pt-2">
                    {"Name is required"}
                  </p>
                )}
              </div>
              <div className="pt-3">
                <input
                  className="w-full border-blue-500 text-sm font-bold border mt-2 px-4 py-2 rounded-sm"
                  placeholder="Address"
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <p className="text-xs text-red-600 pt-2">
                    {"Address is required"}
                  </p>
                )}
              </div>
              <div className="pt-3">
                <input
                  className="w-full border-blue-500 text-sm font-bold border mt-2 px-4 py-2 rounded-sm"
                  placeholder="contact"
                  {...register("contact", { required: true })}
                />
                {errors.contact && (
                  <p className="text-xs text-red-600 pt-2">
                    {"Contact is required"}
                  </p>
                )}
              </div>
              <div className="pt-3">
                <input
                  className="w-full border-blue-500 text-sm font-bold border mt-2 px-4 py-2 rounded-sm"
                  placeholder="Email Address"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-xs text-red-600 pt-2">
                    {"Email is required"}
                  </p>
                )}
              </div>
              <div className="pt-3">
                <input
                  className="w-full border-blue-500 text-sm font-bold border mt-2 px-4 py-2 rounded-sm"
                  placeholder="Password"
                  type={"password"}
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-xs text-red-600 pt-2">
                    {"Password is required"}
                  </p>
                )}
              </div>
            </div>
            <div className="pt-5">
              <button className="w-full bg-brand rounded-sm py-2 font-bold hover:bg-blue-600 text-white">
                Create Account
              </button>
            </div>
            <div className="pt-5 text-center text-brand text-sm font-bold">
              <Link href={"/login"}>
                <a>Already have an account?</a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

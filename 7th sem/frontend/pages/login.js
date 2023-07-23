import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { callApi } from "../apis/callApi";
import { AppContext } from "../contexts/appContext";
import MainLayout from "../layouts/mainLayout";

export default function Login() {
  return (
    <MainLayout title={"Our Finished Projects"}>
      <LoginPage />
    </MainLayout>
  );
}

function LoginPage() {
  const { push } = useRouter();
  const { setLoader, loginUser, session } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoader(true);
    const { response, err } = await callApi("POST", "/user/login", data);
    setLoader(false);
    if (err) {
      toast(err.message || JSON.stringify(err));
    } else {
      toast(response?.message);
      loginUser(response?.data);
      // push("/");
      window.location = "/";
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
          className="col-span-1 justify-center align-middle m-auto rounded-md p-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" text-center bg-gray-400 py-8 px-10 rounded-sm">
            <div className="">
              <h1 className="text-2xl font-semibold">Blogsite Login</h1>
              <small className="text-sm text-gray-600">
                provide credentials and get access
              </small>
            </div>
          </div>
          <div className="mt-2">
            <div className="pt-5">
              <input
                className="w-full border-blue-500 text-sm font-bold border mt-2 px-4 py-2 rounded-sm"
                placeholder="Username"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-xs text-red-600 pt-2">
                  {"Username is required"}
                </p>
              )}
            </div>
            <div className="pt-5">
              <input
                className="w-full border-blue-500 text-sm font-bold border mt-2 px-4 py-2 rounded-sm"
                type={"password"}
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-xs text-red-600 pt-2">
                  {"Password is required"}
                </p>
              )}
            </div>
            <div className="pt-5">
              <button className="w-full bg-brand rounded-sm py-2 font-bold hover:bg-blue-600 text-white">
                Login
              </button>
            </div>
            <div className="pt-5 text-center text-brand text-sm font-bold">
              <Link href={"/signup"}>
                <a>Do not have account?Register</a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

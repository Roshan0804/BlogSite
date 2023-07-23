import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../../contexts/appContext";
import AdminLayout from "../../layouts/adminLayout";
import { callApi, callAuthApi } from "../../apis/callApi";

export default function Setting() {
  const [user, setUser] = useState({});
  const [password, setPassword] = useState({});
  const { session, setLoader } = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      setUser(session?.user);
    }, 2000);
  }, []);

  async function submit(e) {
    e.preventDefault();
    setLoader(true);
    const { response, err } = await callAuthApi(
      "PATCH",
      "/user/" + session?.user?._id,
      { name: user.name, address: user.address, contact: user.contact }
    );
    setLoader(false);
    if (!err && response) {
      toast.success(response?.message);
    } else {
      toast.error(err?.message || JSON.stringify(err));
    }
  }

  async function changePass(e) {
    e.preventDefault();
    setLoader(true);
    const { response, err } = await callAuthApi(
      "PATCH",
      "/change-password",
      password
    );
    setLoader(false);
    if (!err && response) {
      toast.success(response?.message);
    } else {
      toast.error(err?.message || JSON.stringify(err));
    }
  }

  return (
    <AdminLayout title={"Profile settings"}>
      <div className="">
        <form onSubmit={submit} className="border p-5">
          <h2 className="text-xl font-bold mb-5 text-left">Profile Settings</h2>
          <div className="flex space-x-5">
            <input
              type={"text"}
              defaultValue={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Your full name"
              className="bg-white border w-1/2 p-3 rounded-md"
            />
            <input
              type={"text"}
              disabled={true}
              placeholder="Your full email"
              defaultValue={user.email}
              className="bg-white border p-3 w-1/2 rounded-md"
              // onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="flex space-x-5 mt-5">
            <input
              type={"text"}
              defaultValue={user.address}
              placeholder="Address here"
              className="bg-white border w-1/2 p-3 rounded-md"
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />
            <input
              type={"text"}
              placeholder="Contact Number"
              defaultValue={user.contact}
              className="bg-white border p-3 w-1/2 rounded-md"
              onChange={(e) => setUser({ ...user, contact: e.target.value })}
            />
          </div>
          <div className="flex space-x-5 mt-8">
            <button className="bg-brand rounded-sm px-5 py-2 font-bold text-white">
              SUBMIT
            </button>
          </div>
        </form>
        <div>
          <form className="p-5 border mt-10 " onSubmit={changePass}>
            <h2 className="text-xl font-bold mb-5">Change Password</h2>
            <div className="flex space-x-5">
              <input
                type={"password"}
                onChange={(e) =>
                  setPassword({ ...password, password: e.target.value })
                }
                placeholder="Old password"
                className="bg-white border w-1/2 p-3 rounded-md"
              />
              <input
                type={"password"}
                placeholder="New Password"
                className="bg-white border p-3 w-1/2 rounded-md"
                onChange={(e) =>
                  setPassword({ ...password, new_password: e.target.value })
                }
              />
            </div>
            <div className="flex space-x-5 mt-8">
              <button className="bg-brand rounded-sm px-5 py-2 font-bold text-white">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { callAuthApi } from "../../apis/callApi";
import UserList from "../../components/wigets/userList";
import { AppContext } from "../../contexts/appContext";
import AdminLayout from "../../layouts/adminLayout";

export default function Blogs() {
  return (
    <AdminLayout title="Manage your blogs">
      <Users />
    </AdminLayout>
  );
}

export function Users() {
  const { setLoader } = useContext(AppContext);
  const [users, setUsers] = useState({});

  const getUsers = async () => {
    setLoader(true);
    const { response, err } = await callAuthApi("GET", "/user");
    setLoader(false);
    if (err) {
      // toast(err.message || JSON.stringify(err));
      setUsers(users);
    } else {
      setUsers(response.data);
    }
  };
  async function enabledisableUser(id, status) {
    setLoader(true);
    const { response, err } = await callAuthApi(
      "PATCH",
      "/enable-disable-user/" + id,
      { is_active: status }
    );
    setLoader(false);
    toast(response?.message || err?.message);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section>
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <h1 className="text-xl font-bold">All users</h1>
          <small>Manage all the users here</small>
        </div>
        <div className="col-span-1"></div>
      </div>
      {users && users.length > 0 && (
        <div>
          <UserList users={users} enabledisableUser={enabledisableUser} />
        </div>
      )}
    </section>
  );
}

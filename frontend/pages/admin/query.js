import { useEffect, useState } from "react";
import QueryList from "../../components/wigets/queryList";
import AdminLayout from "../../layouts/adminLayout";
import { callAuthApi } from "../../apis/callApi";
import { toast } from "react-toastify";

export default function Query() {
  return (
    <AdminLayout title="User query">
      <Users />
    </AdminLayout>
  );
}

export function Users() {
  const [quiries, setQueries] = useState([]);

  async function getEnquiry() {
    const { err, response } = await callAuthApi("get", "/enquirys");
    if (!err) {
      setQueries(response.data);
    } else {
      toast.error(JSON.stringify(err.message || err));
    }
  }
  useEffect(() => {
    getEnquiry();
  }, []);

  return (
    <section className="pr-16">
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <h1 className="text-xl font-bold">User queries</h1>
          <small>Manage all the user queries here.</small>
        </div>
        <div className="col-span-1"></div>
      </div>
      <div className="mt-5">
        <QueryList users={quiries} />
      </div>
    </section>
  );
}

import { useState } from "react";
import CategoryList from "../../components/wigets/categoryList";
import AdminLayout from "../../layouts/adminLayout";

export default function Blogs() {
  return (
    <AdminLayout title="Manage your blogs">
      <Categories />
    </AdminLayout>
  );
}

export function Categories() {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <h1 className="text-xl font-bold">Categories</h1>
          <small>Manage Blogs Categories</small>
        </div>
        <div className="col-span-1  ml-auto">
          <button
            onClick={() => setOpen(true)}
            className="bg-brand text-white px-5 py-2 rounded-sm w-44"
          >
            {" "}
            <i className="fa fa-plus mr-2" /> Create
          </button>
        </div>
      </div>
      <div>
        <CategoryList setOpen={setOpen} open={open} />
      </div>
    </section>
  );
}

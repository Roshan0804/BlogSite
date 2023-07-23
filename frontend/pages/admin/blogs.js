import { useState } from "react";
import BlogList from "../../components/wigets/blogList";
import AdminLayout from "../../layouts/adminLayout";

export default function Blogs() {
  return (
    <AdminLayout title="Manage your blogs">
      <AdminBlogs />
    </AdminLayout>
  );
}

export function AdminBlogs() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("add");

  return (
    <section>
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <h1 className="text-xl font-bold">Blogs</h1>
          <small>Manage all the blogs here</small>
        </div>
        <div className="col-span-1 ml-auto">
          <button
            onClick={() => {
              setOpen(true);
              setType("add");
            }}
            className="bg-brand text-white px-5 py-2 rounded-sm w-44"
          >
            {" "}
            <i className="fa fa-plus mr-2" /> Create
          </button>
        </div>
      </div>
      <div>
        <BlogList type={type} setType={setType} setOpen={setOpen} open={open} />
      </div>
    </section>
  );
}

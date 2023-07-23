import AdminLayout from "../../layouts/adminLayout";

export default function Cms() {
  return (
    <AdminLayout title="Manage Cms">
      <Users />
    </AdminLayout>
  );
}

export function Users() {
  return (
    <section className="pr-16">
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <h1 className="text-xl font-bold">CMS Settings</h1>
          <small>Manage Cms Settings for your webpages</small>
        </div>
        <div className="col-span-1"></div>
      </div>
      <div className="mt-5">
        <section className="border rounded-md p-3">
          <div>
            <h1 className="text-md font-bold text-gray-600 mb-2">
              Top Categories
              <button className="float-right border px-2 rounded-md text-brand border-brand hover:bg-gray-200">
                <i className="fa fa-plus" />
              </button>
            </h1>
          </div>
          <div>cms</div>
        </section>
        <section className="border rounded-md p-3 mt-5">
          <h1 className="text-md font-bold text-gray-600 mb-2">
            Top Blogs
            <button className="float-right border px-2 rounded-md text-brand border-brand hover:bg-gray-200">
              <i className="fa fa-plus" />
            </button>
          </h1>
          <div>cms</div>
        </section>
        <section className="border rounded-md p-3 mt-5">
          <h1 className="text-md font-bold text-gray-600 mb-2">
            Top Authors
            <button className="float-right border px-2 rounded-md text-brand border-brand hover:bg-gray-200">
              <i className="fa fa-plus" />
            </button>
          </h1>
          <div>cms</div>
        </section>
      </div>
    </section>
  );
}

import { useContext, useEffect, useState } from "react";
import Modal from "../modal";
import Switch from "@mui/material/Switch";
import { AppContext } from "../../contexts/appContext";
import { callApi, IMAGE_BASE_URL } from "../../apis/callApi";
import { toast } from "react-toastify";
import { callAuthApi } from "../../apis/callApi.js";
import TextEditor from "../wigets/editorInput";
import { Link } from "@mui/material";

export default function BlogList({ open, type, setType, setOpen }) {
  const { setLoader, session } = useContext(AppContext);
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({});

  const userType = session?.user?.user_type;

  async function getData() {
    let url = "";
    if (userType === "admin") {
      url = "/blogs";
    } else {
      url = "/blogs?author=" + session?.user?._id;
    }
    setLoader(true);
    const { err, response } = await callApi("GET", url);
    setLoader(false);
    if (response) {
      setBlogs(response.data);
    }
  }
  async function deleteBlog(id) {
    if (confirm("Are you sure want to delete this blog?")) {
      setLoader(true);
      const { err, response } = await callAuthApi("DELETE", "/blog/" + id);
      setLoader(false);
      if (response) {
        toast(response?.message);
        getData();
      } else {
        toast(err.message || JSON.stringify(err));
      }
    }
  }
  async function enableDisableBlog(status, id) {
    setLoader(true);
    const { err, response } = await callAuthApi(
      "PATCH",
      "/enable-disable-blog/" + id,
      {
        isActive: status,
      }
    );
    setLoader(false);
    if (response) {
      toast(response?.message);
      getData();
    } else {
      toast(err.message || JSON.stringify(err));
    }
  }
  useEffect(() => {
    getData();
  }, [setOpen]);
  return (
    <div className="mt-5">
      <Modal
        open={open}
        title={type === "edit" ? "Edit Blog" : "Add New Blog"}
        setOpen={setOpen}
      >
        <BlogForm
          getData={getData}
          initialData={blog}
          type={type}
          setLoader={setLoader}
          open={open}
          setOpen={setOpen}
        />
      </Modal>
      <table className="table-auto" style={{ width: "100%" }}>
        <thead className="border h-10">
          <th className="text-sm w-20">Image</th>
          <th className="text-sm w-36">Title</th>
          <th className="text-sm w-36">Author</th>
          <th className="text-sm w-36">Created</th>
          <th className="text-sm w-36">Status</th>
          <th className="text-sm w-52">Actions</th>
        </thead>
        <tbody>
          {blogs?.map((item, index) => {
            return (
              <tr className="border" key={index}>
                <td className="text-xs w-20 text-center h-16">
                  <div className="p-1 rounded border border-gray-200">
                    <img src={IMAGE_BASE_URL + item.image} />
                  </div>
                  {/* {item.image} */}
                </td>
                <td className="text-xs w-36 text-center h-16">{item.title}</td>
                <td className="text-xs w-36 text-center h-16">
                  {item?.author?.name ? item?.author?.name : "not found"}
                </td>

                <td className="text-xs w-36 text-center h-16">
                  {item.createdAt}
                </td>
                <td className="text-xs w-36 text-center h-16">
                  {/* {item.isActive ? "Enabled" : "Disabled"} */}
                  {userType === "admin" && (
                    <Switch
                      onChange={() => {
                        enableDisableBlog(!item.isActive, item._id);
                      }}
                      checked={item.isActive}
                    />
                  )}
                </td>
                <td className="text-xs w-52 text-center h-16">
                  <Link href={`/${item._id}`}>
                    <button className="bg-brand text-white px-2 py-1 rounded-md mr-2">
                      <i className="fa fa-eye" />
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      setType("edit");
                      setOpen(true);
                      setBlog(item);
                    }}
                    className="bg-brand text-white px-2 py-1 rounded-md mr-2"
                  >
                    <i className="fa fa-pencil" />
                  </button>
                  <button
                    onClick={() => {
                      deleteBlog(item._id);
                    }}
                    className="bg-brand text-white px-2 py-1 rounded-md mr-2"
                  >
                    <i className="fa fa-trash" />
                  </button>
                  <div className="mt-2">
                    {/* <Switch {...label} defaultChecked /> */}

                    {/* <Switch on="yes" off="no" value={value} onChange={setValue} /> */}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BlogForm({ setOpen, type, setLoader, initialData, getData }) {
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState({});
  const [formData, setFormData] = useState({});
  const [content, setContent] = useState("");

  function changeImage(e) {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setImage(file);
  }
  async function getCategory() {
    setLoader(true);
    const { err, response } = await callApi("GET", "/category");
    setLoader(false);
    if (response) {
      setCategories(response?.data);
    }
  }

  useEffect(() => {
    if (type == "edit") {
      setFormData({ ...initialData, category: initialData?.category?._id });
      setContent(initialData.description);
      setPreview(IMAGE_BASE_URL + initialData.image);
    } else {
      setFormData({});
      setPreview(null);
    }
    getCategory();
  }, [type, initialData]);

  async function submit(e) {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("file", image);
    form_data.append("title", formData?.title);
    form_data.append("description", content);
    form_data.append("short_description", formData?.short_description);
    form_data.append("category", formData?.category);
    form_data.append(
      "tags",
      typeof formData?.tags === "string"
        ? formData?.tags
        : formData?.tags?.toString()
    );
    let url = "";
    if (type === "edit") {
      url = "/blog/" + formData._id;
    } else {
      url = "/blog";
    }

    const { response, err } = await callAuthApi("POST", url, form_data, true);
    setFormData({});
    setPreview(null);
    if (response) {
      toast.success(response?.message || "Change successfully.");
      setOpen(false);
      getData();
    } else {
      toast.error(err.message || JSON.stringify(err));
    }
  }

  return (
    <form className="" onSubmit={submit}>
      <div className="grid grid-cols-1">
        <div>
          <label className="text-md font-bold">Title</label>
          <div className="mt-1">
            <input
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
              }}
              value={formData.title}
              className="border border-gray-500 w-full px-4 py-2 rounded-md text-gray-700"
              placeholder="Title here"
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <label className="text-md font-bold">Short description</label>
        <div className="mt-1">
          <input
            onChange={(e) => {
              setFormData({ ...formData, short_description: e.target.value });
            }}
            className="border border-gray-500 w-full px-4 py-2 rounded-md text-gray-700"
            placeholder="Short description..."
            value={formData.short_description}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 mt-5">
        <div>
          <label className="text-md font-bold">Tags</label>
          <div className="mt-1">
            <input
              onChange={(e) => {
                setFormData({ ...formData, tags: e.target.value });
              }}
              className="border border-gray-500 px-4 py-2 rounded-md text-gray-700"
              placeholder="Tags here"
              value={formData.tags}
            />
          </div>
        </div>

        <div className="mt-1">
          <label className="text-md font-bold">Choose Category</label>
          <div>
            <select
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value });
              }}
              placeholder="Category here"
              className="border border-gray-500 px-4 w-full bg-white py-2 rounded-md text-gray-700"
              value={formData?.category}
            >
              <option>---Choose Category ---</option>
              {categories?.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item?.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 w-full">
          <div className="col-span-2">
            <label className="text-md font-bold">Image file</label>
            <input
              id="img"
              onChange={(e) => {
                changeImage(e);
              }}
              type={"file"}
              className="w-full"
            />
            {preview && (
              <div className="mt-4 mb-3">
                <img
                  src={preview}
                  style={{
                    height: "100px",
                    width: "150px",
                    objectFit: "contain",
                  }}
                  className="border rounded-md"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1">
        <div className="col-span-1">
          <TextEditor
            value={type !== "edit" ? "" : content}
            changeVal={(e) => {
              setContent(e);
            }}
          />
        </div>
      </div>
      <div className="mt-6 mb-2">
        <button className="bg-brand px-4 py-2 rounded-md text-white">
          {type === "edit" ? "Update Changes" : "Save Blog"}
        </button>
      </div>
    </form>
  );
}

import React, { useContext, useEffect, useState } from "react";
import Modal from "../modal";
import Switch from "@mui/material/Switch";
import Editor from "./editorInput";
import { toast } from "react-toastify";
import { callApi, callAuthApi } from "../../apis/callApi";
import { AppContext } from "../../contexts/appContext";
import { useForm } from "react-hook-form";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function CategoryList({ open, setOpen }) {
  const [categories, setCategories] = useState([]);
  const { setLoader } = useContext(AppContext);

  async function getData() {
    setLoader(true);
    const { response, err } = await callApi("GET", "/category");
    setLoader(false);
    if (response) {
      setCategories(response.data);
    }
  }
  async function deleteData(id) {
    if (confirm("Are you sure want to delete category ?")) {
      setLoader(true);
      const { response, err } = await callAuthApi("DELETE", "/category/" + id);
      setLoader(false);
      if (response) {
        toast(response.message);
        getData();
      } else {
        toast(err.message || JSON.stringify(err));
      }
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-5 ">
      {/* <Modal open={open} title="Add New Category" setOpen={setOpen}> */}
      {open && (
        <div className="pr-24 pl-10 py-10 pb-10 bg-gray-200">
          <CategoryForm getData={getData} open={open} setOpen={setOpen} />
        </div>
      )}
      {/* </Modal> */}
      <table className="table w-100" style={{ width: "100%" }}>
        <thead className="border h-10">
          <th className="text-sm w-20">S.N</th>
          <th className="text-sm w-36">Title</th>
          <th className="text-sm w-36">Description</th>
          <th className="text-sm w-36">Created</th>
          <th className="text-sm w-52">Actions</th>
        </thead>
        <tbody>
          {categories?.map((item, index) => {
            return (
              <tr className="border" key={index}>
                <td className="text-xs w-20 text-center h-16">{index + 1}</td>
                <td className="text-xs w-36 text-center h-16">{item.title}</td>
                <td className="text-xs w-36 text-center h-16">
                  {item.description}
                </td>
                <td className="text-xs w-36 text-center h-16">
                  {item.createdAt}
                </td>
                <td className="text-xs w-52 text-center h-16">
                  {/* <button className="bg-brand text-white px-2 py-1 rounded-md mr-2">
                    <i className="fa fa-eye" />
                  </button>
                  <button className="bg-brand text-white px-2 py-1 rounded-md mr-2">
                    <i className="fa fa-pencil" />
                  </button> */}
                  <button
                    onClick={() => {
                      deleteData(item._id);
                    }}
                    className="bg-brand text-white px-2 py-1 rounded-md mr-2"
                  >
                    <i className="fa fa-trash" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function CategoryForm({ setOpen, getData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setLoader } = useContext(AppContext);

  const onSubmit = async (datas) => {
    setLoader(true);
    const { response, err } = await callAuthApi("POST", "/category", datas);
    setLoader(false);
    if (err) {
      toast(err.message || JSON.stringify(err));
    } else {
      setOpen(false);
      getData();
      toast(response?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1">
        <div>
          <label className="text-md font-bold">Title</label>
          <div className="mt-1">
            <input
              {...register("title", { required: true })}
              className="border border-gray-500 w-full px-4 py-2 rounded-md text-gray-700"
              placeholder="Title here"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1gap-10 mt-5">
        <div>
          <label className="text-md font-bold">Short Description</label>
          <div className="mt-1">
            <textarea
              {...register("description", { required: true })}
              className="border border-gray-500 w-full px-4 py-2 rounded-md text-gray-700"
              placeholder="Title here"
              rows={2}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 mb-2">
        <button
          type="submit"
          className="bg-brand px-4 py-2 rounded-md text-white"
        >
          Save Changes
        </button>
        <a
          onClick={() => setOpen(false)}
          className="border ml-5 px-4 py-2 border-red-500 text-red-600 rounded-md cursor-pointer"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}

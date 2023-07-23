import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { callApi } from "../apis/callApi";
import { AppContext } from "../contexts/appContext";
import MainLayout from "../layouts/mainLayout";
import { BlogPortFolio } from "./blogs";

export default function Search() {
  return (
    <MainLayout title={"Search your blog"}>
      <SearchPage />
    </MainLayout>
  );
}

function SearchPage() {
  const { push, query } = useRouter();
  const { setLoader, loginUser, loader } = useContext(AppContext);
  const [blogs, setBlogs] = useState([]);

  const searchData = async () => {
    setLoader(true);
    const { response, err } = await callApi("get", `/search?q=${query?.q}`);
    setLoader(false);
    if (response) {
      setBlogs(response.data);
    } else {
      setBlogs([]);
    }
  };

  useEffect(() => {
    searchData();
  }, [query]);

  return (
    <div className="p-10 min-h-screen">
      <div className="grid grid-cols-1 px-16">
        {!loader && blogs && blogs.length > 0 && (
          <h1 className="bg-gray-400 px-5 py-4 rounded-sm text-center text-white mb-3">
            <b>{blogs.length}</b> results found for your search <b>{query.q}</b>{" "}
          </h1>
        )}
        <div>
          {!loader && blogs && blogs.length > 0 && (
            <BlogPortFolio blogs={blogs} sm={true} />
          )}
          {!loader && blogs.length === 0 && (
            <div className="text-center p-20">
              <small>
                No data found for your search <b>{query.q}</b>
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

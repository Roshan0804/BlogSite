import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import { callApi, IMAGE_BASE_URL } from "../apis/callApi";
import AboutShortcut from "../components/homePageComponents";
import Slider from "../components/slider";
import BannerTitle, { Title } from "../components/wigets/bannerTitle";
import { AppContext } from "../contexts/appContext";
import MainLayout from "../layouts/mainLayout";
import { toast } from "react-toastify";

export default function Home() {
  return (
    <MainLayout title={"Create and read your blog"}>
      <main className="min-h-screen">
        <HomePageDetails />
      </main>
    </MainLayout>
  );
}

const HomePageDetails = () => {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const { setLoader } = useContext(AppContext);

  useEffect(() => {
    async function getCategory() {
      setLoader(true);
      const { err, response } = await callApi("GET", "/category");
      setLoader(false);
      if (!err) {
        setCategories(response.data);
      }
    }
    getCategory();
    getAuthors();
  }, []);

  async function getAuthors() {
    const { err, response } = await callApi("GET", "/users?user_type=user");
    if (!err) {
      setAuthors(response.data);
    }
  }

  return (
    <div className="">
      <section className="py-1 md:px-24" data-aos="fade-up">
        <div className="bg-white absolute-home-content">
          <div className="grid grid-cols-8 gap-8">
            <div className="col-span-2 pt-2">
              <section className="sticky top-16">
                <h1 className="my-2 font-bold bg-gray-300 text-center px-3 py-4 rounded-sm">
                  <i className="fa fa-list mr-5" /> Explore categories
                </h1>
                {categories &&
                  categories.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="hover:bg-gray-200 border-b py-3 capitalize"
                      >
                        <Link href={`/blogs?category=${item._id}`}>
                          <a>{item.title}</a>
                        </Link>
                      </div>
                    );
                  })}
              </section>
            </div>
            <div className=" col-span-4 p-2">
              <PortFolio />
            </div>
            <div className="col-span-2 pt-2">
              <section className="sticky top-16">
                <QuatationForm />
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const PortFolio = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getDatas() {
      const { err, response } = await callApi("GET", "/blogs?isActive=true");
      if (!err) {
        setBlogs(response.data);
      }
    }
    getDatas();
  }, []);

  return (
    <div className="pt-2">
      {/* <Slider> */}
      <div className="grid grid-cols-1 gap-10">
        {blogs &&
          blogs.length > 0 &&
          blogs.map((item, index) => {
            return (
              index <= 11 && (
                <Link href={"/" + item._id}>
                  <div className="bg-gray-200" key={index}>
                    <img
                      src={IMAGE_BASE_URL + item.image}
                      className={`project-img`}
                    />
                    <div className="px-5 py-2">
                      <p className="text-center text-gray-500 mt-2">
                        <small>{item?.category?.title}</small>
                      </p>
                      <p className="pt-1 pb-2 text-md font-semibold text-gray-600 text-center truncate">
                        {item.title}
                      </p>
                      <p className="pt-1 pb-2 text-xs  text-gray-500 text-center truncate">
                        {item.short_description}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            );
          })}
      </div>
    </div>
  );
};

const initialData = {
  name: "",
  email: "",
  contact: "",
  address: "",
  message: "",
};
export const QuatationForm = () => {
  const [form, setForm] = useState(initialData);
  const { setLoader } = useContext(AppContext);
  function changeData(obj) {
    setForm({ ...form, ...obj });
  }

  async function submit() {
    setLoader(true);
    const { response, err } = await callApi("POST", "/enquiry", form);
    setLoader(false);
    if (!err) {
      setForm(initialData);
      toast.success("Posted successfully");
    } else {
      toast.error(JSON.stringify(err.message || err));
    }
  }

  return (
    <div className="">
      <div className="gap-10">
        <p className="my-2 font-bold bg-gray-300 text-center px-3 py-4 rounded-sm">
          <i className="fa fa-file mr-5" /> Report your problem
        </p>
        <input
          type={"text"}
          onChange={(e) => {
            changeData({ name: e.target.value });
          }}
          placeholder="Your full name"
          value={form.name}
          className="bg-white border border-gray-400 mt-2 w-full p-2 rounded-md"
        />
        <input
          type={"text"}
          placeholder="Your email"
          value={form.email}
          onChange={(e) => {
            changeData({ email: e.target.value });
          }}
          className="bg-white border border-gray-400 mt-2 w-full p-2 rounded-md"
        />
      </div>
      <input
        type={"text"}
        value={form.address}
        onChange={(e) => {
          changeData({ address: e.target.value });
        }}
        placeholder="Address here"
        className="bg-white border border-gray-400 mt-2 w-full p-2 rounded-md"
      />
      <input
        type={"text"}
        value={form.contact}
        onChange={(e) => {
          changeData({ contact: e.target.value });
        }}
        placeholder="Contact Number"
        className="bg-white border border-gray-400 mt-2 w-full p-2 rounded-md"
      />
      <textarea
        type={"text"}
        value={form.message}
        onChange={(e) => {
          changeData({ message: e.target.value });
        }}
        placeholder="Any messages ?"
        rows={3}
        className="bg-white border border-gray-400 w-full p-2.5 mt-2 rounded-md"
      />
      <div onClick={submit} className="flex  mt-3">
        <button className="bg-gray-600 rounded-md px-10 py-2.5 w-full text-white font-bold">
          <i className="fa fa-check mr-2" />
          SUBMIT
        </button>
      </div>
    </div>
  );
};

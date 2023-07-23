import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import { callApi, IMAGE_BASE_URL } from "../apis/callApi";
import AboutShortcut from "../components/homePageComponents";
import Slider from "../components/slider";
import BannerTitle, { Title } from "../components/wigets/bannerTitle";
import { AppContext } from "../contexts/appContext";
import MainLayout from "../layouts/mainLayout";
import { useRouter } from "next/router";

const clients = [
  "/images/clients/1.png",
  "/images/clients/2.jpeg",
  "/images/clients/3.png",
  "/images/clients/4.png",
  "/images/clients/5.jpeg",
  "/images/clients/6.png",
  "/images/clients/7.png",
  "/images/clients/7.jpeg",
];

export default function Blogs() {
  return (
    <MainLayout title={"See all blogs listings"}>
      <main className="min-h-screen">
        <HomePageDetails />
      </main>
    </MainLayout>
  );
}

const HomePageDetails = () => {
  const { setLoader, loader } = useContext(AppContext);
  const [blogs, setBlogs] = useState([]);
  const [qyeries, setQueries] = useState([]);
  const [category, setCategory] = useState([]);
  const { query } = useRouter();

  async function getBlogs() {
    let url = `/blogs?isActive=true&`;

    setLoader(true);

    if (query.category) {
      url = `/blogs?isActive=true&category=${query.category}`;
    }

    const { err, response } = await callApi("GET", url);
    setLoader(false);
    if (!err) {
      setBlogs(response?.data);
    }
  }
  async function getCategory() {
    const { err, response } = await callApi("GET", `/category`);
    if (!err) {
      setCategory(response?.data);
    }
  }
  useEffect(() => {
    getBlogs();
    getCategory();
  }, [query.category]);

  return (
    <div className="">
      <section className=" md:px-24 py-5">
        <div className="grid grid-cols-6 gap-10 pt-2">
          {!loader && blogs?.length > 0 && (
            <div className="bg-white absolute-home-content col-span-4">
              <BlogPortFolio sm={true} blogs={blogs} />
            </div>
          )}
          {!loader && blogs.length === 0 && (
            <div className=" col-span-4 bg-gray-100">
              <p className="p-10 text-center">No blogs available</p>
            </div>
          )}
          <div className="col-span-2 pt-1">
            <section className="sticky top-10">
              <h2 className="mb-2 text-xl text-center font-bold bg-gray-300 p-4">
                Explore categories
              </h2>
              {!loader &&
                category?.length > 0 &&
                category.map((item, index) => {
                  return (
                    index <= 4 && (
                      <div
                        className="bg-gray-100 mb-4 px-4 py-3 rounded-sm hover:bg-gray-100 cursor-pointer"
                        key={index}
                      >
                        <Link href={`/blogs?category=${item._id}`}>
                          <div className="">
                            <div>
                              <h1 className="text-md font-bold capitalize">
                                {item.title}
                              </h1>
                              <p className="mt-1">
                                <span className="bg-white border border-gray-500  text-sm px-2 py-1 rounded-xl text-gray-600">
                                  {" "}
                                  {item?.description}
                                </span>
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )
                  );
                })}
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export const BlogPortFolio = ({ blogs, sm }) => {
  return (
    <div className="pt-2">
      {/* <Slider> */}
      <div className="grid grid-cols-3 gap-5">
        {blogs.map((item, index) => {
          return (
            <Link key={index} href={`/${item._id}`}>
              <div className="border border-gray-200 rounded-sm p-0">
                <img
                  src={IMAGE_BASE_URL + item.image}
                  className={sm ? "project-sm-img" : `project-img`}
                />
                <p className="text-center text-gray-500 mt-2">
                  <small>{item?.category?.title}</small>
                </p>
                <p className="pt-1 pb-2 text-md font-semibold text-gray-600 text-center">
                  {item.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      {/* </Slider> */}
    </div>
  );
};

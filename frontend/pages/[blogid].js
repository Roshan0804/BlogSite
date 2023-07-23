import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import { toast } from "react-toastify";
import { callApi, IMAGE_BASE_URL } from "../apis/callApi";
import { AppContext } from "../contexts/appContext";
import MainLayout from "../layouts/mainLayout";
import parse from "html-react-parser";
import moment from "moment";

export default function OurProjects() {
  const { query } = useRouter();

  return <ProjectPage pageid={query?.blogid} />;
}

const ProjectPage = ({ pageid }) => {
  const [details, setDetails] = useState({});
  const { setLoader, loader } = useContext(AppContext);

  async function getData() {
    const { response, err } = await callApi("GET", "/blog/" + pageid);
    setLoader(false);
    if (err) {
      toast("Details not found");
    } else {
      setDetails(response?.data);
    }
    setLoader(false);
  }

  useEffect(() => {
    setLoader(true);
    if (pageid) {
      getData();
    }
  }, [pageid]);
  return (
    <MainLayout title={details?.details?.title || "Loading..."}>
      {!loader && details?.details ? (
        <div className="bg-white">
          <BlogDetails details={details?.details} related={details?.related} />
        </div>
      ) : (
        <p className="text-center p-10">Page not found</p>
      )}
    </MainLayout>
  );
};
{
  /* <Parallax blur={3} bgImage="/images/home/banner-4.jpeg" bgImageAlt="the cat" strength={200}>
</Parallax> */
}

const BlogDetails = ({ details, related }) => {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-3 relative pl-20 pr-5 justify-center items-center py-5">
        <img
          className="rounded-sm w-full mt-2"
          style={{ height: "90vh", objectFit: "cover" }}
          src={IMAGE_BASE_URL + details?.image}
        />
        <div className="mt-8 rounded-md bg-white">
          <section className="border-b border-gray-500 pb-2">
            <h3 className="text-xl mb-2   font-bold text-gray-700">
              {details?.title}
            </h3>
            <p className="text-md">{details?.short_description}</p>
          </section>
          <p className="text-gray-600 text-sm mb-4 mt-3 flex">
            <div></div>
            <div className="ml-auto">
              <span className="">
                <i className="fa fa-calendar mr-2" />{" "}
                {moment(details?.createdAt).format("YYYY, MMM, DD")}
              </span>
            </div>
          </p>

          <div className="mt-5 text-sm my-lineheight">
            {parse(details?.description || "<h1>Description not found</h1>")}
          </div>
          <div className="flex">
            <div></div>
            <div className="ml-auto ">
              {details.tags.map((item, index) => {
                return (
                  <span
                    key={index}
                    className=" bg-gray-400 mr-2 text-md px-3 py-1 rounded-sm"
                  >
                    {" "}
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex pt-3 mt-3 border-t border-gray-500">
            <small>By: {details?.author?.name}</small>,
            <small>,Category: {details?.category?.title}</small>
          </div>
        </div>
      </div>
      <div className="col-span-2 mb-2 rounded-sm  bg-white z-30 px-10 pb-10 pt-5">
        <div className="border p-1 rounded-sm">
          <div>
            <p className="text-left text-xl text-gray-800 bg-gray-300 p-5 rounded-sm font-bold">
              <i className="fa fa-file mr-3" />
              Related Blogs
            </p>
          </div>
          <div style={{}}>
            {related?.length > 0 &&
              related.map((item, index) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <Link href={`/${item._id}`} key={index}>
                    <div
                      className="bg-white p-2 rounded-sm hover:bg-gray-200 cursor-pointer"
                      key={index}
                    >
                      <div className="flex space-x-4">
                        <img
                          className="rounded-sm border border-gray-300 p-1 object-cover"
                          style={{ height: "80px", width: "90px" }}
                          src={IMAGE_BASE_URL + item.image}
                        />
                        <div>
                          <h1 className="text-md font-bold capitalize">
                            {item.title}
                          </h1>
                          <p className="mt-1">
                            {item?.tags?.map((itm, ind) => {
                              return (
                                <span
                                  key={ind}
                                  className="bg-gray-200 mr-2 text-xs px-2 py-1 rounded-md"
                                >
                                  {itm}
                                </span>
                              );
                            })}
                          </p>
                          <p className="mt-1 text-gray-600 text-sm">
                            <small>Author: {item?.author?.name}</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

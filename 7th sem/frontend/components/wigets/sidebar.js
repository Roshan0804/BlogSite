import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/appContext";
import { Logo } from "../header";

export default function Sidebar() {
  const { asPath, push } = useRouter();
  const { logout, session } = useContext(AppContext);

  function isAdmin() {
    return session?.user?.user_type === "admin";
  }

  function isActive(path) {
    if (asPath === path) return true;
    return false;
  }

  useEffect(() => {}, []);

  return (
    <aside
      className="bg-gray-700 fixed min-h-screen z-50 pt-5"
      style={{ width: "18%" }}
    >
      <div className="text-center mb-5 border-b pb-8">
        <Logo type={"custom"} />
      </div>
      {isAdmin() && (
        <Link href={"/admin"}>
          <div>
            <li
              className={`list-none ${
                isActive("/admin") ? "text-white" : "text-gray-300"
              } text-md px-10  py-4 hover:text-blue-700 cursor-pointer text-left`}
            >
              <i className="fa fa-dashboard mr-2 text-md" />
              Categories
            </li>
          </div>
        </Link>
      )}
      <div>
        <Link href={"/admin/blogs"}>
          <li
            className={`list-none ${
              isActive("/admin/blogs") ? "text-white" : "text-gray-300"
            } text-md px-10  py-4 hover:text-blue-700 cursor-pointer text-left`}
          >
            <i className="fa fa-book mr-2 text-md" />
            Blogs
          </li>
        </Link>
      </div>
      {isAdmin() && (
        <div>
          <Link href={"/admin/users"}>
            <li
              className={`list-none ${
                isActive("/admin/users") ? "text-white" : "text-gray-300"
              } text-md px-10  py-4 hover:text-blue-700 cursor-pointer text-left`}
            >
              <i className="fa fa-users mr-2 text-md" />
              Users
            </li>
          </Link>
        </div>
      )}
      {isAdmin() && (
        <Link href={"/admin/query"}>
          <div>
            <li
              className={`list-none ${
                isActive("/admin/query") ? "text-white" : "text-gray-300"
              } text-md px-10  py-4 hover:text-blue-700 cursor-pointer text-left`}
            >
              <i className="fa fa-comment mr-2 text-md" />
              User Queries
            </li>
          </div>
        </Link>
      )}
      {/* {isAdmin() && (
        <div>
          <Link href={"/admin/cms"}>
            <li
              className={`list-none ${
                isActive("/admin/cms") ? "text-white" : "text-gray-300"
              } text-md pl-5 pr-2  py-4 hover:text-blue-700 cursor-pointer text-left`}
            >
              <i className="fa fa-dashboard mr-2" />
              Cms
            </li>
          </Link>
        </div>
      )} */}
      <div>
        <Link href={"/admin/setting"}>
          <li
            className={`list-none ${
              isActive("/admin/setting") ? "text-white" : "text-gray-300"
            } text-md px-10  py-4 hover:text-blue-700 cursor-pointer text-left`}
          >
            <i className="fa fa-cogs mr-2 text-md" />
            Profile Setting
          </li>
        </Link>
      </div>
      <div className="px-8 border-t mt-5">
        <button
          onClick={() => logout()}
          className="text-white bg-red-700 w-full  rounded-2xl mt-5 px-10 py-2"
        >
          <i className="fa fa-sign-out mr-2" />
          Logout
        </button>
      </div>
    </aside>
  );
}

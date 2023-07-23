import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/appContext";
import { main_menus, right_menus } from "../datas/staticData";

export default function Header({ full }) {
  const { push, query } = useRouter();
  const [search, setSearch] = useState(query.q);
  return (
    <header
      className={`bg-white sticky z-50 top-0 ${
        full ? " md:px-8" : " md:px-24"
      } py-3 shadow-sm`}
    >
      <div className="grid grid-cols-7 gap-10 items-center">
        <section className="col-span-1">{!full && <Logo />}</section>
        <div className="col-span-3">
          <form
            className="flex"
            onSubmit={() => {
              if (search.length > 1) {
                push(`/search?q=${search}`);
              }
            }}
          >
            <input
              onChange={(e) => setSearch(e.target.value)}
              type={"search"}
              value={search}
              className="border px-4 py-2 border-gray-300 text-sm rounded-2xl w-full"
              placeholder=" Search Blog"
            />
            <Link href={search?.length > 1 ? "/search?q=" + search : "#"}>
              <button className="fa fa-search bg-brand px-6 hover:bg-blue-500 text-white search-btn"></button>
            </Link>
          </form>
        </div>
        <section className="col-span-3 ml-auto">
          <MenusItems />
        </section>
      </div>
    </header>
  );
}

export const Logo = ({ type }) => {
  return (
    <div>
      <Link href={"/"}>
        <a
          className={`text-3xl font-bold ${
            type === "custom" ? "text-gray-50" : "text-gray-600"
          }`}
        >
          Blog
          <span
            className={`${type === "custom" ? "text-white" : "text-brand"}`}
          >
            Site
          </span>
        </a>
      </Link>
    </div>
  );
};

const MenusItems = () => {
  const { asPath } = useRouter();
  const { session } = useContext(AppContext);

  return (
    <div className="flex space-x-7 items-center">
      {main_menus.map((item, index) => {
        return (
          <div className="dropdown" key={index}>
            <Link href={item.sub ? "#" : `/${item.link}`}>
              <a
                className={`hover:text-blue-500 py-5 ${
                  asPath === item.notation ? "text-brand" : "text-gray-600"
                }`}
                href={`/${item.label}`}
              >
                {item.label} {item.sub && <span className="fa fa-angle-down" />}{" "}
              </a>
            </Link>
            {item.sub && (
              <div className="dropdown-content">
                {item.sub.map((itr, ind) => {
                  return (
                    <Link key={ind} href={`/${itr.link}`}>
                      <a
                        className={`block py-1 px-2 hover:text-blue-500 ${
                          asPath === itr.link ? "text-brand" : "text-gray-600"
                        } `}
                        href={`/${itr.label}`}
                      >
                        {itr.label}
                      </a>
                    </Link>
                  );
                })}
              </div>
            )}
            {asPath === item.notation && (
              <div className="absolute bg-brand w-12 py-0.5 -bottom-4" />
            )}
          </div>
        );
      })}
      {/* <Link href={"/request-quoatation"}>
        <a className="py-2 border-brand border-2 rounded-full px-4 hover:bg-gray-50 font-bold text-brand">
          {"Create Blog"}
        </a>
      </Link> */}
      {!session?.isLoggedIn && (
        <Link href={"/login"}>
          <a className="py-1 border-brand border rounded-full px-4 hover:bg-gray-50 text-brand">
            <i className="fa fa-sign-out mr-2" />
            {"Login"}
          </a>
        </Link>
      )}
      {!session?.isLoggedIn && (
        <Link href={"/signup"}>
          <a className="py-1 border-brand border rounded-full px-4 hover:bg-gray-50 text-brand">
            <i className="fa fa-user mr-2" />
            {"Signup"}
          </a>
        </Link>
      )}
      {session?.isLoggedIn && (
        <Link
          href={session?.user?.user_type === "user" ? "/admin/blogs" : "/admin"}
        >
          <div className="align-center pb-2 justify-center pl-5">
            <button className="mr-3 text-brand font-bold text-md">
              {session?.user?.name}
            </button>
            <span className="text-2xl text-brand fa fa-user-circle" />
          </div>
        </Link>
      )}
    </div>
  );
};

const Links = () => {
  return (
    <div className="flex space-x-5">
      {right_menus.map((item, index) => {
        return (
          <a
            target={"_blank"}
            rel="noreferrer"
            href={item.link ? item.link : "#"}
            className={` px-2.5 py-1 text-lg rounded-full hover:bg-gray-100 fa border text-white fa-${item.icon}`}
            style={{ borderColor: item.color, color: item.color }}
            key={index}
          >
            {/* {item.label} */}
          </a>
        );
      })}
    </div>
  );
};

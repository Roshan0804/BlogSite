import Head from "next/head";
import { useContext } from "react";
import Footer, { SubFooter } from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/wigets/sidebar";
import { AppContext } from "../contexts/appContext";

export default function AdminLayout({ title, bg, children }) {
  const { session } = useContext(AppContext);

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title + " | Blog site"}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
      </Head>
      <main className={`grid-cols-1 ${bg || "bg-white"}`}>
        {session?.isLoggedIn ? (
          <div className="w-100">
            <div className="flex">
              <div style={{ width: "18%" }}>
                <Sidebar />
              </div>
              <div style={{ width: "82%" }}>
                <div>
                  <Header full={true} />
                </div>
                <main className="" style={{ padding: "40px" }}>
                  {children}
                </main>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center py-10">Please login to access this</p>
        )}
        <SubFooter />
      </main>
    </div>
  );
}

import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";

export default function MainLayout({ title, bg, children }) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title + " | Blog Site"}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
      </Head>
      <main className={`grid-cols-1 ${bg || "bg-white"}`}>
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
}

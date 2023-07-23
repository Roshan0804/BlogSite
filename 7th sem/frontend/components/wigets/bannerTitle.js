import Link from "next/link";

export default function BannerTitle({ noButton, banner, animation }) {
  return (
    <div
      className="absolute z-10 w-1/2 top-60 md:mx-20 md:px-5 py-10 rounded-md"
      data-aos={animation}
    >
      <Title
        mainTitle={banner.mainTitle}
        mainTitleTag={banner.mainTitleTag}
        title={banner.title}
      />
      <p className="text-sm text-gray-600 leading-6">{banner.description}</p>
      {!noButton && (
        <div className="mt-3">
          <div className="flex items-center space-x-5">
            <button className="bg-brand text-white px-5 py-3 font-bold rounded-md">
              Our Team
            </button>
            <button className="border-brand border-2 font-bold text-brand px-5 py-3 rounded-md">
              Request a quotation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export const Title = ({ title, mainTitle, mainTitleTag, all }) => {
  return (
    <div className="grid grid-cols-4 py-4">
      {/* <div className="flex items-center space-x-3">
        <span className="px-10 h-1 bg-gray-400 w-16"></span>
        <h2 className="uppercase text-sm text-brand"> {title}</h2>
      </div> */}
      <h1 className="text-3xl text-brand col-span-3 font-bold">
        {mainTitle} <span className="text-brand">{mainTitleTag}</span>{" "}
      </h1>
      {all && (
        <div className="ml-auto text-sm text-brand">
          <Link href={"/blogs"}>
            <a>See all</a>
          </Link>
        </div>
      )}
    </div>
  );
};

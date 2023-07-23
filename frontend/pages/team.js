import MainLayout from "../layouts/mainLayout";
import { Title } from "../components/wigets/bannerTitle";
import { QuatationForm } from ".";
import { useState } from "react";

export default function Team() {
  return (
    <MainLayout bg={"bg-gray-100"} title={"Our Team | Evolving Technology"}>
      <TeamPage />
    </MainLayout>
  );
}

const tech = [
  "/images/teams/image.jpg",
  "/images/teams/image.jpg",
  "/images/teams/image.jpg",
  "/images/teams/image.jpg",
  "/images/teams/image.jpg",
  "/images/teams/image.jpg",
  "/images/teams/image.jpg",
];

const teams = [
  {
    img: "/images/teams/image.jpg.jpg",
    designation: "Developers",
    name: "Our Team Members",
  },
];

const TeamPage = () => {
  const [show, setShow] = useState(false);
  const [more, setMoreData] = useState({});

  return (
    <div className="md:px-24">
      <div className="pt-8 pb-5">
        <SimpleBanner title={"Teams and members"} />
      </div>
      {more.name && show && (
        <div className="fixed right-0 top-12 h-screen z-50 bg-white overflow-auto shadow-lg">
          <button
            onClick={() => setShow(false)}
            className="text-left fa fa-arrow-left sticky top-0 bg-white w-full text-xl px-3 py-4 text-gray-500 font-bold"
          >
            <span className="ml-3 text-xl">{more.name}</span>
          </button>
          <div className="w-96 p-5 cursor-pointer mb-20 rounded-md my-2">
            <img
              src={`${more.img}`}
              className="h-full rounded-md object-cover"
            />
            <div className="text-center pt-5">
              <p className="font-bold text-xl">{more.name}</p>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-4 gap-10 bg-white p-4 rounded-md">
        {teams.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setMoreData(item);
                setShow(!show);
              }}
              className="col-span-1 cursor-pointer p-4 mb-20 rounded-md hover:border-blue-400 hover:border-2"
            >
              <img
                src={`${item.img}`}
                className="h-full rounded-md object-cover"
              />
              <div className="text-center pt-5">
                <p className="font-bold text-xl">{item.name}</p>
                <p className="text-gray-500 font-semibold mt-1">
                  {item.designation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <br />
      <br />
    </div>
  );
};

const SimpleBanner = ({ title }) => {
  return (
    <div className="items-center rounded-md p-20 bg-white border-2 border-blue-500">
      <div>
        <p className="text-4xl font-bold">{title}</p>
        <p className="mt-2 text-gray-500 font-bold">
          Our teams of expertise in writing
        </p>
      </div>
      {/* <div className="grid grid-cols-6 mt-10 gap-10">
              <TechnologyweUsed/>
           </div> */}
    </div>
  );
};

export const TechnologyweUsed = () => {
  return tech.map((item, index) => {
    return (
      <div key={index} className="border bg-gray-100 rounded-md">
        <img src={item} />
      </div>
    );
  });
};

import Link from "next/link";
import { Logo } from "./header";

const footerMenus = [
  {
    title: "Useful Links",
    links: [
      {
        title: "Our Team",
        slug: "our-team",
      },
      {
        title: "Who we are",
        slug: "about",
      },
      {
        title: "Blogs",
        slug: "blogs",
      },
    ],
  },
  {
    title: "Our Blogs",
    links: [
      {
        title: "Create blogs",
        slug: "login",
      },
      {
        title: "Login",
        slug: "login",
      },
      {
        title: "Create new account",
        slug: "signup",
      },
    ],
  },
];

export default function Footer() {
  return (
    <div className="p-5 bg-brand ">
      <SubFooter />
    </div>
  );
}

const MenuItem = (props) => {
  const {
    menu: { title, links },
  } = props;
  return (
    <div>
      <h5 className="mb-5 text-sm font-bold text-brand uppercase">{title}</h5>
      <div>
        {links.map((link, index) => {
          return (
            <Link href={"/" + link.slug} key={index}>
              <a className="block text-sm text-gray-600 my-2.5">{link.title}</a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export function SubFooter() {
  const socialLinks = [
    {
      icon: "linkedin-square",
      link: "https://linkedin.com",
    },
    {
      icon: "facebook-square",
      link: "https://facebook.com",
    },
    {
      icon: "youtube-play",
      link: "https://youtube.com",
    },
    {
      icon: "twitter",
      link: "https://twitter.com",
    },
  ];
  return (
    <div className=" md:px-20 py-2">
      <div className="grid grid-cols-3 items-center">
        <div>
          <p className="text-xs text-gray-50">
            &copy;blogsite, All Rights Reserved
          </p>
        </div>
        <div className="space-x-3">
          <label className="text-xs text-gray-50">Follow us</label>
          {socialLinks.map((item, index) => {
            return (
              <a
                href={item.link}
                rel="noreferrer"
                target="_blank"
                className={`shadow-md px-3 py-2 rounded-md text-white text-sm fa fa-${item.icon}`}
                key={index}
              ></a>
            );
          })}
        </div>
        <div className="flex space-x-4">
          {["Privacy Policy", "Baneshwor, Nepal", "blogsite.com"].map(
            (item, index) => {
              return (
                <Link href={"/"} key={index}>
                  <a href="#" className="text-xs text-gray-50">
                    {item}
                  </a>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

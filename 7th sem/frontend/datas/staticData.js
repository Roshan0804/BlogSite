const main_menus = [
  {
    label: "Blogs",
    link: "/blogs",
    notation: "/blogs",
  },
  {
    label: "Our Team",
    link: "/team",
    notation: "/team",
  },
  // {
  //   label: "About us",
  //   link: "#",
  //   notation: "/about",
  //   sub: [
  //     {
  //       label: "Who we are",
  //       notation: "/about",
  //       link: "/about",
  //     },
  //     {
  //       label: "Our Team",
  //       notation: "/about",
  //       link: "/team",
  //     },
  //   ],
  // },
];

const right_menus = [
  {
    icon: "user",
    label: "Login",
    color: "blue",
    link: "/login",
  },
  {
    icon: "users",
    color: "gray",
    label: "Signup",
    link: "/login",
  },
];

export { main_menus, right_menus };

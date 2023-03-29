const navItems = [
  { title: "home", path: "/", shouldTranslate: true },
  {
    title: "about",

    dropdown: [
      {
        title: "about_school",
        path: "/aboutus/",
      },
      {
        title: "facilities",
        path: "/aboutus/facilities/",
      },
      {
        title: "message_from_principal",
        path: "/aboutus/messagefromprincipal/",
      },
      {
        title: "our_staff",
        path: "/aboutus/ourstaff/",
      },
    ],
    shouldTranslate: true,
  },
  {
    title: "notices",
    path: "/news/",
    shouldTranslate: true,
  },
  {
    title: "events",
    path: "/events/",
    shouldTranslate: true,
  },
  {
    title: "blogs",
    path: "/blogs/",
    shouldTranslate: true,
  },
  {
    title: "gallery",
    dropdown: [
      {
        title: "photo",
        path: "/media/photogallery/",
      },
      {
        title: "video",
        path: "/media/videogallery/",
      },
    ],
  },

  {
    title: "downloads",
    path: "/download/",
  },
  {
    title: "contact",
    path: "/contact/",
  },
];

export { navItems };

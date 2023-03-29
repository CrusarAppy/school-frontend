import {
  House,
  Calendar2Event,
  Journal,
  PlusLg,
  Table,
  Images,
  Envelope,
  Calendar2Date,
  CalendarRange,
  PlayBtn,
  CloudArrowDown,
} from "react-bootstrap-icons";

const menuItems = [
  { title: "Home", icon: <House size="20px" />, path: "/admin/dashboard/" },
  {
    title: "Events",
    icon: <Calendar2Event size="20px" />,
    subNav: [
      {
        title: "Create ",
        path: "/admin/create-event",
        icon: <PlusLg size="20px" />,
      },
      {
        title: "List ",
        path: "/admin/events/",
        icon: <Table size="20px" />,
      },
    ],
  },
  {
    title: "Blogs",
    icon: <Journal size="20px" />,
    subNav: [
      {
        title: "Create ",
        path: "/admin/create-blogs/",
        icon: <PlusLg size="20px" />,
      },
      {
        title: "List ",
        path: "/admin/blogs/",
        icon: <Table size="20px" />,
      },
    ],
  },
  {
    title: "Notices",
    icon: <Calendar2Date size="20px" />,
    subNav: [
      {
        title: "Create ",
        path: "/admin/create-notice/",
        icon: <PlusLg size="20px" />,
      },
      {
        title: "List ",
        path: "/admin/notices/",
        icon: <Table size="20px" />,
      },
    ],
  },
  {
    title: "Special Notices",
    icon: <CalendarRange size="20px" />,
    subNav: [
      {
        title: "Create ",
        path: "/admin/create-special-notices/",
        icon: <PlusLg size="20px" />,
      },
      {
        title: "List ",
        path: "/admin/special-notices/",
        icon: <Table size="20px" />,
      },
    ],
  },
  {
    title: "Photos",
    icon: <Images size="20px" />,
    subNav: [
      {
        title: "Create ",
        path: "/admin/create-photos/",
        icon: <PlusLg size="20px" />,
      },
      {
        title: "List ",
        path: "/admin/photos/",
        icon: <Table size="20px" />,
      },
    ],
  },
  {
    title: "Videos",
    icon: <PlayBtn size="20px" />,
    subNav: [
      {
        title: "Create ",
        path: "/admin/create-videos/",
        icon: <PlusLg size="20px" />,
      },
      {
        title: "List ",
        path: "/admin/videos/",
        icon: <Table size="20px" />,
      },
    ],
  },
  {
    title: "Downloads",
    icon: <CloudArrowDown size="20px" />,
    subNav: [
      {
        title: "Create ",
        path: "/admin/create-downloads/",
        icon: <PlusLg size="20px" />,
      },
      {
        title: "List ",
        path: "/admin/downloads/",
        icon: <Table size="20px" />,
      },
    ],
  },
  {
    title: "Messages",
    icon: <Envelope size="20px" />,
    path: "/admin/messages/",
  },
];

export { menuItems };

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Contact from "./pages/contact";
import Signup from "./pages/signup";
import ResetPassword from "./pages/resetPassword";
import PhotoGallery from "./pages/photoGallery";
import Photo from "./pages/photoGallery/photo";
import About from "./pages/about";
import Events from "./pages/events";
import EventDetails from "./pages/events/event";
import NewsDetails from "./pages/news/news/index";
import Home from "./pages/home";
import News from "./pages/news/index";
import VideoGallery from "./pages/videogallery/index";
import Download from "./pages/download";
import SingleDownload from "./components/Download";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessageFromPrincipal from "./pages/messageFromPrincipal";
import PublicRoutes from "./routes/PublicRoutes";
import Login from "./pages/admin/login";
import ForgotPassword from "./pages/admin/login/ForgotPassword";
import AdminRoutes from "./routes/AdminRoutes";
import Profile from "./pages/admin/profile/Profile";
import EventList from "./pages/admin/events/EventList";
import CreateEvent from "./pages/admin/events/CreateEvent";
import EditEvent from "./pages/admin/events/EditEvent";
import CreateBlog from "./pages/admin/blogs/CreateBlog";
import BlogList from "./pages/admin/blogs/BlogList";
import EditBlog from "./pages/admin/blogs/EditBlog";
import CreateNotice from "./pages/admin/notices/CreateNotice";
import NoticeList from "./pages/admin/notices/NoticeList";
import EditNotice from "./pages/admin/notices/EditNotice";
import CreateSpecialNotice from "./pages/admin/specialNotices/CreateSpecialNotice";
import SpecialNoticeList from "./pages/admin/specialNotices/SpecialNoticeList";
import CreatePhotos from "./pages/admin/photos/CreatePhotos";
import PhotoList from "./pages/admin/photos/PhotoList";
import EditPhotos from "./pages/admin/photos/EditPhotos";
import MessageList from "./pages/admin/messages/MessageList";
import CreateVideo from "./pages/admin/videos/CreateVideo";
import VideoList from "./pages/admin/videos/VideoList";
import EditVideo from "./pages/admin/videos/EditVideo";
import OurStaff from "./pages/ourstaff";
import Facilities from "./pages/facilities";
import Notices from "./pages/news/index";
import Blogs from "./pages/blogs/index";
import BlogsDetails from "./pages/blogs/blogs/index";
import CreateDownloads from "./pages/admin/downloads/CreateDownloads";
import DownloadsList from "./pages/admin/downloads/DownloadsList";
import EditDownloads from "./pages/admin/downloads/EditDownloads";
import { useEffect } from "react";

const notifySuccess = (message) => toast.success(message);
const notifyError = (message) => {
  toast.error(message);
};

function App() {
  return (
    <Router>
      <div className={styles.container}>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route
            path="/*"
            element={
              <PublicRoutes>
                <Routes>
                  <Route path="/contact/" element={<Contact />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/login/" element={<Login />} />
                  <Route path="/signup/" element={<Signup />} />
                  <Route path="/resetpassword/" element={<ResetPassword />} />
                  <Route
                    path="/media/photogallery/"
                    element={<PhotoGallery />}
                  />
                  <Route
                    path="/media/videogallery/"
                    element={<VideoGallery />}
                  />
                  <Route
                    path="/media/photogallery/photos/"
                    element={<Photo />}
                  />
                  <Route path="/aboutus/" element={<About />} />
                  <Route path="/events/" element={<Events />} />
                  <Route path="/news/" element={<Notices />} />
                  <Route path="/blogs/" element={<Blogs />} />
                  <Route path="/blogs/:id" element={<BlogsDetails />} />
                  <Route path="/events/:id" element={<EventDetails />} />
                  <Route path="/news/:id" element={<NewsDetails />} />
                  <Route path="/download/" element={<Download />} />
                  <Route path="/aboutus/ourstaff/" element={<OurStaff />} />
                  <Route path="/aboutus/facilities/" element={<Facilities />} />
                  <Route path="/download/:id/" element={<SingleDownload />} />
                  <Route
                    path="/aboutus/messagefromprincipal/"
                    element={<MessageFromPrincipal />}
                  />
                </Routes>
              </PublicRoutes>
            }
          />
          <Route path="/admin/" element={<Login />} />
          <Route path="/admin/forgot-password/" element={<ForgotPassword />} />
          <Route
            path="/admin/*"
            element={
              <AdminRoutes redirectTo="/admin">
                <Routes>
                  <Route path="/dashboard/" element={<>dashboard</>} index />
                  <Route
                    path="/create-event/"
                    element={<CreateEvent />}
                    index
                  />
                  <Route path="/events/" element={<EventList />} />
                  <Route path="/events/:id/" element={<EditEvent />} />
                  <Route path="/create-blogs/" element={<CreateBlog />} />
                  <Route path="/blogs/" element={<BlogList />} />
                  <Route path="/blogs/:id/" element={<EditBlog />} />
                  <Route path="/create-notice/" element={<CreateNotice />} />
                  <Route path="/notices/" element={<NoticeList />} />
                  <Route path="/notices/:id/" element={<EditNotice />} />
                  <Route
                    path="/create-special-notices/"
                    element={<CreateSpecialNotice />}
                  />
                  <Route
                    path="/special-notices/"
                    element={<SpecialNoticeList />}
                  />

                  <Route path="/create-videos/" element={<CreateVideo />} />
                  <Route path="/videos/" element={<VideoList />} />
                  <Route path="/videos/:id/" element={<EditVideo />} />

                  <Route path="/create-photos/" element={<CreatePhotos />} />
                  <Route path="/photos/" element={<PhotoList />} />
                  <Route path="/photos/:id/" element={<EditPhotos />} />

                  <Route
                    path="/create-downloads/"
                    element={<CreateDownloads />}
                  />
                  <Route path="/downloads/" element={<DownloadsList />} />
                  <Route path="/downloads/:id/" element={<EditDownloads />} />

                  <Route path="/messages/" element={<MessageList />} />

                  <Route path="/profile/" element={<Profile />} />

                  <Route path="*" element={<>Admin Not found</>} />
                </Routes>
              </AdminRoutes>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

export { notifyError, notifySuccess };

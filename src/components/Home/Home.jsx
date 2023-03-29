import React from "react";
import { Link } from "react-router-dom";
import src from "../../assets/images/blog2.jpg";
import src1 from "../../assets/images/press.jpg";
import src2 from "../../assets/images/blog1.jpg";
import "./../../assets/css/homeEvent/homeEvents.scss";

const eventItems = [
  {
    title: "How To Setup Redux In React Next Application",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: "25 Feb, 2020",
    image: src,
    id: 1,
  },
  {
    title: "How To Resubmit Rejected Item Into ThemeForestd dsad asd",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: "27 Feb, 2020",
    image: src2,
    id: 2,
  },
  {
    title: "Implementing Bootstrap Navwalker In WordPress",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: "30 Feb, 2020",
    image: src1,
    id: 3,
  },
  {
    title: "How To Resubmit Rejected Item Into ThemeForestd dsad asd",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: "27 Feb, 2020",
    image: src2,
    id: 4,
  },
];

function HomeNotices() {
  return (
    <div>
      <section className="blog-area ptb-120 bg-image">
        <div className="container">
          <div className="sub-header">Notice</div>
          <div className="event-heading-container">
            <div className="home-title">Latest Notice</div>
            <div className="event-arrow">
              <i class="icofont-arrow-right"></i>
            </div>
          </div>
          <div className="row">
            {eventItems.map((item, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="single-blog-post">
                  <div className="blog-image">
                    <Link to="#">
                      <img src={item.image} alt="blog" />
                    </Link>
                  </div>

                  <div className="blog-post-content">
                    <span className="date">{item.date}</span>
                    <h3>
                      <Link to="#">{item.title}</Link>
                    </h3>
                    <p>{item.description}</p>
                    <Link
                      to={{
                        pathname: `eventdetails`,
                      }}
                      state={{ id: `${index}` }}
                      className="read-more-btn"
                    >
                      Read More <i className="icofont-double-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeNotices;

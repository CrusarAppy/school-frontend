import cx from "classnames";
import React from "react";

function Pagination({ page = 1, setPage, lastPage = 1 }) {
  return (
    <div className="pagination-area">
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <span
              className="page-link"
              onClick={() => {
                page === 1 ? setPage(1) : setPage((prevPage) => prevPage - 1);
              }}
            >
              <i className="icofont-double-left"></i>
            </span>
          </li>
          {Array.from({ length: lastPage >= 5 ? 5 : lastPage }, (v, k) => {
            if (lastPage <= 5 || page <= 2) {
              return k + 1;
            } else if (page + 2 <= lastPage) {
              return page - 2 + k;
            } else {
              return lastPage - 5 + k + 1;
            }
          }).map((element) => (
            <li className="page-item" key={element}>
              <span
                className={cx("page-link", page == element ? "active" : "")}
                onClick={() => {
                  setPage(element);
                }}
              >
                {element}
              </span>
            </li>
          ))}

          <li className="page-item">
            <span
              className="page-link"
              onClick={() => {
                page === lastPage
                  ? setPage(lastPage)
                  : setPage((prevPage) => prevPage + 1);
              }}
            >
              <i className="icofont-double-right"></i>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;

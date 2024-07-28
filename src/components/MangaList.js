import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const MangaList = () => {
  const [manga, setManga] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getManga();
  }, [page, keyword]);

  const getManga = async () => {
    console.log(query);
    const response = await fetch(
      `https://pb.hatsu.my.id/list?q=${query}&page=${page}&limit=${limit}`,
      {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await response.json();
    setManga(data.data.manga);
    setPages(data.data.page);
    setPages(data.data.totalPage);
    setRows(data.data.totalManga);
  };
  console.log(manga);

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg('If data not found, search using spesific key');
    } else {
      setMsg('');
    }
  };

  const searchData = e => {
    e.preventDefault();
    setPage(0);
    setMsg('');
    setKeyword(query);
  };

  return (
    <div className="container mt-5">
      <div className="columns">
        <div className="column is-centered">
          <form onSubmit={searchData}>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  type="text"
                  className="input"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Find..."
                />
              </div>
              <div className="control ">
                <button type="submit" className="button is-info">
                  Search
                </button>
              </div>
            </div>
          </form>
          <table className="table is-stripted is-bordered is-fullwidth mt-2">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Rating</th>
                <th>Total Chapter</th>
              </tr>
            </thead>
            <tbody>
              {manga.map(item => {
                {
                  <p>{item.title}</p>;
                }
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.rating}</td>
                  <td>{item.chapters.length}</td>
                </tr>;
              })}
            </tbody>
          </table>
          <p>
            Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
          </p>
          <p className="has-text-centerest has-text-danger">{msg}</p>
          <nav
            className="pagination is-centered"
            keys={rows}
            role="navigation"
            aria-label="pagination"
          >
            <ReactPaginate
              previousLabel={'< Prev'}
              nextLabel={'Next >'}
              pageCount={Math.min(10, pages)}
              onPageChange={changePage}
              containerClassName={'pagination-list'}
              pageLinkClassName={'pagination-link'}
              previousLinkClassName={'pagination-previous'}
              nextLinkClassName={'pagination-next'}
              activeLinkClassName={'pagination-link is-current'}
              disabledLinkClassName={'pagination-link is-disabled'}
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MangaList;

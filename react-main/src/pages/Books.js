import { useEffect, useState} from "react";
import { Link} from "react-router-dom";
import AddBook from "../components/AddBook";
import { baseUrl } from "../shared";
import useFetch from "../hooks/UseFetch";

export default function Books() {

  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show);
  }

  //gets the url for all the books
  const url = baseUrl + "api/allbooks/";
  const {
    request,
    appendData,
    data: { books } = {},
  } = useFetch(url, {
    //gets all the books using get keyword
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
  });

  useEffect(() => {
    //gets request upon start of page
    request();
  }, []);

  //sets new book with the append data
  function newBook(name, price, numOfPages, type) {
    appendData({ name: name, price: price, numOfPages: numOfPages, type:type });
  }

  return (
    <>
      <h1>All Books</h1>
      {books
        ? books.map((book) => { //maps the books and displays each in a button with the name displayed
            return (
              <div className="m-2" key={book._id}>
                <Link to={"/allbooks/" + book._id}>
                  <button className="no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    {book.name}
                  </button>
                </Link>
              </div>
            );
          })
        : null}

      {/*calls the addbook function which sends responsibilities and all necassary data to the AddBook file/function which immediently hides the rest of the page and makes a popup*/}
      <AddBook newBook={newBook} show={show} toggleShow={toggleShow} />
    </>
  );
}

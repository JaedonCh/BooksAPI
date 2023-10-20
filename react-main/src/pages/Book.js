import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../shared";

export default function Book() {
  //Variables
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState();
  //this is the book that is created for this page with all the data that the actual database book has
  const [tempBook, setTempBook] = useState();
  const [notFound, setNotFound] = useState();
  //checks to see if the fields have been interacted with
  //if so it sets this to true and allows the user to save changes to database
  const [changed, setChanged] = useState(false);
  //error variable to make things easier
  const [error, setError] = useState();

  useEffect(() => {
    //makes sure that there is a book otherwise returns
    //just a backup error check if somethign went wro9ng on the backend
    if (!book) return;

    //This all only activates on the loading of tha page.
    //hasChanged variable usually only used down in the actual fields directly but is explained here how Haschanged works
    //checks all the tempBook fields and if any arent equal to the actual book it sets the haschanged to true so that the book can be saved
    let equal = true;
    if (book.name !== tempBook.name) equal = false;
    if (book.price !== tempBook.price) equal = false;
    if (book.numOfPages !== tempBook.numOfPages) equal = false;
    if (book.type !== tempBook.type) equal = false;

    if (equal) setChanged(false);
  });

  //Cancel Button
  useEffect(() => {
    //gets url
    const url = baseUrl + "api/allbooks/" + id;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //sets the book to the book in the database for safe measures
        setBook(data.book);
        //sets the temp book back to the databsae version
        setTempBook(data.book);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  //Save button
  function updateBook(e) {
    //creates url
    e.preventDefault();
    const url = baseUrl + "api/allbooks/" + id;
    fetch(url, {
      method: "PUT",
      headers: {
        //gets access to db
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      //turns the tempBook (updated book) to a string
      body: JSON.stringify(tempBook),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //sets the actual database book as the updated tempBook
        setBook(data.book);
        //sets changed to false so that the user cant save as it is already saved
        setChanged(false);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  return (
    <div className="p-3">
      {notFound ? <p>No Book was Found</p> : null}

      {book ? (
        <div>
          <form className="w-full max-w-sm" id="book" onSubmit={updateBook}>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label htmlFor="name">Name</label>
              </div>

              <div className="md:w-3/4">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
                  type="text"
                  value={tempBook.name}
                  onChange={(e) => {
                    //sets change to true so it can be saved
                    setChanged(true);
                    //sets the temp book to be the regular book except for the name field which is changed to the new one.
                    //this is the same for all the fields but with respect to whichever field they are
                    setTempBook({
                      ...tempBook,
                      name: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label htmlFor="price">Price</label>
              </div>

              <div className="md:w-3/4">
                <input
                  id="price"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempBook.price}
                  onChange={(e) => {
                    setChanged(true);
                    setTempBook({
                      ...tempBook,
                      price: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label htmlFor="price">Number Of Pages</label>
              </div>

              <div className="md:w-3/4">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="numOfPages"
                  type="text"
                  value={tempBook.numOfPages}
                  onChange={(e) => {
                    setChanged(true);
                    setTempBook({
                      ...tempBook,
                      numOfPages: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label htmlFor="price">Type (Paper, Hardcover, Digital)</label>
              </div>

              <div className="md:w-3/4">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="type"
                  type="text"
                  value={tempBook.type}
                  onChange={(e) => {
                    setChanged(true);
                    setTempBook({
                      ...tempBook,
                      type: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </form>
          {changed ? (//if haschanged is true it displays the cancel and save buttons
            <div className="mb-2">
              <button
                className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 mr-2 rounded"
                onClick={(e) => {
                  //sets tempbook back and changed to false removing the buttons
                  setTempBook({ ...book });
                  setChanged(false);
                }}
              >
                Cancel
              </button>
              <button
                form="book"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >{/* is part of the book form and will act as submit button to call the updateBook method to save th book to the db*/}
                Save
              </button>
            </div>
          ) : null}

          <div>
            <button
              className="bg-slate-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => {
                //gets url for the specific book being displayed
                const url = baseUrl + "api/allbooks/" + id;
                fetch(url, {
                  //passes in DELETE method which deletes the record from the db
                  method: "DELETE",
                  headers: {
                    //gets access to db
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access"),
                  },
                })
                  .then((response) => {
                    //sends user to allbooks page when clicked
                    navigate("/allbooks");
                  })
                  .catch((e) => {
                    setError(e.message);
                  });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : null}

      {error ? <p>{error}</p> : null}
      <br />
      <Link to="/allbooks">
        {/* Links back to all books page */}
        <button className="no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          ← Go back
        </button>
      </Link>
    </div>
  );
}

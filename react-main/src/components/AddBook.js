import React, { useState } from "react";
//uses Modal from bootstrap to make most of the functionality of this page
import Modal from "react-bootstrap/Modal";

export default function AddBook(props) {
  //Variables for all fields on a book
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [numOfPages, setNumOfPages] = useState("");
  const [type, setType] = useState("");
  //is used to show the actual dropdown that this page is
  const [show, setShow] = useState(props.show);

  const handleClose = () => setShow(false);

  return (
    <>
      <button
        onClick={props.toggleShow}
        className="block m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        {/* when create button clicked sets toggleshow to true which hides the AddBook popup*/}
        Create New Book
      </button>

      <Modal
        show={props.show}
        onHide={handleClose}
        //removes interaction with the background
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Create Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              //sets all the field variables back to being empty
              setName("");
              setPrice("");
              setNumOfPages("");
              setType("");
              //props was passed into the whole AddBook function
              //is used to save the book
              props.newBook(name, price, numOfPages, type);
            }}
            id="editmodal"
            className="w-full max-w-sm"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="name"
                >
                  Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    //updates each field variable to be the fields when they are changed
                    //same for all the other fields respectivly
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="price"
                >
                  Price
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="price"
                  type="text"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="numOfPages"
                >
                  Number Of Pages
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="numOfPages"
                  type="text"
                  value={numOfPages}
                  onChange={(e) => {
                    setNumOfPages(e.target.value);
                  }}
                />
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="type"
                  >
                    Type of Book
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="type"
                    type="text"
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
            onClick={props.toggleShow}
          >
            {" "}
            {/* just hides the modal */}
            Close
          </button>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={props.toggleShow}
            form="editmodal"
          >
            {/* hides the modal and submits the form to save it to the db */}
            Create
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

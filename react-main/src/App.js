import "./index.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/Books";
import Book from "./pages/Book";
import { baseUrl } from "./shared";

function App() {
  useEffect(() => {
    //function that refreshes the database every 3 minutes
    function refreshTokens() {
      if (localStorage.refresh) {
        const url = baseUrl + "api/token/refresh/";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: localStorage.refresh,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            localStorage.access = data.access;
            localStorage.refresh = data.refresh;
          });
      }
    }

    const minute = 1000 * 60;
    refreshTokens();
    setInterval(refreshTokens, minute * 3);
  }, []);

  return (
    //defines the 2 routes and then any other will just go to the allBooks page
    <BrowserRouter>
      <Routes>
        <Route path="/allbooks" element={<Books />} />
        <Route path="/allbooks/:id" element={<Book />} />
        <Route path="*" element={<Books />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

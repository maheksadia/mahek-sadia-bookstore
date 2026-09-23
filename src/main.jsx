import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const ADMIN_PASSWORD = "mahek2026";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [books, setBooks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mahek_books")) || [];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    localStorage.setItem("mahek_books", JSON.stringify(books));
  }, [books]);

  const login = (e) => {
    e.preventDefault();

    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setError("");
      setPassword("");
    } else {
      setError("Incorrect password.");
    }
  };

  const addBook = (e) => {
    e.preventDefault();

    if (!title || !pdf) {
      alert("Please enter the book title and select a PDF.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const newBook = {
        id: Date.now(),
        title,
        price: price || "99",
        description,
        pdf: reader.result,
      };

      const updated = [...books, newBook];

      setBooks(updated);
      setTitle("");
      setPrice("");
      setDescription("");
      setPdf(null);

      document.getElementById("pdfInput").value = "";

      alert("Book added successfully.");
    };

    reader.readAsDataURL(pdf);
  };

  const deleteBook = (id) => {
    if (!confirm("Delete this book?")) return;

    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="site">

      <header className="navbar">
        <div>
          <div className="logo">MAHEK SADIA</div>
          <div className="tagline">Official Digital Bookstore</div>
        </div>

        <button
          className="adminButton"
          onClick={() => setIsAdmin(!isAdmin)}
        >
          {isAdmin ? "STORE" : "ADMIN"}
        </button>
      </header>

      {!isAdmin ? (
        <>
          <section className="hero">
            <div className="smallTitle">WORDS • FAITH • STORIES</div>

            <h1>
              A little world of words,
              <br />
              <i>by Mahek Sadia.</i>
            </h1>

            <p>
              Urdu stories, poetry and books written from the space between
              emotions, faith and life.
            </p>
          </section>

          <section className="booksSection">
            <div className="sectionTitle">
              <h2>Books</h2>
              <span>{books.length} books</span>
            </div>

            {books.length === 0 ? (
              <div className="empty">
                <h3>No books yet.</h3>
                <p>
                  Open the Admin panel to upload your first digital book.
                </p>
              </div>
            ) : (
              <div className="bookGrid">
                {books.map((book) => (
                  <div className="bookCard" key={book.id}>

                    <div className="bookCover">
                      <span>
                        MAHEK
                        <br />
                        SADIA
                      </span>
                    </div>

                    <div className="bookInfo">
                      <h3>{book.title}</h3>

                      <div className="author">
                        Mahek Sadia
                      </div>

                      <p>{book.description}</p>

                      <div className="price">
                        ₹{book.price}
                      </div>

                      <a
                        className="readButton"
                        href={book.pdf}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Read Ebook
                      </a>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      ) : (
        <section className="adminPage">

          <div className="adminHeader">
            <div>
              <div className="smallTitle">PRIVATE ADMIN</div>
              <h1>Book Manager</h1>
              <p>Add and manage your digital books.</p>
            </div>

            <button
              className="storeButton"
              onClick={() => setIsAdmin(false)}
            >
              ← Store
            </button>
          </div>

          <div className="adminPanel">

            <h2>Add New Book</h2>

            <form onSubmit={addBook}>

              <label>
                Book Title
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Darmiyan"
                />
              </label>

              <label>
                Price (INR)
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="99"
                />
              </label>

              <label>
                Description
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a short description..."
                />
              </label>

              <label>
                PDF Ebook
                <input
                  id="pdfInput"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) =>
                    setPdf(e.target.files?.[0] || null)
                  }
                />
              </label>

              <button className="uploadButton" type="submit">
                Upload Book
              </button>

            </form>

          </div>

          <div className="adminPanel">

            <h2>Uploaded Books</h2>

            {books.length === 0 ? (
              <p className="muted">No books uploaded.</p>
            ) : (
              books.map((book) => (
                <div className="adminBook" key={book.id}>

                  <div>
                    <strong>{book.title}</strong>
                    <small>
                      ₹{book.price} · Mahek Sadia
                    </small>
                  </div>

                  <div className="adminActions">

                    <a
                      href={book.pdf}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open
                    </a>

                    <button
                      className="deleteButton"
                      onClick={() => deleteBook(book.id)}
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))
            )}

          </div>

          <div className="adminNote">
            <strong>Admin password:</strong> mahek2026
          </div>

        </section>
      )}

      {!isAdmin && (
        <section className="loginSection">

          <h2>Author Admin</h2>

          <p>Private access for Mahek Sadia.</p>

          <form onSubmit={login}>

            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
              Enter Admin
            </button>

          </form>

          {error && <div className="error">{error}</div>}

        </section>
      )}

      <footer>
        © 2026 Mahek Sadia · Software Engineer · Writer · Poet
      </footer>

    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

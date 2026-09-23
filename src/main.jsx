

          import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import "./styles.css";

const ADMIN_PASSWORD = "mahek2026";

const SUPABASE_URL = "https://vvvkuyepfkerkcztlpvd.supabase.co";
const SUPABASE_KEY = "https://vvvkuyepfkerkcztlpvd.supabase.co"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [pdf, setPdf] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    setLoadingBooks(true);

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setError("Could not load books.");
    } else {
      setBooks(data || []);
    }

    setLoadingBooks(false);
  }

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

  async function addBook(e) {
    e.preventDefault();

    if (!title || !pdf) {
      alert("Please enter the book title and select a PDF.");
      return;
    }

    if (pdf.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }

    setUploading(true);

    try {
      const fileName =
        Date.now() +
        "-" +
        pdf.name.replace(/[^a-zA-Z0-9._-]/g, "-");

      const filePath = `books/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("ebooks")
        .upload(filePath, pdf, {
          contentType: "application/pdf",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { error: databaseError } = await supabase
        .from("books")
        .insert([
          {
            title,
            price: Number(price || 99),
            description,
            pdf_path: filePath,
          },
        ]);

      if (databaseError) {
        await supabase.storage
          .from("ebooks")
          .remove([filePath]);

        throw databaseError;
      }

      setTitle("");
      setPrice("");
      setDescription("");
      setPdf(null);

      const input = document.getElementById("pdfInput");
      if (input) input.value = "";

      await loadBooks();

      alert("Book uploaded successfully.");
    } catch (err) {
      console.error(err);
      alert(
        "Upload failed: " +
          (err?.message || "Unknown error")
      );
    } finally {
      setUploading(false);
    }
  }

  async function getPdfUrl(path) {
    const { data, error } = await supabase.storage
      .from("ebooks")
      .createSignedUrl(path, 60 * 60);

    if (error) {
      alert("Could not open ebook.");
      console.error(error);
      return null;
    }

    return data.signedUrl;
  }

  async function openBook(book) {
    const url = await getPdfUrl(book.pdf_path);

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }

  async function deleteBook(book) {
    if (!confirm(`Delete "${book.title}"?`)) return;

    try {
      const { error: storageError } = await supabase.storage
        .from("ebooks")
        .remove([book.pdf_path]);

      if (storageError) {
        throw storageError;
      }

      const { error: databaseError } = await supabase
        .from("books")
        .delete()
        .eq("id", book.id);

      if (databaseError) {
        throw databaseError;
      }

      await loadBooks();

      alert("Book deleted successfully.");
    } catch (err) {
      console.error(err);
      alert(
        "Delete failed: " +
          (err?.message || "Unknown error")
      );
    }
  }

  return (
    <div className="site">
      <header className="navbar">
        <div>
          <div className="logo">MAHEK SADIA</div>
          <div className="tagline">
            Official Digital Bookstore
          </div>
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
            <div className="smallTitle">
              WORDS • FAITH • STORIES
            </div>

            <h1>
              A little world of words,
              <br />
              <i>by Mahek Sadia.</i>
            </h1>

            <p>
              Urdu stories, poetry and books written from
              the space between emotions, faith and life.
            </p>
          </section>

          <section className="booksSection">
            <div className="sectionTitle">
              <h2>Books</h2>
              <span>{books.length} books</span>
            </div>

            {loadingBooks ? (
              <div className="empty">
                <h3>Loading books...</h3>
              </div>
            ) : books.length === 0 ? (
              <div className="empty">
                <h3>No books yet.</h3>
                <p>
                  Open the Admin panel to upload your
                  first digital book.
                </p>
              </div>
            ) : (
              <div className="bookGrid">
                {books.map((book) => (
                  <div
                    className="bookCard"
                    key={book.id}
                  >
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

                      <button
                        className="readButton"
                        onClick={() => openBook(book)}
                      >
                        Read Ebook
                      </button>
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
              <div className="smallTitle">
                PRIVATE ADMIN
              </div>

              <h1>Book Manager</h1>

              <p>
                Add and manage your digital books.
              </p>
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
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Darmiyan"
                />
              </label>

              <label>
                Price (INR)

                <input
                  type="number"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  placeholder="99"
                />
              </label>

              <label>
                Description

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
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
                    setPdf(
                      e.target.files?.[0] || null
                    )
                  }
                />
              </label>

              <button
                className="uploadButton"
                type="submit"
                disabled={uploading}
              >
                {uploading
                  ? "Uploading..."
                  : "Upload Book"}
              </button>
            </form>
          </div>

          <div className="adminPanel">
            <h2>Uploaded Books</h2>

            {books.length === 0 ? (
              <p className="muted">
                No books uploaded.
              </p>
            ) : (
              books.map((book) => (
                <div
                  className="adminBook"
                  key={book.id}
                >
                  <div>
                    <strong>{book.title}</strong>

                    <small>
                      ₹{book.price} · Mahek Sadia
                    </small>
                  </div>

                  <div className="adminActions">
                    <button
                      onClick={() => openBook(book)}
                    >
                      Open
                    </button>

                    <button
                      className="deleteButton"
                      onClick={() => deleteBook(book)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="adminNote">
            <strong>Admin password:</strong>{" "}
            mahek2026
          </div>
        </section>
      )}

      {!isAdmin && (
        <section className="loginSection">
          <h2>Author Admin</h2>

          <p>
            Private access for Mahek Sadia.
          </p>

          <form onSubmit={login}>
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button type="submit">
              Enter Admin
            </button>
          </form>

          {error && (
            <div className="error">{error}</div>
          )}
        </section>
      )}

      <footer>
        © 2026 Mahek Sadia · Software Engineer ·
        Writer · Poet
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <App />
);

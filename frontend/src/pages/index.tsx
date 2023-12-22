import axios from "axios"
import { useEffect, useState } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { ListOfBooks } from "@/components/ListOfBooks"

export const BASE_URL = "http://127.0.0.1:8000"

export type BookType = {
  id: Number,
  title: String,
  status: Number
}

export default function Home() {

  const [newBookTitle, setNewBookTitle] = useState("");
  const [books, setBooks] = useState([] as BookType[]);

  const addBook = () => {
    axios.post(BASE_URL + "/books", { id: 0, title: newBookTitle, status: 0 }).then(
      response => response.data
    ).then((id: Number) => {
      axios.get(`${BASE_URL}/books/${id}`).then(response => response.data).then(book => {
        const newBooks: BookType[] = books;
        newBooks.push(book);
        setNewBookTitle("");
        setBooks(newBooks);
      })
    })
  }

  useEffect(() => {
    axios.get(BASE_URL + "/books").then((response) => response.data).then(books => setBooks(books));
  }, []);

  return (
    <div className="m-8">
      <div className="flex"><h1 className="mx-auto mb-4 text-2xl">Book Tracker</h1></div>
      <div className="flex gap-3 w-96 mx-auto">
        <Input type="text" placeholder="Enter the book title" onChange={(event: any) => setNewBookTitle(event.target.value)} value={newBookTitle}
        />
        <Button variant="outline" onClick={(event) => addBook()}>Add Book</Button>
      </div>
      <ListOfBooks books={books} setBooks={setBooks} />
    </div>
  )
}


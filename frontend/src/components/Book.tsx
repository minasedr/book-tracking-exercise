import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

import { BASE_URL } from "@/pages";
import { BookType } from "@/pages";

const Book = ({
  book,
  books,
  setBooks,
}: {
  book: BookType;
  books: BookType[];
  setBooks: Dispatch<SetStateAction<BookType[]>>;
}) => {
  const updateBook = async (status: Number) => {
    axios
      .put(`${BASE_URL}/books/`, {
        id: book.id,
        title: book.title,
        status: status,
      })
      .then((response) => {
        setBooks(
          books.map((x) => {
            if (x.id == book.id) x.status = status;
            return x;
          })
        );
      });
  };

  const deleteBook = async () => {
    axios.delete(`${BASE_URL}/books/${book.id}`).then((response) => {
      setBooks(books.filter((x) => x.id != book.id));
    });
  };

  return (
    <div className="mx-3 border-2 p-2 rounded-md">
      <div className="my-4 mx-2 text-lg">
        <h3 className="">
          <b>Title:</b> {book.title}
        </h3>
      </div>
      <div className="flex gap-5">
        <Select onValueChange={(value) => updateBook(Number(value))}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Change status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="0">To be read</SelectItem>
              <SelectItem value="1">In progress</SelectItem>
              <SelectItem value="2">Completed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="bg-red-600 hover:bg-red-400"
          onClick={(event) => deleteBook()}
        >
          Delete Book
        </Button>
      </div>
    </div>
  );
};

export default Book;

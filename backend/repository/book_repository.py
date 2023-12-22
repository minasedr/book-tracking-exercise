import sqlite3
from typing import List
from models.books import Book


class BookRepository:
    def __init__(self) -> None:
        self._connection = sqlite3.connect("books.db")
        self._cursor = self._connection.cursor()

    def create_table(self) -> bool:
        self._cursor.execute(
            """CREATE TABLE IF NOT EXISTS books (
                    id INTEGER PRIMARY KEY,
                    title TEXT,
                    status INTEGER DEFAULT 0
                )
            """
        )
        self._connection.commit()

    def get_all_books(self) -> List[Book]:
        self._cursor.execute("SELECT * FROM books")

        list_of_books = []

        for id, title, status in self._cursor.fetchall():
            list_of_books.append(
                Book(
                    id=id,
                    title=title,
                    status=status,
                )
            )
        self._connection.commit()

        return list_of_books

    def create_book(self, book: Book) -> int:
        self._cursor.execute(
            f"INSERT INTO books(title, status) VALUES('{book.title}', {book.status})"
        )
        book.id = self._cursor.lastrowid

        return book.id

    def get_book_by_id(self, book_id: int) -> Book:
        try:
            self._cursor.execute(f"SELECT * FROM books WHERE id={book_id}")
            res = self._cursor.fetchone()
            self._connection.commit()
            id, title, status = res
            return Book(id=id, title=title, status=status)
        except:
            return None

    def update_book(self, book: Book):
        self._cursor.execute(
            f"UPDATE books SET title='{book.title}', status='{book.status}' WHERE id={book.id}"
        )
        self._connection.commit()

    def delete_book(self, book_id: int) -> bool:
        try:
            self._cursor.execute(f"DELETE FROM books WHERE id={book_id}")
            self._connection.commit()
            return True
        except:
            return False

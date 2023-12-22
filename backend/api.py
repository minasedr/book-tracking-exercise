from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.books import Book
from repository.book_repository import BookRepository

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

repository = BookRepository()
repository.create_table()


@app.get("/books")
async def get_books():
    print("here")
    return repository.get_all_books()


@app.post("/books")
async def create_book(book: Book):
    return repository.create_book(book=book)


@app.put("/books")
async def update_book(book: Book):
    if not repository.get_book_by_id(book.id):
        raise HTTPException(status_code=404, detail="Book not found")
    return repository.update_book(book)


@app.delete("/books/{book_id}")
async def delete_book(book_id):
    if not repository.get_book_by_id(book_id):
        raise HTTPException(status_code=404, detail="Book not found")

    if repository.delete_book(book_id):
        return {"detail": "Book deleted successfully!"}

    return {"detail": "Something went wrong."}


@app.get("/books/{book_id}")
async def get_book_by_id(book_id: int) -> Book:
    response = repository.get_book_by_id(book_id)
    if not response:
        raise HTTPException(status_code=404, detail="Book not found")
    return response

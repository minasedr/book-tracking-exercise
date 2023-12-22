import { Dispatch, SetStateAction } from "react"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { BookType } from "@/pages"
import Book from "./Book"

export function ListOfBooks({ books, setBooks }: { books: BookType[], setBooks: Dispatch<SetStateAction<BookType[]>> }) {
    return (
        <Accordion type="single" collapsible className="w-[550px] mx-auto my-10">
            <AccordionItem value="item-1">
                <AccordionTrigger className="">TO BE READ</AccordionTrigger>
                {books.filter(book => book.status == 0).map(book => <AccordionContent>
                    <Book book={book} books={books} setBooks={setBooks} />
                </AccordionContent>)}
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>IN PROGRESS</AccordionTrigger>
                {books.filter(book => book.status == 1).map(book => <AccordionContent>
                    <Book book={book} books={books} setBooks={setBooks} />
                </AccordionContent>)}
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>COMPLETED</AccordionTrigger>
                {books.filter(book => book.status == 2).map(book => <AccordionContent>
                    <Book book={book} books={books} setBooks={setBooks} />
                </AccordionContent>)}
            </AccordionItem>
        </Accordion>
    )
}

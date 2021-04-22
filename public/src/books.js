function findAuthorById(authors, id) {
  let creator;
  const authorLocator = authors.find((author) => author.id === id ? creator = author : creator)
  
  return authorLocator
}

function findBookById(books, id) {
  let text;
  const bookLocator = books.find((book) => book.id === id ? text = book : text)

  return bookLocator;
}

function partitionBooksByBorrowedStatus(books) {
  let returned = [];
  let kept = [];

  books.forEach((book) => {
    let keptBorrows = book.borrows.filter((borrow) => {
      if(!borrow.returned){return borrow}
    })

    if(keptBorrows.length > 0){
      kept.push(book)
    }
    else(
      returned.push(book)
    )
  })

  return [kept, returned];
}


function getBorrowersForBook(book, accounts) {
  let result = [];
  let borrowArray = book.borrows;  
  borrowArray.forEach(borrow=>{
    let account = accounts.find(acc => acc.id === borrow.id);
    let obj = account;
    obj['returned'] =  borrow.returned;
    result.push(obj);
  })
  console.log(result);
  return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

//const { isRegExp } = require("node:util");

function getTotalBooksCount(books) {
  let result = 0;
  
  for(book in books){
    if(book) result++
  }
  return result;
}

function getTotalAccountsCount(accounts) {
  let result = 0;

  for(acct in accounts){
    if(acct) result++
  }
  return result;
}


function getBooksBorrowedCount(books) {
let result = 0

  books.filter((book) => {
    book.borrows.forEach((borrow) => {
      if(!borrow.returned){
        result++
     }
    })
  })
  return result;

}

function getMostCommonGenres(books) {
  const commonGenres = [];

  for (let book of books) {
    const genre = commonGenres.find(
      (currentGenre) => currentGenre.name === book.genre
    );
    if (genre) {
      genre.count++;
    } else {
      commonGenres.push({ name: book.genre, count: 1 });
    }
  }

  return topFive(commonGenres);
}

function getMostPopularBooks(books) {
  //need to return an array of objects
  //name:, count:
  //use reduce to aggregate number of borrows per title
  const counted = books.reduce((acc, book) => {
    const name = book.title;
    acc[name] = book.borrows.length;
    return acc;
  }, {});
  console.log(counted);

  //convert into an array
  const countedArray = Object.keys(counted).map((name) => {
    return {
      name,
      count: counted[name],
    };
  });

  //sort, then slice first 5
  let result = countedArray.sort((a, b) => {
    if (a.count > b.count) return -1;
    else return 1;
  });
  console.log(result);
  return result.slice(0, 5);
}

function getAuthorById(authors, authorId) {
  return authors.find((author) => author.id === authorId);
}

function getMostPopularAuthors(books, authors) {
  const bookAuthors = [];
  books.forEach((book) => {
    const match = bookAuthors.find((author) => author.id === book.authorId);
    if (match) {
      match.count += book.borrows.length;
    } else {
      const writer = getAuthorById(authors, book.authorId);
      const count = book.borrows.length;
      bookAuthors.push({
        name: `${writer.name.first} ${writer.name.last}`,
        count,
      });
    }
  });
  let result = bookAuthors.sort((authorA, authorB) =>
    authorA.count < authorB.count ? 1 : -1
  );
  result = result.slice(0, 5);
  return result;
}


function topFive(array) {
  let result = array
    .sort((countA, countB) => (countA.count < countB.count ? 1 : -1))
    .slice(0, 5);

  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

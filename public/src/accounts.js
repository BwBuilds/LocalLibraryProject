function findAccountById(accounts, id) {
  let account;
  const accountLocater = accounts.find((acct) => acct.id === id ? account = acct : account);

  return accountLocater
}

function sortAccountsByLastName(accounts) {

  const accountSorter = accounts.sort((name1, name2) => name1.name.last.toLowerCase() < name2.name.last.toLowerCase() ? -1 : 1);
  return accountSorter
}

function getTotalNumberOfBorrows(account, books) {
  let result = 0;
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].borrows.length; j++) {
      if (account.id === books[i].borrows[j].id) {
        result++;
      }
    }
  }
  return result;
}

//should return all of the books taken out by an account with the author embedded:

function getBooksPossessedByAccount(account, books, authors) {  
  let result = [];

  books.forEach(book => {
    book.borrows.forEach(borrow => {
      if(!borrow.returned && borrow.id == account.id){
        book.author = authors.find(
          (author) => author.id == book.authorId
        )
        result.push(book)
      }
    });
  })

  return result; 
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

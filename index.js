const BASE_URL = "https://openlibrary.org/search.json";

const searchResult = () => {
  let searchInput = document.getElementById("searchInput").value;

  if (searchInput) {
    const FINAL_URL = `${BASE_URL}?q=${searchInput}`;
    fetch(FINAL_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        receiveData(data.docs);
      })
      .catch((err) => {
        alert(err.message);
      });
  } else {
    alert("Please enter you searching information correctly");
  }
};

const receiveData = (data) => {
  let bookList = [];
  for (let i = 0; i < data.length; i++) {
    bookList[i] = {
      bookTitle: data[i].title,
      authorName: data[i].author_name,
      bookCover: data[i].cover_i
        ? `https://covers.openlibrary.org/b/id/${data[i].cover_i}-M.jpg`
        : `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png`,
    };
  }
  displayData(bookList);
};

const displayData = (bookList) => {
  console.log(bookList);
  let resultList = document.querySelector(".search_resultBody");

  resultList.innerHTML += `<h3>Searched Results</h3>`;
  for (let i = 0; i < bookList.length; i++) {
    let htmlBlock = `<div class="search_resultBook">
        <div class="search_BookImage">
          <img
            src="${bookList[i].bookCover}"
          />
        </div>
        <div class="search_BookInfo">
            <h3 id="bookTitle">${bookList[i].bookTitle}</h3>
          <p>Author: <span id="authorName">${bookList[i].authorName}</span></p>
        </div>
      </div>`;

    resultList.innerHTML += htmlBlock;
  }
};

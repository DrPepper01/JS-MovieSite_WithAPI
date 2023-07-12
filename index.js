let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//function вытащить данные из апи

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    // если инпут пустой

    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
    }

    // если инпут не пустой
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            //если фильм есть в базе 
            if (data.Response == "True") {
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star2.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
            }

            //если фильма нет в базе
            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
            //в случае ошибки
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
    }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);



// Это часть с развертыванием маленькой кнопки
const miniBtn = document.getElementById('miniature-button')
const actBtn = document.getElementById('activeBtn')

miniBtn.addEventListener('click',subscribeFunc)

function subscribeFunc(){
    actBtn.innerHTML = `
        <div class="subscribe">
                <input type="text" placeholder="Name" id='nameTxt'>
                <input type="text" placeholder="Surname" id='surnameTxt'>
                <input type="text" placeholder="Email" id='mailTxt'>
                <input type="text" placeholder="comment" id='comment'>
                <button type="submit" id='btnSub'>subscribe</button>
        </div>
        `
}



const nameInput = document.getElementById("nameTxt");
const surnameInput = document.getElementById("surnameTxt");
const emailInput = document.getElementById("mailTxt");
const commentInput = document.getElementById("comment");
const subscribeButton = document.getElementById("btnSub");

const modal = document.getElementById("modal");


const form = document.getElementById("subscribe");


// проверка на соотвтетствие инпута 
// нписал регекс критерий и на это ушло слишком много сил к сожалению
// проверку текста и получение данных о пользователе до ума довести не успел
function validateCheck() {

    const name = nameInput.value.trim();
    const surname = surnameInput.value.trim();
    const email = emailInput.value.trim();
  
    // проверка на кириллицу 
    const cyrillicRegex = /^[а-яА-ЯЁё]+$/;
  
    // Validate the name
    if (!name || !cyrillicRegex.test(name)) {
      alert("Please enter a valid name using Cyrillic characters.");
      return false;
    }
  
    // Validate the surname
    if (!surname || !cyrillicRegex.test(surname)) {
      alert("Please enter a valid surname using Cyrillic characters.");
      return false;
    }
  
    // проверка почты 
    const emailRegex = /^\S+@\S+\.\S+$/;
  
    // Validate the email
    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
  
    
    return true;
}

  

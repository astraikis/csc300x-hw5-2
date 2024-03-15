// HTML elements
const getCategoriesButton = document.getElementById("get-categories");
const categoriesDiv = document.getElementById("categories");
const searchForm = document.getElementById("search-form");
const addForm = document.getElementById("add-joke");

// Get categories
getCategoriesButton.addEventListener("click", () => {
    fetch("/jokebook/categories")
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const category = document.createElement("h2");
                category.innerText = data[i];
                category.id = data[i];
                category.addEventListener("click", e => getJokes(e.target.innerText));
                categoriesDiv.appendChild(category);
                const jokeContainer = document.createElement("div");
                jokeContainer.id = data[i] + "-jokes";
                categoriesDiv.appendChild(jokeContainer);
            }
        })
        .catch(err => console.log(err));
});

// Get jokes from category
function getJokes(category) {
    if (document.getElementById(category + "-jokes").firstChild) {
        return;
    }
    fetch("/jokebook/joke/" + category)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const joke = document.createElement("div");
                const jokeQ = document.createElement("p");
                jokeQ.innerText = "Q: " + data[i].joke;
                joke.appendChild(jokeQ);
                const jokeA = document.createElement("p");
                jokeA.innerText = "A: " + data[i].response;
                joke.appendChild(jokeA);
                joke.appendChild(document.createElement("br"));
                document.getElementById(category + "-jokes").appendChild(joke);
            }
        })
        .catch(err => console.log(err));
}

// Search for category
searchForm.addEventListener("submit", e => {
    e.preventDefault();
    
    fetch("/jokebook/categories")
        .then(res => res.json())
        .then(data => {
            const categoryName = document.getElementById("search").value;
            if (data.includes(categoryName) && document.getElementById(categoryName) === null) {
                const category = document.createElement("h2");
                category.innerText = categoryName;
                category.id = categoryName;
                category.addEventListener("click", e => getJokes(e.target.innerText));
                categoriesDiv.appendChild(category);
                const jokeContainer = document.createElement("div");
                jokeContainer.id = categoryName + "-jokes";
                categoriesDiv.appendChild(jokeContainer);
            }
        })
        .catch(err => console.log(err));
});

// Add joke
addForm.addEventListener("submit", e => {
    e.preventDefault();

    let params = new FormData(addForm);
    fetch("/jokebook/joke/new", { method: "POST", body: params })
        .then(res => res.json())
        .then(data => {
            const categoryName = document.getElementById("category-input").value
            if (!document.getElementById(categoryName)) {
                const category = document.createElement("h2");
                category.innerText = categoryName;
                category.id = categoryName;
                category.addEventListener("click", e => getJokes(e.target.innerText));
                categoriesDiv.appendChild(category);
                const jokeContainer = document.createElement("div");
                jokeContainer.id = categoryName + "-jokes";
                categoriesDiv.appendChild(jokeContainer);
            }
            
            if (categoryName === "funnyJoke") {
                document.getElementById("funnyJoke-jokes").innerHTML = "";
                getJokes("funnyJoke");
            } else {
                document.getElementById("lameJoke-jokes").innerHTML = "";
                getJokes("lameJoke");
            }
        })
        .catch(err => console.log(err));
});
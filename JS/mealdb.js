const searchFood = () => { 
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    // cleat data 
    searchField.value = '';

    // load data 
    const url = ` https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}
    `;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals))

}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if( meals.length == 0){
    //    show no resutl found 
     
    }
    
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
          <img src="${ meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
               <h5 class="card-title">${meal.strMeal}</h5>
               <p class="card-text"> ${meal.strInstructions.slice(0, 200)}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
  
}

const loadMealDetail = mealId => {
    // console.log(mealId);
    
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    .then (data => displayMealDetail(data.meals[0]));
}

const displayMealDetail = meal =>
{
    console.log(meal);
    
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent ='';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 150)} </p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</div>
    `;
    mealDetails.appendChild(div);
}
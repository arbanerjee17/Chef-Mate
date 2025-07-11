const form = document.getElementById('recipe-form');
const recipeList = document.querySelector('#recipe-list');
const noRecipes = document.getElementById('no-recipes');
const searchBox = document.getElementById('search-box');
const darkToggle = document.getElementById('dark-toggle');
const heroImages = document.getElementById('hero-images'); // NEW

// Load user recipes from localStorage
let userRecipes = JSON.parse(localStorage.getItem('userRecipes')) || [];

// Dark Mode Toggle
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkToggle.textContent = document.body.classList.contains('dark-mode')
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';
});

// Submit Form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('recipe-name').value.trim();
  const ingredients = document.getElementById('recipe-ingredients').value.trim().split(',').map(i => i.trim());
  const method = document.getElementById('recipe-method').value.trim();

  if (name && ingredients.length > 0 && method) {
    const newRecipe = { name, ingredients, method, isLocal: true };
    userRecipes.push(newRecipe);
    localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
    form.reset();
    fetchAndDisplayRecipes(searchBox.value);
  }
});

// Delete Recipe
recipeList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-button')) {
    const index = e.target.dataset.index;
    userRecipes.splice(index, 1);
    localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
    fetchAndDisplayRecipes(searchBox.value);
  }
});

// Search Input Listener
searchBox.addEventListener('input', () => {
  fetchAndDisplayRecipes(searchBox.value);
  toggleHero(); // NEW
});

// Helper: show/hide hero images
function toggleHero() {
  if (!heroImages) return;
  const searching = searchBox.value.trim() !== '';
  const anyCards = recipeList.children.length > 0;
  const showHero = !searching && !anyCards;
  heroImages.classList.toggle('hide-hero', !showHero);
}

// Display All Recipes (Merged: API + Local)
function fetchAndDisplayRecipes(query = '') {
  recipeList.innerHTML = '';
  noRecipes.style.display = 'none';

  // Filter local recipes by query
  const filteredLocal = userRecipes.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  // Display Local Recipes
  filteredLocal.forEach((recipe, index) => {
    const recipeDiv = document.createElement('div');
    recipeDiv.className = 'recipe';
    recipeDiv.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Ingredients:</strong></p>
      <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
      <p><strong>Method:</strong></p>
      <p>${recipe.method}</p>
      <button class="delete-button" data-index="${index}">Delete</button>
    `;
    recipeList.appendChild(recipeDiv);
  });

  // Fetch API Recipes
  if (query.trim() !== '') {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(res => res.json())
      .then(data => {
        if (data.meals) {
          data.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe';
            recipeDiv.innerHTML = `
              <h3>${meal.strMeal}</h3>
              <p><strong>Ingredients:</strong></p>
              <ul>
                ${getIngredientsList(meal).map(i => `<li>${i}</li>`).join('')}
              </ul>
              <p><strong>Method:</strong></p>
              <p>${meal.strInstructions}</p>
            `;
            recipeList.appendChild(recipeDiv);
          });
        } else if (filteredLocal.length === 0) {
          noRecipes.style.display = 'block';
        }
        toggleHero(); // NEW
      })
      .catch(() => {
        if (filteredLocal.length === 0) noRecipes.style.display = 'block';
        toggleHero(); // NEW
      });
  } else if (filteredLocal.length === 0) {
    noRecipes.style.display = 'block';
    toggleHero(); // NEW
  } else {
    toggleHero(); // NEW
  }
}

// Extract ingredients from API meal object
function getIngredientsList(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      list.push(`${ingredient} ${measure || ''}`.trim());
    }
  }
  return list;
}

// On load
fetchAndDisplayRecipes(); // Already triggers toggleHero()
const form = document.getElementById('recipe-form');
const recipeList = document.querySelector('#recipe-list');
const noRecipes = document.getElementById('no-recipes');
const searchBox = document.getElementById('search-box');
const darkToggle = document.getElementById('dark-toggle');
const heroImages = document.getElementById('hero-images'); // NEW

// Load user recipes from localStorage
let userRecipes = JSON.parse(localStorage.getItem('userRecipes')) || [];

// Dark Mode Toggle
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkToggle.textContent = document.body.classList.contains('dark-mode')
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';
});

// Submit Form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('recipe-name').value.trim();
  const ingredients = document.getElementById('recipe-ingredients').value.trim().split(',').map(i => i.trim());
  const method = document.getElementById('recipe-method').value.trim();

  if (name && ingredients.length > 0 && method) {
    const newRecipe = { name, ingredients, method, isLocal: true };
    userRecipes.push(newRecipe);
    localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
    form.reset();
    fetchAndDisplayRecipes(searchBox.value);
  }
});

// Delete Recipe
recipeList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-button')) {
    const index = e.target.dataset.index;
    userRecipes.splice(index, 1);
    localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
    fetchAndDisplayRecipes(searchBox.value);
  }
});

// Search Input Listener
searchBox.addEventListener('input', () => {
  fetchAndDisplayRecipes(searchBox.value);
  toggleHero(); // NEW
});

// Helper: show/hide hero images
function toggleHero() {
  if (!heroImages) return;
  const searching = searchBox.value.trim() !== '';
  const anyCards = recipeList.children.length > 0;
  const showHero = !searching && !anyCards;
  heroImages.classList.toggle('hide-hero', !showHero);
}

// Display All Recipes (Merged: API + Local)
function fetchAndDisplayRecipes(query = '') {
  recipeList.innerHTML = '';
  noRecipes.style.display = 'none';

  // Filter local recipes by query
  const filteredLocal = userRecipes.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  // Display Local Recipes
  filteredLocal.forEach((recipe, index) => {
    const recipeDiv = document.createElement('div');
    recipeDiv.className = 'recipe';
    recipeDiv.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Ingredients:</strong></p>
      <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
      <p><strong>Method:</strong></p>
      <p>${recipe.method}</p>
      <button class="delete-button" data-index="${index}">Delete</button>
    `;
    recipeList.appendChild(recipeDiv);
  });

  // Fetch API Recipes
  if (query.trim() !== '') {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(res => res.json())
      .then(data => {
        if (data.meals) {
          data.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe';
            recipeDiv.innerHTML = `
              <h3>${meal.strMeal}</h3>
              <p><strong>Ingredients:</strong></p>
              <ul>
                ${getIngredientsList(meal).map(i => `<li>${i}</li>`).join('')}
              </ul>
              <p><strong>Method:</strong></p>
              <p>${meal.strInstructions}</p>
            `;
            recipeList.appendChild(recipeDiv);
          });
        } else if (filteredLocal.length === 0) {
          noRecipes.style.display = 'block';
        }
        toggleHero(); // NEW
      })
      .catch(() => {
        if (filteredLocal.length === 0) noRecipes.style.display = 'block';
        toggleHero(); // NEW
      });
  } else if (filteredLocal.length === 0) {
    noRecipes.style.display = 'block';
    toggleHero(); // NEW
  } else {
    toggleHero(); // NEW
  }
}

// Extract ingredients from API meal object
function getIngredientsList(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      list.push(`${ingredient} ${measure || ''}`.trim());
    }
  }
  return list;
}

// On load
fetchAndDisplayRecipes(); // Already triggers toggleHero()

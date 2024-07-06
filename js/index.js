// Load categories
const loadcategories = async () => {
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const category = data.data;

    console.log(category);
    displaycategory(category);
  } catch (error) {
    console.error('Failed to load categories:', error);
  }
}

// Display categories
const displaycategory = (categorydata) => {
  const categoryPart = document.getElementById('btn_container');
  categoryPart.classList = 'flex justify-center gap-4 mt-5';

  categorydata.forEach(cat => {
    console.log(cat);

    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `
      <button onclick="handleclick(${cat.category_id})" class="btn">${cat.category}</button>
    `;

    categoryPart.appendChild(categoryDiv);
  });
};

loadcategories();

// Handle category click
const handleclick = (id) => {
  console.log(id);
  loadcard(id);
}

// Load cards
const loadcard = async (id) => {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const category = data.data;

    displaycard(category);
  } catch (error) {
    console.error('Failed to load cards:', error);
  }
}

// Display cards
const displaycard = (findcard) => {
  const cardId = document.getElementById('dispaly_card');
  cardId.textContent = ''; // Clear previous cards

  if (findcard.length === 0) {
    cardId.classList=`card bg-white-100 mt-10 m-auto `;
    cardId.innerHTML = `
      <div>
        <figure>
          <img src="../Icon.png" alt="No data" />
        </figure>
        <div class="card-body text-center">
          <h2 class=" text-center font-bold">No data available</h2>
          <p>No videos available for this category.</p>
        </div>
      </div>
    `;
  } else {
    cardId.classList = 'mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-4 mx-auto';

    findcard.forEach(find_data => {
      console.log(find_data);

      const cardDiv = document.createElement('div');
      cardDiv.innerHTML = `
        <div class="card bg-gray-100 p-4 shadow-xl w-full max-w-96 h-96">
          <figure>
            <img src="${find_data.thumbnail}" class="w-full h-auto object-cover"   alt="Video" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${find_data.title ? find_data.title : 'No title'}</h2>
            
            <div class="authors">
              ${find_data.authors.map(author => `
                <div class="author flex gap-2">
                  <img src="${author.profile_picture}" class="w-10 h-10 rounded-full" alt="${author.name}" class="author-profile-picture">
                  <p class="author-name mt-2 flex gap-1">${author.profile_name 
                  }

                 
            
${author.verified ? '<img src="../fi_10629607.png" class="w-5 h-5" alt="Verified">' : ''}

   

             


                </div>
              `).join('')}
            </div>

             <p>${find_data.others.views

             } views</p>
          </div>
        </div>
      `;

      cardId.appendChild(cardDiv);
    });
  }
}

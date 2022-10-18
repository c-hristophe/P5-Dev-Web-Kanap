//création des éléments dans le DOM
for (let pas = 0; pas < 8; pas++) {
 
let a = document.createElement("a");
document.getElementById("items").appendChild(a);

let h3 = document.createElement("h3");
document.getElementById("items").appendChild(h3);
h3.classList.add('productName')

let img = document.createElement("img");
document.getElementById("items").appendChild(img);

let p = document.createElement("p");
document.getElementById("items").appendChild(p);
p.classList.add('productsDescription')

let article = document.createElement("article");
document.getElementById("items").appendChild(article);

// appel de l'API
fetch("http://localhost:3000/api/products")

.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
// remplissage des champs
.then( function createProductElement (value) {
  
    // description
    
    const p = document.querySelectorAll("p")[pas]; 
    p.innerText = value[pas].description;
    
    // titre
    const h3 = document.querySelectorAll("h3")[pas]; 
    h3.innerText = value[pas].name;
    
    // image
    const img = document.querySelectorAll("#items img")[pas];
    img.alt = value[pas].altTxt;
    img.src = value[pas].imageUrl;
    
   // contenu
    [ img, h3, p ].forEach(child => article.appendChild(child))
  
    // lien
    a.href = `./product.html?id=${value[pas]._id}`
    a.appendChild(article)
 
    return a 
})

  //si erreur:
.catch(error => alert("Erreur : " + error));
}


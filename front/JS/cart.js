//importation du Json et des données 

let objLinea = localStorage.getItem("obj");
let data = JSON.parse(objLinea);



//définition des variables
for (let pas = 0; pas < data.length; pas++) {
let nom = data[pas].nom;
let qte = data[pas].qte;

localStorage.setItem ('qteOld', qte)
let color = data[pas].color;

// création des éléments

let article = document.createElement("article");
document.getElementById("cart__items").appendChild(article);
article.classList.add('cart__item');

let div = document.createElement("div");
document.getElementsByClassName("cart__item");
div.classList.add('cart__item__img');

let img = document.createElement("img");
document.getElementById("items");

let div2 = document.createElement("div");
document.getElementsByClassName("cart__item");
div2.classList.add('cart__item__content');

let div3 = document.createElement("div");
document.getElementsByClassName("cart__item");
div3.classList.add('cart__item__content__settings');

let div4 = document.createElement("div");
document.getElementsByClassName("cart__item__content__settings");
div4.classList.add('cart__item__content__settings__quantity');

let div5 = document.createElement("div");
document.getElementsByClassName("cart__item__content__settings");
div5.classList.add('cart__item__content__settings__delete');

let p3 = document.createElement("p");
document.getElementsByClassName("cart__item__content__settings__quantity")

let p4 = document.createElement("p");
document.getElementsByClassName("cart__item__content__settings__delete")


let input = document.createElement("input");
document.getElementsByClassName("cart__item__content__settings__quantity")
input.classList.add('itemQuantity');


let h2= document.createElement("h2");
document.getElementsByClassName("cart__item__content");

let p= document.createElement("p");
document.getElementsByClassName("cart__item__content");

let p2= document.createElement("p");
document.getElementsByClassName("cart__item__content");

[ div, div2, div3 ].forEach(child => article.appendChild(child));
[ img ].forEach(child => div.appendChild(child));
[ h2,p,p2 ].forEach(child => div2.appendChild(child));
[ div4, div5 ].forEach(child => div3.appendChild(child));
[ p3, input ].forEach(child => div4.appendChild(child));
[ p4 ].forEach(child => div5.appendChild(child));
[article].forEach(child => article.setAttribute("data-id", data[pas].nom));
[article].forEach(child => article.setAttribute("data-color", data[pas].color));
[input].forEach(child => input.setAttribute("name", "itemQuantity"));
[input].forEach(child => input.setAttribute("min", "1"));
[input].forEach(child => input.setAttribute("max", "100"));
[input].forEach(child => input.setAttribute("value", data[pas].qte));

fetch("http://localhost:3000/api/products/"+nom)

.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
// remplissage des champs
.then( function createProductElement (data) {

// image
const imgParent = document.querySelector('.cart__item__img')
img.alt = data.altTxt;
img.src = data.imageUrl;

//titre
const h2Parent = document.querySelector("cart__item__content__description"); 
    h2.innerText = data.name;
    
//couleur
const pParent = document.querySelector("cart__item__content__description"); 
    p.innerText = color;

//prix
const p2Parent = document.querySelector("cart__item__content__description"); 
    p2.innerText = data.price.toFixed(2) +"€";

//quantité
 
const p3Parent = document.querySelector("cart__item__content__settings__quantity"); 
    p3.innerText = "Qté : ";

const inputParent = document.querySelector("cart__item__content__description"); 
    input.innerText = qte;
    
const p4Parent = document.querySelector("cart__item__content__settings__quantity"); 
    p4.innerText = "Supprimer";

//gestion des articles de même id et de couleur identique



// effacer entrée

p4.addEventListener("click", removeDummy) 

function removeDummy() {

 document.querySelectorAll(".cart__item").forEach( input => input.addEventListener('click', view) );

        function view() {
            
            localStorage.removeItem('el1');
            localStorage.removeItem('el2');
            let el1 = this.dataset.id ; 
            let el2 = this.dataset.color ; 

            localStorage.setItem("el1", el1);
            localStorage.setItem("el2", el2);
 
            console.log(el1);
            console.log(el2);

            let el3 = localStorage.getItem("el1");
            let el4 = localStorage.getItem("el2");
            console.log (el3)
            console.log (el4)

            let productInLocalStorage = localStorage.getItem("obj");
            let productInLocalStoragepars = JSON.parse(productInLocalStorage);     
            productInLocalStoragepars = productInLocalStoragepars.filter(item=> ((item.nom,item.color) !== (el3,el4)));
            filteredStr = JSON.stringify(productInLocalStoragepars); 
                       
            localStorage.setItem("obj",filteredStr);
            location.reload();

            var elem = article;
            elem.parentNode.removeChild(elem)    
        };
    
}

//modifier la quantité
for (let i=0; i<100; i++){
var elt = document.getElementsByName("itemQuantity")[i];
elt.addEventListener('change', function() {

        let el5 = this.value;
        console.log(el5)
        localStorage.setItem('qteChange', el5)
        
        let article = document.getElementsByClassName('cart__item')[i]
        let elColor = article.dataset.color;
        let elTitle = article.dataset.id
        let productInLocalStorage = localStorage.getItem("obj");
        let productInLocalStoragepars = JSON.parse(productInLocalStorage);     
     
        const index = productInLocalStoragepars.findIndex(
            (num) => num.nom == elTitle && num.color == elColor
          );
          console.log(index)
          
          productInLocalStoragepars[index] = {
           nom: elTitle,
           qte: el5,
           color: elColor
          }
        
        filteredStr = JSON.stringify(productInLocalStoragepars); 
                      
        localStorage.setItem("obj",filteredStr);
        console.log(filteredStr)
        location.reload();

})
}
    
})

}
// remplir total qte et prix

            let totalPanier = localStorage.getItem('obj')
            let totalPanierpar = JSON.parse (totalPanier)
            console.log(totalPanierpar)
            for (let pas = 0; pas < totalPanierpar.length; pas++) {
            fetch("http://localhost:3000/api/products/" + totalPanierpar[pas].nom)

            .then(function(res) {
            if (res.ok) {
                return res.json();
            }
          
            })
            //calcul du total des prix
            .then(function(valuePrice) {
               
                let mul = 0;
                let add = 0;
                
                let value = valuePrice.price;
                mul =  value* Number(totalPanierpar[pas].qte);
                console.log(mul)
                for (let pas = 0; pas < totalPanierpar.length; pas++) {
                add += mul;
                }
                console.log(add) 
                let span = document.querySelector("#totalPrice"); 
                span.innerText = add.toFixed(2);
                   
              })
            // calcul du total des quantités
            .then(function getNumberProducts(){

                let sum = 0;
                
                for (let i = 0; i < totalPanierpar.length; i++) {
                  sum += Number(totalPanierpar[i].qte);
                  console.log(sum) 
                
                  let span = document.querySelector("#totalQuantity"); 
                  span.innerText = sum;
                  
            }})
            
            
            }
          
 // validation du formulaire 

  document.addEventListener ('change',validate)          
 let btn = document.getElementById('order');

 btn.disabled = true;
     
function validate() {

 if (document.getElementById("firstName").value.match(/[0-9]/)) {
    document.getElementById("firstNameErrorMsg").innerText = "Veuillez saisir un prénom valide";
    btn.disabled = true;
    return false;
  } 
   
if (document.getElementById("lastName").value.match(/[0-9]/)) {
    document.getElementById("lastNameErrorMsg").innerText = "Veuillez saisir un nom valide";
    btn.disabled = true;
    return false;
}

if (document.getElementById("address").value.match(/[@]/)) {
    document.getElementById("addressErrorMsg").innerText = "Veuillez saisir une adresse valide";
    btn.disabled = true;
    return false;
}

if (document.getElementById("city").value.match(/[0-9]/)) {
    document.getElementById("cityErrorMsg").innerText = "Veuillez saisir une ville valide";
    btn.disabled = true;
    return false;
}

if (document.getElementById("email").value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/)) {
    document.getElementById("emailErrorMsg").innerText = "adresse mail non valide";
    btn.disabled = true;
    return false;
}

if(document.getElementById("firstName").value =="" ){
    btn.disabled = true;
    return false;
}

if(document.getElementById("lastName").value =="" ){
    btn.disabled = true;
    return false;
}
if(document.getElementById("address").value =="" ){
    btn.disabled = true;
    return false;
}
if(document.getElementById("city").value =="" ){
    btn.disabled = true;
    return false;
}
if(document.getElementById("email").value =="" ){
    btn.disabled = true;
    return false;
}

else {
        document.getElementById("firstNameErrorMsg").innerText = "";
        document.getElementById("lastNameErrorMsg").innerText = "";
        document.getElementById("addressErrorMsg").innerText = "";
        document.getElementById("cityErrorMsg").innerText = "";
        document.getElementById("emailErrorMsg").innerText = "";

        btn.disabled = false;
        let prenom = document.getElementById("firstName").value;
        localStorage.setItem('prenom', prenom)
        let nom = document.getElementById("lastName").value;
        localStorage.setItem('nom', nom)
        let adresse = document.getElementById("address").value;
        localStorage.setItem('adresse', adresse)
        let ville = document.getElementById("city").value; 
        localStorage.setItem('ville', ville) 
        let email = document.getElementById("email").value;
        localStorage.setItem('email', email)
    
        btn.addEventListener("click", open )
        function open() {
            window.open("confirmation.html");  
        }      
    }
  
}

        

   

            
            
          



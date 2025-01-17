//importation du Json et des données 
let objLinea = localStorage.getItem("obj");
let data = JSON.parse(objLinea);

//définition des variables
for (let pas = 0; pas < data.length; pas++) {
let id = data[pas].id;
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
[article].forEach(child => article.setAttribute("data-id", data[pas].id));
[article].forEach(child => article.setAttribute("data-color", data[pas].color));
[input].forEach(child => input.setAttribute("type", "number"));
[input].forEach(child => input.setAttribute("name", "itemQuantity"));
[input].forEach(child => input.setAttribute("min", "1"));
[input].forEach(child => input.setAttribute("max", "100"));
[input].forEach(child => input.setAttribute("value", data[pas].qte));

fetch("http://localhost:3000/api/products/"+id)

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
            
            let el1 = this.dataset.id ; 
            let el2 = this.dataset.color ; 

            let productInLocalStorage = localStorage.getItem("obj");
            let productInLocalStoragepars = JSON.parse(productInLocalStorage);     
            productInLocalStoragepars = productInLocalStoragepars.filter(item=> ((item.id,item.color) !== (el1,el2)));
            filteredStr = JSON.stringify(productInLocalStoragepars); 
                       
            localStorage.setItem("obj",filteredStr);
            location.reload();

            var elem = article;
            elem.parentNode.removeChild(elem)    
        };
    
}

//modifier la quantité
for (let i=0; i<totalPanierpar.length; i++){
let elt = document.getElementsByClassName ("itemQuantity")[i];
elt.addEventListener('change', change )
function change(){
        let el5 = this.value;
        let article = document.getElementsByClassName('cart__item')[i]
        let elColor = article.dataset.color;
        let elTitle = article.dataset.id
        let productInLocalStorage = localStorage.getItem("obj");
        let productInLocalStoragepars = JSON.parse(productInLocalStorage);     
     
        const index = productInLocalStoragepars.findIndex(
            (num) => num.id == elTitle && num.color == elColor
          );
          console.log(index)
          
          productInLocalStoragepars[index] = {
           id: elTitle,
           qte: el5,
           color: elColor
          }
        
        filteredStr = JSON.stringify(productInLocalStoragepars); 
                      
        localStorage.setItem("obj",filteredStr);
        console.log(filteredStr)
        location.reload();
        }

}
    
})

}
// remplir total qte et prix
            let totalToDisplay=0
            let totalPanier = localStorage.getItem('obj')
            let totalPanierpar = JSON.parse (totalPanier)
            console.log(totalPanierpar)
            for (let pas = 0; pas < totalPanierpar.length; pas++) {
            fetch("http://localhost:3000/api/products/" + totalPanierpar[pas].id)

            .then(function(res) {
            if (res.ok) {
                return res.json();
            }
          
            })

            //calcul du total des prix
            ////////////////
            .then(function(valuePrice) {
                
                let value = 0
                
                value = valuePrice.price
                
                qte = document.querySelectorAll(".itemQuantity")[pas].value
                
                let total = 0
               
                total=value*qte
               
                

                console.log (total)

                totalToDisplay += Number(total)
                console.log(totalToDisplay)

                let span = document.querySelector("#totalPrice"); 
                span.innerText = totalToDisplay;    
                
                //////////////////
              })
              
              
              
            // calcul du total des quantités
            .then(function getNumberProducts(){

                let sum = 0;
                
                for (let i = 0; i < totalPanierpar.length; i++) {
                  sum += Number(totalPanierpar[i].qte);
                 
                  let span = document.querySelector("#totalQuantity"); 
                  span.innerText = sum;
                  
            }
            })
            
            
            }

        function displayTotal () {
            
                totalToDisplay 
        }
 // validation du formulaire 

 document.addEventListener ('change',validate)          
 let btn = document.getElementById('order');

 btn.disabled = true;
     
function validate() {


if(document.getElementById("firstName").value =="" ){
    document.getElementById("firstNameErrorMsg").innerText = "Veuillez saisir un prénom valide";
    btn.disabled = true;
    return false;
}
else {
    document.getElementById("firstNameErrorMsg").innerText =""
}

if(document.getElementById("firstName").value.match(/[0-9]/) ){
    document.getElementById("firstNameErrorMsg").innerText = "Veuillez saisir un prénom valide";
    btn.disabled = true;
    return false;
}
else {
    document.getElementById("firstNameErrorMsg").innerText =""
}

if(document.getElementById("firstName").value.match(/[@&"()!_$*€£`+=;?#]/) ){
    document.getElementById("firstNameErrorMsg").innerText = "Veuillez saisir un prénom valide";
    btn.disabled = true;
    return false;
}
else {
    document.getElementById("firstNameErrorMsg").innerText =""
}

if(document.getElementById("lastName").value =="" ){
    document.getElementById("lastNameErrorMsg").innerText = "Veuillez saisir un nom valide";
    btn.disabled = true;
    return false;
}
else {
    document.getElementById("lastNameErrorMsg").innerText =""
}

if(document.getElementById("lastName").value.match(/[0-9]/) ){
    document.getElementById("lastNameErrorMsg").innerText = "Veuillez saisir un nom valide";
    btn.disabled = true;
    return false;
}
else {
    document.getElementById("lastNameErrorMsg").innerText =""
}

if(document.getElementById("lastName").value.match(/[@&"()!_$*€£`+=;?#]/) ){
    document.getElementById("lastNameErrorMsg").innerText = "Veuillez saisir un nom valide";
    btn.disabled = true;
    return false;
}
else {
    document.getElementById("lastNameErrorMsg").innerText =""
}

if(document.getElementById("address").value =="" ){
    document.getElementById("addressErrorMsg").innerText = "Veuillez saisir une adresse valide";
    btn.disabled = true;
    return false;
}
else {
    document.getElementById("addressErrorMsg").innerText = "";
}
if(document.getElementById("address").value.match(/[@&"()!_$*€£`+=;?#]/)){
    document.getElementById("addressErrorMsg").innerText = "Veuillez saisir une adresse valide";
    btn.disabled = true;
    return false;
}
else {
    document.getElementById("addressErrorMsg").innerText = "";
}

if(document.getElementById("city").value =="" ){
    document.getElementById("cityErrorMsg").innerText = "Veuillez saisir une ville valide";
    btn.disabled = true;
    return false;
}
else {
    document.getElementById("cityErrorMsg").innerText =""
}

if(document.getElementById("city").value.match(/[0-9]/) ){
    document.getElementById("cityErrorMsg").innerText = "Veuillez saisir une ville valide";
    btn.disabled = true;
    return false;
}
else {
    document.getElementById("cityErrorMsg").innerText =""
}

if(document.getElementById("city").value.match(/[@&"()!_$*€£`+=;?#]/) ){
    document.getElementById("cityErrorMsg").innerText = "Veuillez saisir une ville valide";
    btn.disabled = true;
    return false;
}
else {
    document.getElementById("cityErrorMsg").innerText =""
}

if(document.getElementById("email").value =="" ){
    document.getElementById("emailErrorMsg").innerText = "Veuillez saisir un email valide";
    btn.disabled = true;
    return false;
}
else {
    document.getElementById("emailErrorMsg").innerText =""
}

if (document.getElementById("email").value.indexOf("@", 0) < 0)                 
{ 
    document.getElementById("emailErrorMsg").innerText = "Veuillez saisir un email valide";
    btn.disabled = true;
    return false;
}    
else {
    document.getElementById("emailErrorMsg").innerText =""
}

if (document.getElementById("email").value.indexOf(".", 0) < 0)                 
{ 
    document.getElementById("emailErrorMsg").innerText = "Veuillez saisir un email valide";
    btn.disabled = true;
    return false;
}    
else {
    btn.disabled = false;
    document.getElementById("emailErrorMsg").innerText =""


        let prenom = document.getElementById("firstName").value;
        let nom = document.getElementById("lastName").value;
        let adresse = document.getElementById("address").value;
        let ville = document.getElementById("city").value; 
        let email = document.getElementById("email").value;
        
        let products = localStorage.getItem('obj');
        let productsPar = JSON.parse(products);
        console.log(productsPar) 
        let valTab = []
        for (let i=0; i<productsPar.length; i++){
        delete productsPar[i].qte
        delete productsPar[i].color
        
        let val = Object.values(productsPar[i])
        valTab.push(val)
       
        let productsParStr = JSON.stringify(productsPar)
        localStorage.setItem('objFinal',productsParStr)
        
        }
        console.log(valTab)
        
        let body = {
            contact : {
                firstName: prenom,
                lastName: nom,
                address : adresse,
                city: ville,
                email: email,
            },
            products : valTab
        }
        
        let order = JSON.stringify(body)
        console.log (order)

        document.getElementById("order").addEventListener ('click', confirm )
        
        function confirm() {

          fetch('http://localhost:3000/api/products/order/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: order,
            })

            .then(function(response){ 
            return response.json()})
             
            .then(function(data){
               
                console.log(Object.values(data))
                let id = Object.values(data)[2];
                console.log (id)
                
                
                window.location.href="confirmation.html?id="+id;
                })
            
            
            .catch(error => console.error('Error:', error)) 
           }
   }     

}



            
          



var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");
console.log(id);

fetch("http://localhost:3000/api/products/"+id)
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
// remplissage des champs
.then(function creatProduct (data) {
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const description = document.querySelector('#description');
const colorsSelect = document.querySelector('#colors');



// title
title.innerText = data.name
// price
price.innerText = data.price
// price
description.innerText = data.description
//color 
let dropdown = document.getElementById('colors');

let option;
    for (let i = 0; i < data.colors.length; i++) {
      option = document.createElement('option');
      option.text = data.colors[i];
      option.value = data.colors[i];
      dropdown.add(option);
    }
    console.log (option);

  
// image
const imgParent = document.querySelector('.item__img')
let img = document.createElement("img")
imgParent.appendChild(img)
img.alt = data.altTxt;
img.src = data.imageUrl;

});

//vérifier le remplissage des champs 


//écriute aprés click sur "ajouter au panier"
const elt = document.querySelector('#addToCart'); 
elt.addEventListener('click',panier);

function panier(){
    let qte = parseInt(document.getElementById("quantity").value);
    let color = document.querySelector('#colors').value;
     if(!color) {

        alert("Veuillez sélectionner une couleur");
        
        return false;
     }
     if(qte == "0") {
       
            alert("Veuillez sélectionner une quantité");
            
            return false;
         }
   
    
    let newItem = [{
      id,
      qte,
      color,  
    }]
    console.log(newItem);
      let productInLocalStorage = localStorage.getItem("obj");
      let productInLocalStorageParse = JSON.parse(productInLocalStorage);
      
        //s'il y a des produits dans le local storage  
        if(productInLocalStorage){      
            var finalObj = productInLocalStorageParse.concat(newItem);
            let newArray = [];
            let uniqueObject = {};

            console.log (productInLocalStorageParse)
            const index = productInLocalStorageParse.findIndex( (element) => ((element.id === id) && (element.color === color)));

            console.log(index)
            
            if(index != -1) {
            let qteOld = productInLocalStorageParse[index].qte
        
            finalObj[index] = {
            id: id,
            qte: Number(qte) + Number(qteOld),
            color: color
              };
            finalObj.splice(-1,1); 
            }

              console.log(finalObj)            
            
                let finalObjStr = JSON.stringify(finalObj)
                localStorage.setItem("obj",finalObjStr);    
        }
                   
    // s'il n'y a pas un produit dans le local storage  //
         else{
          let panierNew = JSON.stringify(newItem)
          localStorage.setItem("obj",panierNew);
            
          return true;
        }
          
          alert("Ajouté à votre panier !");
                         
    }            
          



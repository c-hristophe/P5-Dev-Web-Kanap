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
let btn = document.getElementById('addToCart');

btn.addEventListener('click',verif_saisie);
function verif_saisie()
{
  var qte = parseInt(document.getElementById("quantity").value);
  var color = parseInt(document.getElementById("colors").value)
  this.qteArticle = qte;
  this.colArticle = color;

if (qte == "0")

{ alert("Veuillez saisir une quantité");

return false;
}

if (!color) {
  alert('Veuillez choisir une couleur');
  
  return false;
} 
 //message utilisateur si tous les champs sont remplis
else (alert("Ajouté à votre panier !"))
return true;
}


//écriute aprés click sur "ajouter au panier"
const elt = document.querySelector('#addToCart'); 
elt.addEventListener('click',panier);
if (true) {
function panier(){
    let qte = parseInt(document.getElementById("quantity").value);
    let color = document.querySelector('#colors').value;
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
      
                for (let i in finalObj) {
          
                    let objTitle = finalObj[i]['id'];
                    
                    let objcolor = finalObj[i]['color'];
                    
                    let objQte = document.getElementById("quantity").value;
                    
                    uniqueObject[objTitle && objcolor] = finalObj[i];

                    
                }
                for (let i in uniqueObject) {
                    newArray.push(uniqueObject[i]);
                
                }
                let qteOld = localStorage.getItem('qteOld');
                let objTitle = id;
                let objcolor = color;
                let objQte = qte

                const index = newArray.findIndex( (element) => ((element.id === objTitle) && (element.color === objcolor)));

                console.log(index)
                
                    if(index != -1) {
                    newArray[index] = {
                    id: objTitle,
                    qte: Number(objQte) + Number(qteOld),
                    color: objcolor
                    };

                    let newArrayStr= JSON.stringify(newArray);
                    localStorage.setItem("obj",newArrayStr);    

                    console.log(newArray)
                  }
                   
}
                  
                      
                
          
    // s'il n'y a pas un produit dans le local storage  //
         else{
                    productInLocalStorage = []
                    
                    let panierStr = JSON.stringify(newItem);
                    localStorage.setItem("obj",panierStr);       
                
          }
}
}

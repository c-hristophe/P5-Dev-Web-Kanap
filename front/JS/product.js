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
function verif_saisie(qte, color)
{
  var qte = parseInt(document.getElementById("quantity").value);
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

}

//écriute aprés click sur "ajouter au panier"
const elt = document.querySelector('#addToCart'); 
 
elt.addEventListener('click', function LignePanier (nom, qte, color) {   
    var nom = id;
    var qte = document.getElementById("quantity").value;
    var color = document.querySelector('#colors').value;
    
  console.log(qte)
    
verif_saisie(qte, color);
  
let newItem = [{
  nom,
  qte,
  color,  
}]
console.log(newItem);
  let productInLocalStorage = localStorage.getItem("obj");
  let productInLocalStorageParse = JSON.parse(productInLocalStorage);
    //s'il y a des produits dans le local storage  
    if(productInLocalStorage){      
        var finalObj = productInLocalStorageParse.concat(newItem);
        let panierStr = JSON.stringify(finalObj);
        localStorage.setItem("obj",panierStr);
        console.log(localStorage);
    }
    
    // s'il n'y a pas un produit dans le local storage  //
    else{
        productInLocalStorage = []
        
        let panierStr = JSON.stringify(newItem);
        localStorage.setItem("obj",panierStr);
        
        console.log(localStorage);
    }
    
    //gestion des articles de même id et de couleur identique

 let gestionArticle = localStorage.getItem("obj");
 let gestionArticlepars = JSON.parse(gestionArticle); 
 console.log (gestionArticlepars)           
             let newArray = [];
               
             let uniqueObject = {};
  
             for (let i in gestionArticlepars) {
       
                let objTitle = gestionArticlepars[i]['nom'];
                 console.log(objTitle)
                 
                let objcolor = gestionArticlepars[i]['color'];
                 console.log(objcolor)
                 let objQte = document.getElementById("quantity").value;
                 
                 uniqueObject[objTitle && objcolor] = gestionArticlepars[i];
     
                  // modification quantité pour 2 articles identiques
           
                localStorage.setItem('objTitle',objTitle);
                localStorage.setItem('objcolor',objcolor);
                
                    
             }
               
             for (i in uniqueObject) {
                 newArray.push(uniqueObject[i]);
              
             }
             
             console.log(newArray)
             
 
             let objTitle = localStorage.getItem('objTitle');
             let objQte = document.getElementById("quantity").value;
             let objcolor = localStorage.getItem('objcolor');
             let qteOld = localStorage.getItem('qteOld');
             console.log(objQte)
             console.log(qteOld)
///////////////////////////////////
            const index = newArray.findIndex( (element) => element.nom === objTitle && element.color === objcolor);
//////////////
             console.log(index)
                
                if(index != -1) {
                newArray[index] = {
                 nom: objTitle,
                 qte: Number(objQte) + Number(qteOld),
                 color: objcolor
                }
              }

              
//////////////////////////////////////////


            let newArrayStr= JSON.stringify(newArray);
            localStorage.setItem("obj",newArrayStr);    

                 console.log(newArray) 
                 
                 console.log(objTitle)
                
                 
            

  });
 
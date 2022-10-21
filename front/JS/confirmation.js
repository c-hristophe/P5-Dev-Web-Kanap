//création du numéro de commande 
var min=1; 
var max=1000000000000000000;  
var random = Math.floor(Math.random() * (max - min)) + min; 
console.log(random);

document.getElementById("orderId").innerText = random;

// création du pannier client 
let prenom = localStorage.getItem('prenom');
let nom = localStorage.getItem('nom');
let adresse= localStorage.getItem('adresse'); 
let ville = localStorage.getItem('ville');
let email= localStorage.getItem('email');

let client = [{
    prenom,
    nom,
    adresse,
    ville,
    email
}]
console.log (client)


let panierpars = localStorage.getItem('obj');
let panier = JSON.parse (panierpars);
console.log(panier);

var commandeClient = client.concat(panier);  

console.log (commandeClient);
let commandeClientstr = JSON.stringify(commandeClient);
console.log(commandeClientstr);

// envoyer le résultat à l'API

// function send(e) {
//     e.preventDefault();
//   fetch("http://localhost:3000/api/products/order/", {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: commandeClientstr
//   })
//   .then(function(res) {
//     if (res.ok) {
//       return res.json();
//     }
//   });
// }
// document.addEventListener('DOMContentLoaded', send)

const request = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: commandeClientstr
};

fetch('http://localhost:3000/api/products/order', request)
.then(function(res) {
        if (res.ok) {
        return res.json();
        }
})
var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");
console.log(id);
document.getElementById("orderId").innerText = id
localStorage.clear()

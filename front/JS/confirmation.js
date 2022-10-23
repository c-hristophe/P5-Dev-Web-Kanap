fetch("http://localhost:3000/api/products/order/")

            .then(function(res) {
            if (res.ok) {
                return res.json();
            }
          
            })
            //calcul du total des prix
            .then(function() {
            })


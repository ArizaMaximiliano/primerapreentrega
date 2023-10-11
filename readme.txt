Arreglos:
    Puse para abrir el sv con npm start
    En mi pc no encuentro el error del porque no me funcionan bien las rutas, siempre tengo problemas para referenciarlas. Es posible que ahora tambien exista error pero en mi pc funcionaba bien, espero que ande! (Voy a formatear mi pc para ver si es un tema de permisos de carpetas)

http://localhost:8080/api

Comprobe con POSTMAN:

    GET     /products               Todos los productos
    GET     /products?limit=2       Limite
    GET     /products/2             ID
    POST    /products               Agregar un producto (Probe validacion de campos y code)
            {
            "title": "Title0x",
            "description": "test",
            "price": 299,
            "image": "sin imagen",
            "code": "zzz111",
            "stock": "20"
            }
    PUT     /products/2             Actualice un producto      
            {
            "title": "Actualizacion",
            "description": "Actualizacion",
            "price": 50,
            "image": "sin imagen",
            "code": "zzz111",
            "stock": "100"
            }
    DELETE  /products/3             Elimine un producto



    POST    /carts                  Creacion del carrito
    GET     /carts/1                Verifique si se creo el carrito
    POST    /carts/1/product/2      Agregar un producto al carrito, probe agregar varios para chequear el quantity
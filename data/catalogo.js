export const products = [
  {
        id: "camara-dslr-canon-eos-90d",
        slug: "camara-dslr-canon-eos-90d",
        tags: [
            "camara",
            "dslr",
            "fotografia",
            "canon"
        ],
        rating: 3.5,
        reviews: 120,
        updatedAt:  serverTimestamp(),
        name: "Cámara DSLR Canon EOS 90D",
        shipping: {
            "weight": 1.2,
            "free": true
        },
        colors: [
            "black",
            "white",
            "green"
        ],
        sizes: [
            "40mm",
            "44mm",
            "48mm"
        ],
        description: "Cámara DSLR Canon EOS 90D con alta calidad de imagen y rendimiento excepcional.",
        featured: true,
        isActive: true,
        sku: "CAN-90D-BLK",
        category: "tecnologia",
        createdAt:  serverTimestamp(),
        brand: "canon",
        price: {
            current: 360,
            currency: "USD",
            discount: 10,
            old: 190
        },
        availability: "in_Stock",
        images: [
            "https://s7d1.scene7.com/is/image/canon/3616C016_eos-90d-and-ef-s-18-135mm-f-3.5-5.6-is-usm-kit_5?wid=730",
            "https://m.media-amazon.com/images/I/71-lfAJPGML._AC_UF894,1000_QL80_.jpg",
            "https://m.media-amazon.com/images/I/61gsdls1XCL._AC_UF894,1000_QL80_.jpg",
            "https://digitalphotosupply.com/cdn/shop/files/90D_grande.jpg?v=1770490037",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUubnV_ZOfunQpp-OVkv8G6H1PqP8THSr-MQ&s"
        ],
        variants: [
            {
                sku: "CAN-40-BLK",
                stock: 5,
                color: "black",
                size: "40mm"
            },
            {
                color: "white",
                size: "44mm",
                sku: "CAN-44-WHT",
                stock: 3
            },
            {
                color: "green",
                size: "48mm",
                sku: "CAN-48-GRN",
                stock: 8
            }
        ],
        stock: 30
    }
]
;

export default products;
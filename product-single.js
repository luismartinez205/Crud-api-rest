class ProductSingle extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.obtenerDatos();
  }

  async obtenerDatos() {
    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/products');

      const data = await respuesta.json();

      console.log(data);

      // Tomamos el primer producto
      const product = data[0];

      this.render(product);

    } catch (error) {
      console.log(error);
    }
  }

  render(product) {

    this.innerHTML = `
    
    <div class="container">    
      <div class="row d-flex gap-3">

        <div class="col-1 d-flex flex-column gap-3">

          <div class="group d-flex flex-column gap-3">
            <img src="${product.images[1]}" width="90">
            <img src="${product.images[0]}" width="90">         
          </div>

        </div>

        <div class="col-5 d-flex justify-center align-center">

          <div class="main">
            <img src="${product.images[0]}" id="picture" srcset="">
          </div>

        </div>

        <div class="col-4 info">

          <h1>${product.name}</h1>

          <h2>${product.description}</h2>

          <h3>${product.price.current}<span>${product.price.currency}</span></h3>

          <h4>Marca: ${product.brand}</h4>
          <h4>Codigo: ${product.sku}</h4>

        </div>

      </div>      
    </div>

    `;
  }
}

customElements.define('product-single', ProductSingle);
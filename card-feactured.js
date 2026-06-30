class CardFeactured extends HTMLElement {
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

      this.render(data);

    } catch (error) {
      console.log(error);
    }
  }

  async obtenerDatos() {
    try {
      const respuesta = await fetch('http://127.0.0.1:3000/api/products');

      const data = await respuesta.json();

      this.render(data);

    } catch (error) {
      console.log(error);
    }
  }

  render(products) {
    this.innerHTML = products.map(producto => `
       
      <div class="card h-100">
        <a href="shop-single.html">
          <img src="${producto.images?.[0] || ''}" class="card-img-top" alt="${producto.name || 'Producto'}">
        </a>
        <div class="card-body">
          <ul class="list-unstyled d-flex justify-between">
            <li>
              <i class="text-warning fa fa-star"></i>
              <i class="text-warning fa fa-star"></i>
              <i class="text-warning fa fa-star"></i>
              <i class="text-muted fa fa-star"></i>
              <i class="text-muted fa fa-star"></i>
            </li>
            <li class="text-muted text-right fw-bold text-primary">${producto.price?.current ?? ''}${producto.price?.currency ?? ''}</li>
            <li class="text-muted text-right fw-bold text-primary" style="text-decoration: line-through;">
              ${producto.price?.old ?? ''}
            </li>
          </ul>
          <a href="shop-single.html" class="h2 text-decoration-none text-dark">${producto.name || ''}</a>
          <p class="card-text">
            ${producto.description || ''}
          </p>
          <p class="text-muted">${producto.reviews ?? ''} reviews</p>
        </div>
      </div>
    
    `).join('');
  }
}

customElements.define('card-featured', CardFeactured);
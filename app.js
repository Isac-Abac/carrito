// Catálogo base de productos con precio en quetzales e imagen para la vista previa.
const productos = [
  { id: 1, nombre: "Laptop Gamer", precio: 7899, imagen: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80" },
  { id: 2, nombre: "Teclado Mecánico", precio: 649, imagen: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80" },
  { id: 3, nombre: "Mouse Inalámbrico", precio: 299, imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80" },
  { id: 4, nombre: "Monitor 27\"", precio: 1899, imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80" },
  { id: 5, nombre: "SSD 1TB", precio: 899, imagen: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=900&q=80" },
  { id: 6, nombre: "Auriculares RGB", precio: 459, imagen: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80" }
];

// Estado principal del carrito con persistencia en localStorage.
let carrito = JSON.parse(localStorage.getItem("carrito-informatica")) || [];

const listaProductos = document.getElementById("listaProductos");
const listaCarrito = document.getElementById("listaCarrito");
const totalSpan = document.getElementById("total");
const vaciarBtn = document.getElementById("vaciarBtn");
const formPago = document.getElementById("formPago");
const mensajePago = document.getElementById("mensajePago");
const temaBtn = document.getElementById("temaBtn");
const visorImagen = document.getElementById("visorImagen");
const imagenGrande = document.getElementById("imagenGrande");
const tituloImagen = document.getElementById("tituloImagen");
const cerrarModal = document.getElementById("cerrarModal");

// Formateador de moneda para mostrar quetzales de forma correcta.
const monedaGT = new Intl.NumberFormat("es-GT", {
  style: "currency",
  currency: "GTQ"
});

// Renderiza todas las tarjetas de productos con botón para agregar al carrito.
function renderProductos() {
  listaProductos.innerHTML = "";

  productos.forEach((producto) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-producto";

    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" data-id="${producto.id}" />
      <div class="info-producto">
        <p class="nombre-producto">${producto.nombre}</p>
        <p class="precio-producto">${monedaGT.format(producto.precio)}</p>
        <button class="boton-primario" data-agregar="${producto.id}">Agregar al carrito</button>
      </div>
    `;

    listaProductos.appendChild(tarjeta);
  });
}

// Agrupa productos repetidos para mostrar cantidad y subtotal en el carrito.
function obtenerCarritoAgrupado() {
  const resumen = {};

  carrito.forEach((item) => {
    if (!resumen[item.id]) {
      resumen[item.id] = { ...item, cantidad: 1 };
      return;
    }

    resumen[item.id].cantidad += 1;
  });

  return Object.values(resumen);
}

// Dibuja el carrito con opción de quitar una unidad por producto.
function renderCarrito() {
  listaCarrito.innerHTML = "";
  const carritoAgrupado = obtenerCarritoAgrupado();

  if (!carritoAgrupado.length) {
    listaCarrito.innerHTML = "<li>Tu carrito está vacío.</li>";
    totalSpan.textContent = monedaGT.format(0);
    return;
  }

  carritoAgrupado.forEach((item) => {
    const fila = document.createElement("li");
    fila.className = "item-carrito";
    const subtotal = item.precio * item.cantidad;

    fila.innerHTML = `
      <div>
        <strong>${item.nombre}</strong><br />
        Cantidad: ${item.cantidad} · Subtotal: ${monedaGT.format(subtotal)}
      </div>
      <button type="button" data-eliminar="${item.id}">Quitar</button>
    `;

    listaCarrito.appendChild(fila);
  });

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  totalSpan.textContent = monedaGT.format(total);
}

// Guarda el carrito y actualiza la interfaz cada vez que hay cambios.
function sincronizarCarrito() {
  localStorage.setItem("carrito-informatica", JSON.stringify(carrito));
  renderCarrito();
}

// Agrega un producto al carrito buscando su ID en el catálogo.
function agregarAlCarrito(idProducto) {
  const producto = productos.find((item) => item.id === idProducto);
  if (!producto) return;

  carrito.push(producto);
  sincronizarCarrito();
}

// Elimina una unidad del producto seleccionado del carrito.
function eliminarDelCarrito(idProducto) {
  const indice = carrito.findIndex((item) => item.id === idProducto);
  if (indice === -1) return;

  carrito.splice(indice, 1);
  sincronizarCarrito();
}

// Aplica y guarda tema claro/oscuro para mantener preferencia del usuario.
function inicializarTema() {
  const temaGuardado = localStorage.getItem("tema-carrito") || "claro";
  document.body.dataset.theme = temaGuardado === "oscuro" ? "oscuro" : "claro";
}

function alternarTema() {
  const actual = document.body.dataset.theme === "oscuro" ? "oscuro" : "claro";
  const nuevo = actual === "oscuro" ? "claro" : "oscuro";
  document.body.dataset.theme = nuevo;
  localStorage.setItem("tema-carrito", nuevo);
}

// Muestra imagen grande del producto para cumplir la vista previa solicitada.
function abrirVistaPrevia(idProducto) {
  const producto = productos.find((item) => item.id === idProducto);
  if (!producto) return;

  imagenGrande.src = producto.imagen;
  tituloImagen.textContent = `${producto.nombre} - ${monedaGT.format(producto.precio)}`;
  visorImagen.showModal();
}

// Valida campos básicos del formulario de pago y devuelve mensaje de error si aplica.
function validarPago(formData) {
  const nombre = formData.get("nombre").trim();
  const tarjeta = formData.get("tarjeta").replace(/\s+/g, "");
  const expira = formData.get("expira").trim();
  const cvv = formData.get("cvv").trim();

  if (!carrito.length) return "Debes agregar productos antes de pagar.";
  if (nombre.length < 5) return "Ingresa un nombre completo válido.";
  if (!/^\d{16}$/.test(tarjeta)) return "La tarjeta debe tener 16 dígitos.";
  if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(expira)) return "La fecha debe tener formato MM/AA.";
  if (!/^\d{3,4}$/.test(cvv)) return "El CVV debe tener 3 o 4 dígitos.";

  const [mes, anio] = expira.split("/").map(Number);
  const fechaActual = new Date();
  const anioActual = Number(String(fechaActual.getFullYear()).slice(-2));
  const mesActual = fechaActual.getMonth() + 1;

  if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
    return "La tarjeta está vencida.";
  }

  return "";
}

// Genera un recibo PDF simple con fecha, listado de productos y total pagado.
function generarReciboPDF(nombreCliente) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const fecha = new Date().toLocaleString("es-GT");
  const carritoAgrupado = obtenerCarritoAgrupado();

  doc.setFontSize(16);
  doc.text("Recibo de compra - Carrito de Informática", 14, 20);
  doc.setFontSize(11);
  doc.text(`Cliente: ${nombreCliente}`, 14, 30);
  doc.text(`Fecha: ${fecha}`, 14, 36);

  let y = 48;
  carritoAgrupado.forEach((item) => {
    const linea = `${item.nombre} x${item.cantidad} - ${monedaGT.format(item.precio * item.cantidad)}`;
    doc.text(linea, 14, y);
    y += 7;
  });

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  doc.setFontSize(13);
  doc.text(`Total pagado: ${monedaGT.format(total)}`, 14, y + 8);

  doc.save("recibo-carrito.pdf");
}

// Delegación de eventos para botones de agregar, quitar y vista previa por imagen.
listaProductos.addEventListener("click", (event) => {
  const idAgregar = Number(event.target.dataset.agregar);
  const idImagen = Number(event.target.dataset.id);

  if (idAgregar) agregarAlCarrito(idAgregar);
  if (idImagen) abrirVistaPrevia(idImagen);
});

listaCarrito.addEventListener("click", (event) => {
  const idEliminar = Number(event.target.dataset.eliminar);
  if (idEliminar) eliminarDelCarrito(idEliminar);
});

vaciarBtn.addEventListener("click", () => {
  carrito = [];
  sincronizarCarrito();
  mensajePago.textContent = "Carrito vaciado correctamente.";
});

formPago.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(formPago);
  const error = validarPago(formData);

  if (error) {
    mensajePago.textContent = error;
    return;
  }

  const nombreCliente = formData.get("nombre").trim();
  generarReciboPDF(nombreCliente);
  mensajePago.textContent = "Pago validado. Se generó tu recibo en PDF.";
  carrito = [];
  sincronizarCarrito();
  formPago.reset();
});

temaBtn.addEventListener("click", alternarTema);
cerrarModal.addEventListener("click", () => visorImagen.close());
visorImagen.addEventListener("click", (event) => {
  if (event.target === visorImagen) visorImagen.close();
});

// Inicio de la app: tema, catálogo y carrito guardado.
inicializarTema();
renderProductos();
renderCarrito();

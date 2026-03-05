// Catálogo de productos de informática.
// Cada producto incluye: id, nombre, precio, imagen y lista de especificaciones técnicas.
const productos = [
  {
    id: 1,
    nombre: "Laptop Gamer",
    precio: 7899,
    imagen: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80",
    especificaciones: ["CPU Ryzen 7", "RAM 16 GB DDR5", "SSD NVMe 1 TB", "GPU RTX 4060"]
  },
  {
    id: 2,
    nombre: "Teclado Mecánico",
    precio: 649,
    imagen: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80",
    especificaciones: ["Switch Red", "Iluminación RGB", "Formato TKL", "Conexión USB-C"]
  },
  {
    id: 3,
    nombre: "Mouse Inalámbrico",
    precio: 299,
    imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80",
    especificaciones: ["Sensor 12,000 DPI", "2.4 GHz + Bluetooth", "Batería recargable", "6 botones"]
  },
  {
    id: 4,
    nombre: "Monitor 27\"",
    precio: 1899,
    imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80",
    especificaciones: ["Panel IPS", "Resolución 2K", "Frecuencia 165 Hz", "Tiempo de respuesta 1 ms"]
  },
  {
    id: 5,
    nombre: "SSD 1TB",
    precio: 899,
    imagen: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=900&q=80",
    especificaciones: ["PCIe 4.0", "Lectura 7000 MB/s", "Escritura 5000 MB/s", "Formato M.2"]
  },
  {
    id: 6,
    nombre: "Auriculares RGB",
    precio: 459,
    imagen: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
    especificaciones: ["Audio 7.1", "Micrófono desmontable", "Iluminación RGB", "Conector 3.5mm + USB"]
  },
  {
    id: 7,
    nombre: "Webcam Full HD",
    precio: 349,
    imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
    especificaciones: ["Resolución 1080p", "30 FPS", "Micrófono integrado", "Enfoque automático"]
  },
  {
    id: 8,
    nombre: "Router Wi-Fi 6",
    precio: 999,
    imagen: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&w=900&q=80",
    especificaciones: ["Doble banda", "Velocidad AX3000", "4 antenas externas", "Puerto Gigabit"]
  },
  {
    id: 9,
    nombre: "Memoria RAM 16GB",
    precio: 529,
    imagen: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=900&q=80",
    especificaciones: ["DDR4", "3200 MHz", "Disipador aluminio", "Compatibilidad XMP"]
  },
  {
    id: 10,
    nombre: "Base Refrigerante",
    precio: 279,
    imagen: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=900&q=80",
    especificaciones: ["2 ventiladores", "Velocidad ajustable", "5 niveles de altura", "Alimentación USB"]
  },
  {
    id: 11,
    nombre: "Silla Gamer",
    precio: 1499,
    imagen: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=900&q=80",
    especificaciones: ["Reclinable 180°", "Soporte lumbar", "Pistón clase 4", "Estructura metálica"]
  },
  {
    id: 12,
    nombre: "Control Inalámbrico",
    precio: 549,
    imagen: "https://images.unsplash.com/photo-1592840062661-7be24ad74e20?auto=format&fit=crop&w=900&q=80",
    especificaciones: ["Bluetooth 5.0", "Vibración dual", "Batería 12h", "Compatible PC/Consola"]
  },
  {
    id: 13,
    nombre: "Microfono USB",
    precio: 629,
    imagen: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80",
    especificaciones: ["Patrón cardioide", "Plug & Play", "Brazo articulado", "Cancelación de ruido"]
  },
  {
    id: 14,
    nombre: "Tarjeta Grafica",
    precio: 4299,
    imagen: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80",
    especificaciones: ["8 GB GDDR6", "Ray Tracing", "PCIe 4.0", "Triple ventilador"]
  },
  {
    id: 15,
    nombre: "UPS 1200VA",
    precio: 1099,
    imagen: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&w=900&q=80",
    especificaciones: ["Respaldo de energía", "Protección de voltaje", "8 tomas", "Pantalla LCD"]
  }
];

// Estado principal del carrito con persistencia en localStorage.
// Se usa try/catch para evitar que un JSON corrupto rompa la aplicación al iniciar.
let carrito = [];
try {
  carrito = JSON.parse(localStorage.getItem("carrito-informatica")) || [];
} catch (error) {
  carrito = [];
}

// Referencias a elementos del DOM.
const listaProductos = document.getElementById("listaProductos");
const listaCarrito = document.getElementById("listaCarrito");
const totalSpan = document.getElementById("total");
const vaciarBtn = document.getElementById("vaciarBtn");
const formPago = document.getElementById("formPago");
const monedaSelect = document.getElementById("monedaSelect");
const tipoCambioInfo = document.getElementById("tipoCambioInfo");
const tarjetaInput = document.getElementById("tarjeta");
const expiraInput = document.getElementById("expira");
const cvvInput = document.getElementById("cvv");
const temaBtn = document.getElementById("temaBtn");
const visorImagen = document.getElementById("visorImagen");
const imagenGrande = document.getElementById("imagenGrande");
const tituloImagen = document.getElementById("tituloImagen");
const especificacionesImagen = document.getElementById("especificacionesImagen");
const cerrarModal = document.getElementById("cerrarModal");

// Configuración de moneda: los precios base se almacenan en GTQ y se convierten a USD.
const TIPO_CAMBIO_USD = 7.8;
let monedaActual = localStorage.getItem("moneda-carrito") || "GTQ";

function obtenerFormateadorMoneda() {
  if (monedaActual === "USD") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  }
  return new Intl.NumberFormat("es-GT", { style: "currency", currency: "GTQ" });
}

function convertirDesdeGTQ(valorGTQ) {
  if (monedaActual === "USD") return valorGTQ / TIPO_CAMBIO_USD;
  return valorGTQ;
}

function formatearMoneda(valorGTQ) {
  return obtenerFormateadorMoneda().format(convertirDesdeGTQ(valorGTQ));
}

function actualizarInfoMoneda() {
  if (!tipoCambioInfo) return;
  tipoCambioInfo.textContent = monedaActual === "USD"
    ? `Moneda actual: USD (tipo de cambio referencial 1 USD = Q${TIPO_CAMBIO_USD.toFixed(2)})`
    : "Moneda actual: GTQ (precios base del catálogo)";
}

function inicializarMoneda() {
  if (!monedaSelect) return;
  monedaSelect.value = monedaActual;
  actualizarInfoMoneda();

  monedaSelect.addEventListener("change", () => {
    monedaActual = monedaSelect.value === "USD" ? "USD" : "GTQ";
    localStorage.setItem("moneda-carrito", monedaActual);
    actualizarInfoMoneda();
    renderProductos();
    renderCarrito();
  });
}

// Centraliza todas las alertas con SweetAlert2.
// Si la librería no carga, se registra el error para diagnóstico.
function mostrarAlerta(icono, titulo, texto) {
  if (!window.Swal) {
    console.error("SweetAlert2 no está disponible en este momento.");
    return;
  }

  Swal.fire({
    icon: icono,
    title: titulo,
    text: texto,
    confirmButtonText: "Entendido"
  });
}

// Limpia caracteres no numéricos y aplica un límite de dígitos.
function limpiarSoloDigitos(valor, limite) {
  return String(valor ?? "").replace(/\D/g, "").slice(0, limite);
}

// Aplica máscara al número de tarjeta en grupos de 4 dígitos.
function formatearTarjeta(valor) {
  const digitos = limpiarSoloDigitos(valor, 16);
  return digitos.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

// Aplica máscara MM/AA tomando solamente 4 dígitos numéricos.
function formatearExpira(valor) {
  const digitos = limpiarSoloDigitos(valor, 4);
  if (digitos.length <= 2) return digitos;
  return `${digitos.slice(0, 2)}/${digitos.slice(2)}`;
}

// Configura restricciones de entrada para evitar letras y excedentes de dígitos.
function inicializarFormatoCamposPago() {
  if (!tarjetaInput || !expiraInput || !cvvInput) return;

  tarjetaInput.addEventListener("input", () => {
    tarjetaInput.value = formatearTarjeta(tarjetaInput.value);
  });

  expiraInput.addEventListener("input", () => {
    expiraInput.value = formatearExpira(expiraInput.value);
  });

  cvvInput.addEventListener("input", () => {
    cvvInput.value = limpiarSoloDigitos(cvvInput.value, 4);
  });
}

// Renderiza las tarjetas de productos con imagen, precio y especificación principal.
function renderProductos() {
  if (!listaProductos) return;
  listaProductos.innerHTML = "";

  productos.forEach((producto, indice) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-producto";
    tarjeta.style.animationDelay = `${indice * 45}ms`;

    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" data-id="${producto.id}" />
      <div class="info-producto">
        <p class="nombre-producto">${producto.nombre}</p>
        <p class="detalle-producto">${producto.especificaciones[0]}</p>
        <p class="precio-producto">${formatearMoneda(producto.precio)}</p>
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
  if (!listaCarrito || !totalSpan) return;

  listaCarrito.innerHTML = "";
  const carritoAgrupado = obtenerCarritoAgrupado();

  if (!carritoAgrupado.length) {
    listaCarrito.innerHTML = "<li>Tu carrito está vacío.</li>";
    totalSpan.textContent = formatearMoneda(0);
    return;
  }

  carritoAgrupado.forEach((item) => {
    const fila = document.createElement("li");
    fila.className = "item-carrito";
    const subtotal = item.precio * item.cantidad;

    fila.innerHTML = `
      <div>
        <strong>${item.nombre}</strong><br />
        Cantidad: ${item.cantidad} · Subtotal: ${formatearMoneda(subtotal)}
      </div>
      <button type="button" data-eliminar="${item.id}">Quitar</button>
    `;

    listaCarrito.appendChild(fila);
  });

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  totalSpan.textContent = formatearMoneda(total);
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
  mostrarAlerta("success", "Producto agregado", `${producto.nombre} fue agregado al carrito.`);
}

// Elimina una unidad del producto seleccionado del carrito.
function eliminarDelCarrito(idProducto) {
  const indice = carrito.findIndex((item) => item.id === idProducto);
  if (indice === -1) return;

  const productoQuitado = carrito[indice];
  carrito.splice(indice, 1);
  sincronizarCarrito();
  mostrarAlerta("info", "Producto eliminado", `${productoQuitado.nombre} fue quitado del carrito.`);
}

// Aplica y guarda tema claro/oscuro para mantener preferencia del usuario.
function inicializarTema() {
  const temaGuardado = localStorage.getItem("tema-carrito") || "oscuro";
  document.body.dataset.theme = temaGuardado === "oscuro" ? "oscuro" : "claro";
}

function alternarTema() {
  const actual = document.body.dataset.theme === "oscuro" ? "oscuro" : "claro";
  const nuevo = actual === "oscuro" ? "claro" : "oscuro";
  document.body.dataset.theme = nuevo;
  localStorage.setItem("tema-carrito", nuevo);
}

// Muestra imagen grande del producto y sus especificaciones técnicas.
function abrirVistaPrevia(idProducto) {
  const producto = productos.find((item) => item.id === idProducto);
  if (!producto || !imagenGrande || !tituloImagen || !especificacionesImagen || !visorImagen) return;

  imagenGrande.src = producto.imagen;
  imagenGrande.alt = `Imagen de ${producto.nombre}`;
  // CORRECCION DEL TITULO: se fuerza el nombre/precio del producto seleccionado
  // para evitar que el encabezado de la vista previa quede ambiguo o no coincida.
  tituloImagen.textContent = `Producto: ${producto.nombre} | Precio: ${formatearMoneda(producto.precio)}`;

  especificacionesImagen.innerHTML = "";
  producto.especificaciones.forEach((especificacion) => {
    const item = document.createElement("li");
    item.textContent = especificacion;
    especificacionesImagen.appendChild(item);
  });

  if (typeof visorImagen.showModal === "function") {
    visorImagen.showModal();
    return;
  }

  // Respaldo para navegadores sin soporte para <dialog>.
  window.open(producto.imagen, "_blank");
}

// Valida campos básicos del formulario de pago y devuelve mensaje de error si aplica.
function validarPago(formData) {
  const nombre = formData.get("nombre").trim();
  const tarjeta = limpiarSoloDigitos(formData.get("tarjeta"), 16);
  const expira = formatearExpira(formData.get("expira"));
  const cvv = limpiarSoloDigitos(formData.get("cvv"), 4);

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

// Genera un recibo PDF con encabezado visual, tabla y total destacado.
function generarReciboPDF(nombreCliente) {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    throw new Error("No se pudo cargar la librería de PDF.");
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const fecha = new Date().toLocaleString("es-GT");
  const carritoAgrupado = obtenerCarritoAgrupado();
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  // Encabezado principal con color para una mejor presentación visual.
  doc.setFillColor(10, 34, 66);
  doc.rect(0, 0, 210, 32, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(17);
  doc.text("RECIBO DE COMPRA", 14, 15);
  doc.setFontSize(11);
  doc.text("Carrito de Informatica", 14, 23);
  doc.text(`Moneda: ${monedaActual}`, 140, 23);

  // Datos del cliente y fecha.
  doc.setTextColor(33, 37, 41);
  doc.setFontSize(11);
  doc.text(`Cliente: ${nombreCliente}`, 14, 42);
  doc.text(`Fecha: ${fecha}`, 14, 48);
  doc.text(`No. Recibo: RC-${Date.now().toString().slice(-6)}`, 14, 54);

  // Cabecera de tabla.
  let y = 66;
  doc.setFillColor(231, 240, 255);
  doc.rect(14, y - 6, 182, 8, "F");
  doc.setFontSize(10);
  doc.text("Producto", 16, y - 1);
  doc.text("Cant.", 118, y - 1);
  doc.text("Precio", 138, y - 1);
  doc.text("Subtotal", 170, y - 1);

  y += 5;
  carritoAgrupado.forEach((item) => {
    const subtotal = item.precio * item.cantidad;
    doc.text(item.nombre.slice(0, 34), 16, y);
    doc.text(String(item.cantidad), 120, y);
    doc.text(formatearMoneda(item.precio), 138, y);
    doc.text(formatearMoneda(subtotal), 170, y);
    y += 7;
  });

  // Línea de cierre y total final.
  doc.setDrawColor(170, 180, 200);
  doc.line(14, y + 1, 196, y + 1);
  doc.setFontSize(12);
  doc.setTextColor(12, 64, 130);
  doc.text(`TOTAL PAGADO: ${formatearMoneda(total)}`, 14, y + 10);

  // Nota de agradecimiento al pie del documento.
  doc.setFontSize(9);
  doc.setTextColor(90, 100, 120);
  doc.text("Gracias por tu compra. Conserva este recibo para cualquier aclaracion.", 14, 285);

  doc.save("recibo-carrito.pdf");
}

// Delegación de eventos para botones de agregar, quitar y vista previa por imagen.
if (listaProductos) {
  listaProductos.addEventListener("click", (event) => {
    const idAgregar = Number(event.target.dataset.agregar);
    const idImagen = Number(event.target.dataset.id);

    if (idAgregar) agregarAlCarrito(idAgregar);
    if (idImagen) abrirVistaPrevia(idImagen);
  });
}

if (listaCarrito) {
  listaCarrito.addEventListener("click", (event) => {
    const idEliminar = Number(event.target.dataset.eliminar);
    if (idEliminar) eliminarDelCarrito(idEliminar);
  });
}

if (vaciarBtn) {
  vaciarBtn.addEventListener("click", () => {
    if (!carrito.length) {
      mostrarAlerta("warning", "Carrito vacío", "No hay productos para vaciar.");
      return;
    }

    carrito = [];
    sincronizarCarrito();
    mostrarAlerta("success", "Carrito vaciado", "Todos los productos fueron eliminados.");
  });
}

if (formPago) {
  formPago.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formPago);
    const error = validarPago(formData);

    if (error) {
      mostrarAlerta("error", "Error de validación", error);
      return;
    }

    const nombreCliente = formData.get("nombre").trim();
    try {
      generarReciboPDF(nombreCliente);
      mostrarAlerta("success", "Pago validado", "Se generó tu recibo en PDF correctamente.");
      carrito = [];
      sincronizarCarrito();
      formPago.reset();
    } catch (error) {
      mostrarAlerta("error", "Error al generar PDF", error.message);
    }
  });
}

if (temaBtn) {
  temaBtn.addEventListener("click", alternarTema);
}

if (cerrarModal && visorImagen) {
  cerrarModal.addEventListener("click", () => {
    if (typeof visorImagen.close === "function") {
      visorImagen.close();
    }
  });

  visorImagen.addEventListener("click", (event) => {
    if (event.target === visorImagen && typeof visorImagen.close === "function") {
      visorImagen.close();
    }
  });
}

// Inicio de la app: tema, catálogo y carrito guardado.
inicializarTema();
inicializarFormatoCamposPago();
inicializarMoneda();
renderProductos();
renderCarrito();

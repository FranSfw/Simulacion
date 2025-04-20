// Constantes y variables globales
const TRANSLATIONS = {
  en: {
    proyectName: "Products Verifier",
    title: "Bar Code",
    timeLabel: "Date & Time:",
    product: "Product",
    price: "Price",
    notFound: "Product not found",
    products: "Load products",
  },
  es: {
    proyectName: "Verificador de Productos",
    title: "Código de Barras",
    timeLabel: "Fecha y Hora:",
    product: "Producto",
    price: "Precio",
    notFound: "Producto no encontrado",
    products: "Cargar productos",
  },
};

const PRODUCTS = [];
let currentLang = "en";
let timerInterval = null;
let currentCode = "";

// Funciones de utilidad
const updateTime = (element) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const now = new Date().toLocaleDateString(
    currentLang === "en" ? "en-US" : "es-ES",
    options
  );
  element.innerHTML = `${TRANSLATIONS[currentLang].timeLabel} <br> ${now}`;
};

// Funciones del reloj
const startClock = () => {
  const timeElement = document.getElementById("date-time");
  updateTime(timeElement);
  timerInterval = setInterval(() => updateTime(timeElement), 1000);
};

// Funciones de idioma
const applyLanguage = () => {
  const t = TRANSLATIONS[currentLang];

  document.getElementById("barcode-title").textContent = t.title;
  document.querySelector("#date-time").textContent = t.timeLabel;
  document.getElementById("products").textContent = t.products;
  document.getElementById("proyect-title").textContent = t.proyectName;

  // Actualizar estado del toggle de idioma
  document.getElementById("languageToggle").checked = currentLang === "es";
};

const toggleLanguage = () => {
  currentLang = currentLang === "en" ? "es" : "en";
  localStorage.setItem("language", currentLang);
  applyLanguage();
};

// Funciones de modo oscuro
const toggleDarkMode = () => {
  const htmlElement = document.documentElement;
  const isDarkMode = htmlElement.classList.toggle('dark');
  localStorage.setItem('darkmode', isDarkMode ? 'active' : 'inactive');
  document.getElementById("darkModeToggle").checked = isDarkMode;
};

// Funciones de productos
const readProductsFromFile = (file) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const text = event.target.result;
    const lines = text.trim().split("\n");

    PRODUCTS.length = 0;

    for (const line of lines) {
      const [code, name, price, image] = line.split(",");
      PRODUCTS.push([code.trim(), name.trim(), price.trim(), image.trim()]);
    }

  };

  reader.readAsText(file);
};

const searchProduct = (code) => {
  const barcodeContainer = document.querySelector(".barcode-container");
  let content = "";
  let found = false;

  for (const product of PRODUCTS) {
    if (product[0] === code) {
      content = `
        <h2>${TRANSLATIONS[currentLang].product}: ${product[1]}</h2>
        <p>${TRANSLATIONS[currentLang].price}: ${product[2]}</p>
        <img src="./img/${product[3]}" alt="${product[1]}" class="product-image">
      `;
      found = true;
      break;
    }
  }

  if (!found) {
    content = `<p class="error">${TRANSLATIONS[currentLang].notFound}</p>`;
  }

  barcodeContainer.innerHTML = content;

  setTimeout(() => {
    barcodeContainer.innerHTML = `
      <img src="./img/barcode.gif" alt="Barcode" class="barcode">
      <h2 id="barcode-title">${TRANSLATIONS[currentLang].title}</h2>
    `;
  }, 3000);
};

// Manejadores de eventos
const setupEventListeners = () => {
  // Cargar productos desde un archivo CSV
  document.getElementById("fileInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      readProductsFromCsv(file);
    } else {
      alert("Por favor, selecciona un archivo CSV válido.");
    }
  });

  // Escanear código
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      currentCode += event.key;
    } else {
      searchProduct(currentCode);
      currentCode = "";
    }
  });

  // Toggle idioma
  document.getElementById("languageToggle").addEventListener("change", toggleLanguage);

  // Toggle modo oscuro
  document.getElementById("darkModeToggle").addEventListener("change", toggleDarkMode);
};

// Nueva función para leer archivos CSV
const readProductsFromCsv = (file) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const text = event.target.result;
    const lines = text.trim().split("\n");

    PRODUCTS.length = 0;

    for (const line of lines) {
      const [code, name, price, image] = line.split(",");
      PRODUCTS.push([code.trim(), name.trim(), price.trim(), image.trim()]);
    }
  };

  reader.readAsText(file);
};

// Inicialización
const initializeApp = () => {
  // Cargar preferencias de idioma
  const savedLang = localStorage.getItem("language");
  currentLang = savedLang === "es" ? "es" : "en";

  // Cargar preferencias de modo oscuro
  const savedMode = localStorage.getItem('darkmode');
  if (savedMode === 'active') {
    document.documentElement.classList.add('dark');
    document.getElementById("darkModeToggle").checked = true;
  }

  // Configurar toggles según estado inicial
  document.getElementById("languageToggle").checked = currentLang === "es";

  setupEventListeners();
  applyLanguage();
  startClock();
};

// Iniciar la aplicación cuando el DOM esté listo
window.addEventListener("DOMContentLoaded", initializeApp);
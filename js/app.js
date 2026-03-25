// Nombre
document.getElementById("nombre").textContent = CONFIG.nombre;
document.title = CONFIG.nombre;

// WhatsApp base
const wspBase = `https://wa.me/${CONFIG.whatsapp}`;

// Botones globales
const wspLink = `${wspBase}?text=Hola%20quiero%20hacer%20un%20pedido`;

document.getElementById("btnWsp").href = wspLink;
document.getElementById("btnHero").href = wspLink;

// CONTENEDOR
const contMenu = document.getElementById("menu");

// RENDER PRINCIPAL
function renderMenu() {
  contMenu.innerHTML = "";

  const categorias = {};

  CONFIG.productos.forEach(prod => {
    let categoria = prod.categoria;

    // Cambiar "Todos" a Hamburguesas
    if (categoria === "Todos") {
      categoria = "Hamburguesas";
    }

    if (!categorias[categoria]) {
      categorias[categoria] = [];
    }

    categorias[categoria].push(prod);
  });

  Object.keys(categorias).forEach(cat => {

    const section = document.createElement("div");
    section.className = "mb-10";

    // Título con icono
    section.innerHTML = `
      <h2 class="text-xl font-semibold mb-4 text-orange-400 flex items-center gap-2">
        ${getCategoryIcon(cat)}
        ${cat}
      </h2>
    `;

    const items = document.createElement("div");
    items.className = "flex flex-col gap-4";

    categorias[cat].forEach(prod => {

      const card = document.createElement("div");

      card.className =
        "bg-[#1f1f1f] rounded-2xl p-4 flex items-center justify-between border border-white/5";

      card.innerHTML = `
        <div class="flex items-center gap-4">

          <!-- ICONO (ahora por categoría) -->
          <div class="w-14 h-14 flex items-center justify-center 
                      bg-orange-500/20 rounded-xl text-orange-400 text-2xl">
            ${getCategoryIcon(cat)}
          </div>

          <!-- INFO -->
          <div>
            <h3 class="text-base font-semibold">${prod.nombre}</h3>
            <p class="text-xs text-gray-400">${prod.descripcion}</p>
            <span class="text-orange-400 font-bold text-sm">${prod.precio}</span>
          </div>

        </div>
      `;

      items.appendChild(card);
    });

    section.appendChild(items);
    contMenu.appendChild(section);
  });
}

// ICONO SEGÚN CATEGORÍA
function getCategoryIcon(cat) {
  const c = cat.toLowerCase();

  if (c.includes("hamburguesa") || c.includes("burger")) {
    return '<i class="fa-solid fa-burger"></i>';
  }

  if (c.includes("papa")) {
    return '<i class="fa-solid fa-utensils"></i>';
  }

  if (c.includes("combo")) {
    return '<i class="fa-solid fa-box"></i>';
  }

  return '<i class="fa-solid fa-utensils"></i>';
}

// INIT
renderMenu();
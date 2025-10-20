const form = document.getElementById("property-form");
const province = document.getElementById("province");
const town = document.getElementById("town");
const address = document.getElementById("address");
const title = document.getElementById("title");
const sqmeters = document.getElementById("sqmeters");
const numRooms = document.getElementById("numRooms");
const numBaths = document.getElementById("numBaths");
const price = document.getElementById("price");
const mainPhoto = document.getElementById("mainPhoto");
const imagePreview = document.getElementById("image-preview");
const list = document.getElementById("property-listings");
const template = document.getElementById("property-card-template");

const MAX_WEIGHT = 200 * 1024;

mainPhoto.addEventListener("change", () => {
  const file = mainPhoto.files[0];

  if (!file || !file.type.startsWith("image") || file.size > MAX_WEIGHT) {
    mainPhoto.setCustomValidity("La imagen no es compatible");
    imagePreview.classList.add("hidden");
    imagePreview.removeAttribute("src");
    return;
  }
  const fileReader = new FileReader();
  mainPhoto.setCustomValidity("");
  fileReader.addEventListener("load", () => {
    imagePreview.classList.remove("hidden");
    imagePreview.src = fileReader.result;
  });
  fileReader.readAsDataURL(file);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const property = {
    province: province.value.trim(),
    town: town.value.trim(),
    address: address.value.trim(),
    title: title.value.trim(),
    sqmeters: Number(sqmeters.value),
    numRooms: Number(numRooms.value),
    numBaths: Number(numBaths.value),
    price: Number(price.value),
    image: imagePreview.src,
  };
  addProperty(property);
  form.reset();
  imagePreview.classList.add("hidden");
  imagePreview.removeAttribute("src");
});

function addProperty(property) {
  const clone = template.content.cloneNode(true);
  const imgClone = clone.querySelector(".property-image");
  const titleClone = clone.querySelector(".property-title");
  const locationClone = clone.querySelector(".property-location");
  const priceClone = clone.querySelector(".property-price");
  const sqmClone = clone.querySelector(".property-sqmeters");
  const roomsClone = clone.querySelector(".property-rooms");
  const bathsClone = clone.querySelector(".property-baths");
  const deleteBtn = clone.querySelector(".btn-delete");

  imgClone.src = property.image;
  imgClone.alt = property.title || "This is an alt";
  titleClone.textContent = property.title;
  locationClone.textContent = `${property.address},${property.town}, ${property.province}`;
  priceClone.textContent = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(property.price);
  sqmClone.textContent = `${property.sqmeters} sqm`;
  roomsClone.textContent = `${property.numRooms} beds`;
  bathsClone.textContent = `${property.numBaths} baths`;

  deleteBtn.addEventListener("click", (e) => {
    const button = e.currentTarget;
    const card = button.closest(".bg-white"); // Esto lo he aprendido preguntando a chatgpt si se podria mejorar el codigo y lo que hace es buscar el elemento mas cercano con esa clase
    if (card && card.parentElement) { //y con el elemento seleccionado solamente tendríamos que hacer el remove
      card.remove();
    }
  });
  list.appendChild(clone);
}

import { PropertiesService } from "./properties.service.js";
import { ProvincesService } from "./provinces.service.js";
import { MapService } from "./map.service.js";
import { MyGeolocation } from "./my-geolocation.js";
import "ol/ol.css";
import "./styles.css";
const propertiesService = new PropertiesService();
const provincesService = new ProvincesService();

const form = document.getElementById("property-form");
const province = document.getElementById("province");
const town = document.getElementById("town");
const address = document.getElementById("address");
const title = document.getElementById("title");
const description = document.getElementById("description");
const sqmeters = document.getElementById("sqmeters");
const numRooms = document.getElementById("numRooms");
const numBaths = document.getElementById("numBaths");
const price = document.getElementById("price");
const mainPhoto = document.getElementById("mainPhoto");
const imagePreview = document.getElementById("image-preview");

province.addEventListener("change", async (e) => {
  const idProvince = e.target.value;

  town.innerHTML = '<option value="">Select a town</option>';

  if (!idProvince) {
    return;
  }

  try {
    const townsList = await provincesService.getTowns(idProvince);
    allTowns = townsList;
    townsList.forEach((t) => {
      const option = document.createElement("option");
      option.value = t.id;
      option.textContent = t.name;
      town.append(option);
    });
  } catch (error) {
    console.error("Error loading towns:", error);
    alert("Error loading towns");
  }
});



const provincesList = await provincesService.getProvinces();
provincesList.forEach((p) => {
  let option = document.createElement("option");
  option.value = p.id;
  option.textContent = p.name;
  province.append(option);
});

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

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const property = {
    title: title.value.trim(),
    description: description.value.trim(),
    price: Number(price.value),
    address: address.value.trim(),
    sqmeters: Number(sqmeters.value),
    numRooms: Number(numRooms.value),
    numBaths: Number(numBaths.value),
    townId: Number(town.value),
    mainPhoto: imagePreview.src,
  };
  try {
    await propertiesService.insertProperty(property);
    location.assign("index.html");
  } catch (error) {
    console.error(error);
    alert("Error property.");
  }
});

let mapService;
let allTowns = [];

const coords = await MyGeolocation.getLocation();
mapService = new MapService(coords, "map");
mapService.createMarker(coords);
console.log(coords);

town.addEventListener("change", (e) => {
  const idTown = Number(e.target.value);
  const selectedTown = allTowns.find((t) => t.id === idTown);
  if (!selectedTown) {
    return;
  }
  const { latitude, longitude } = selectedTown;
  mapService.view.setCenter([longitude, latitude]);
  mapService.createMarker({ latitude, longitude });
});
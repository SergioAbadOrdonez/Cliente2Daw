import { PropertiesService } from "./properties.service.js";
import './styles.css';
const list = document.getElementById("property-listings");
const template = document.getElementById("property-card-template");
const propertiesService = new PropertiesService();

async function loadProperties() {
    const properties = await propertiesService.getProperties();
    properties.forEach(addProperty);
}

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
    imgClone.src = property.mainPhoto;
    imgClone.alt = property.title || "This is an alt";
    titleClone.textContent = property.title;
    locationClone.textContent = `${property.address},${property.town.name}, ${property.town.province.name}`;
    priceClone.textContent = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "EUR",
    }).format(property.price);
    sqmClone.textContent = `${property.sqmeters} sqm`;
    roomsClone.textContent = `${property.numRooms} beds`;
    bathsClone.textContent = `${property.numBaths} baths`;
    deleteBtn.addEventListener("click", async () => {
        const confirmDelete = confirm(`Are you sure you want to delete "${property.title}"?`);
        if (!confirmDelete) {
            return;
        }
        await propertiesService.deleteProperty(property.id);
        location.reload();
    });
    list.appendChild(clone);
}
loadProperties();
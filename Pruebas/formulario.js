const form = document.getElementById("productForm");
const tbody = document.querySelector("#listaProductos tbody");
const imgPreview = document.getElementById("imgPreview");

function addProducto(producto){
    const tr = document.createElement("tr");
    const tdImagen = document.createElement("td");
    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    tdImagen.append(imagen);
    const tdNombre = document.createElement("td");
    tdNombre.append(producto.nombre);
    const tdPrecio = document.createElement("td");
    tdPrecio.append(new Intl.NumberFormat('es', {currency: 'EUR'}).format(producto.precio));

    tr.append(tdImagen,tdNombre,tdPrecio);
    tbody.append(tr);
}

form.imagen.addEventListener("change", e =>{
    const file = e.target.files[0];
    if(!file){
        imgPreview.src = "";
        return;
    }

    if(!/(.jpg|png)$/.test(file.name)){
        form.imagen.setCustomValidity("La extension es incorrecta");
        return;
    }else{
        form.imagen.setCustomValidity("");
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", () =>{
        imgPreview.src = fileReader.result;
    });
});



form.addEventListener("submit", e => {
    e.preventDefault();
    
    if(!form.reportValidity()) return;
    
    const producto = {
        nombre: form.nombre.value,
        precio: +form.precio.value,
        imagen: imgPreview.src
    }
    addProducto(producto);
    form.reset();
    imgPreview.src = "";
});


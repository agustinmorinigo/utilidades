// Valida nombre con ñ y acentos. El string no puede contener espacios en ningún lado, solo valida un nombre.
const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]{3,100}$/g;


// Valida emails que acepta caracteres latinos.
const emailRegex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
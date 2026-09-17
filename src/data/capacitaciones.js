const crearDiapositivas = (ruta, cantidad) =>
  Array.from(
    { length: cantidad },
    (_, index) => `${ruta}/${index + 1}.webp`
  );

export const capacitaciones = [
  {
    id: "bombero-forestal",
    titulo: "Bombero Forestal",
    descripcion:
      "Introducción a la prevención y respuesta ante incendios forestales.",
    diapositivas: crearDiapositivas(
      "/capacitaciones/bombero-forestal",
      18
    ),
  },
  {
    id: "gestion-emergencias",
    titulo: "Gestión de Emergencias",
    descripcion:
      "Introducción a la gestión de emergencias y coordinación de la respuesta.",
    diapositivas: crearDiapositivas(
      "/capacitaciones/gestion-emergencias",
      12
    ),
  },
];
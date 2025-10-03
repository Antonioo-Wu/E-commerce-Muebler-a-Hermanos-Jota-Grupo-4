const productos = [
  {
    id: 1,
    nombre: "Aparador Uspallata",
    descripcion:
      "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    imagen: `${process.env.PUBLIC_URL}/productos/aparador_uspallata.png`,
    precio: 480000,
    destacado: true,
    detalles: [
      { label: "Medidas", value: "180 × 45 × 75 cm" },
      { label: "Materiales", value: "Nogal macizo FSC®, herrajes de latón" },
      { label: "Acabado", value: "Aceite natural ecológico" },
      { label: "Peso", value: "68 kg" },
      { label: "Capacidad", value: "6 compartimentos interiores" },
    ],
  },
  {
    id: 2,
    nombre: "Biblioteca Recoleta",
    descripcion:
      "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
    imagen: `${process.env.PUBLIC_URL}/productos/biblioteca_recoleta.png`,
    precio: 390000,
    destacado: false,
    detalles: [
      { label: "Medidas", value: "100 × 35 × 200 cm" },
      { label: "Materiales", value: "Estructura de acero, estantes de roble" },
      { label: "Acabado", value: "Laca mate ecológica" },
      { label: "Capacidad", value: "45 kg por estante" },
      { label: "Modulares", value: "5 estantes ajustables" },
    ],
  },
  {
    id: 3,
    nombre: "Butaca Mendoza",
    descripcion:
      "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
    imagen: `${process.env.PUBLIC_URL}/productos/butaca_mendoza.png`,
    precio: 220000,
    destacado: true,
    detalles: [
      { label: "Medidas", value: "80 × 75 × 85 cm" },
      { label: "Materiales", value: "Guatambú macizo, tela bouclé" },
      { label: "Acabado", value: "Cera vegetal, tapizado premium" },
      { label: "Tapizado", value: "Repelente al agua y manchas" },
      { label: "Confort", value: "Espuma alta densidad" },
    ],
  },
  {
    id: 4,
    nombre: "Sillón Copacabana",
    descripcion:
      "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
    imagen: `${process.env.PUBLIC_URL}/productos/sillon_copacabana.png`,
    precio: 350000,
    destacado: false,
    detalles: [
      { label: "Medidas", value: "90 × 85 × 95 cm" },
      { label: "Materiales", value: "Cuero curtido vegetal, acero pintado" },
      { label: "Acabado", value: "Cuero anilina premium" },
      { label: "Rotación", value: "360° silenciosa y suave" },
      { label: "Garantía", value: "10 años en estructura" },
    ],
  },
  {
    id: 5,
    nombre: "Mesa de Centro Araucaria",
    descripcion:
      "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea.",
    imagen: `${process.env.PUBLIC_URL}/productos/mesa_de_centro_araucaria.png`,
    precio: 290000,
    destacado: false,
    detalles: [
      { label: "Medidas", value: "90 × 90 × 45 cm" },
      {
        label: "Materiales",
        value: "Sobre de mármol Patagonia, patas de nogal",
      },
      { label: "Acabado", value: "Mármol pulido, aceite natural en madera" },
      { label: "Peso", value: "42 kg" },
      { label: "Carga máxima", value: "25 kg distribuidos" },
    ],
  },
  {
    id: 6,
    nombre: "Mesa de Noche Aconcagua",
    descripcion:
      "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio.",
    imagen: `${process.env.PUBLIC_URL}/productos/mesa_de_noche_aconcagua.png`,
    precio: 130000,
    destacado: true,
    detalles: [
      { label: "Medidas", value: "45 × 35 × 60 cm" },
      { label: "Materiales", value: "Roble macizo FSC®, herrajes soft-close" },
      { label: "Acabado", value: "Barniz mate de poliuretano" },
      { label: "Almacenamiento", value: "1 cajón + repisa inferior" },
      { label: "Características", value: "Cajón con cierre suave" },
    ],
  },
  {
    id: 7,
    nombre: "Cama Neuquén",
    descripcion:
      "Cama plataforma con cabecero flotante tapizado en lino natural y estructura de madera maciza. Su diseño minimalista y sofisticado crea un ambiente de serenidad y elegancia.",
    imagen: `${process.env.PUBLIC_URL}/productos/cama_neuquen.png`,
    precio: 410000,
    destacado: false,
    detalles: [
      { label: "Medidas", value: "160 × 200 × 90 cm" },
      { label: "Materiales", value: "Roble macizo FSC®, tapizado lino" },
      { label: "Acabado", value: "Aceite natural, tapizado premium" },
      { label: "Colchón", value: "Compatible con colchón 160×200" },
      { label: "Características", value: "Cabecero flotante acolchado" },
    ],
  },
  {
    id: 8,
    nombre: "Sofá Patagonia",
    descripcion:
      "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Los cojines combinan espuma de alta resiliencia con plumón reciclado, ofreciendo comodidad duradera y sostenible.",
    imagen: `${process.env.PUBLIC_URL}/productos/sofa_patagonia.png`,
    precio: 560000,
    destacado: true,
    detalles: [
      { label: "Medidas", value: "220 × 90 × 80 cm" },
      { label: "Estructura", value: "Madera de eucalipto certificada FSC®" },
      { label: "Tapizado", value: "Lino 100% natural premium" },
      { label: "Relleno", value: "Espuma HR + plumón reciclado" },
      { label: "Sostenibilidad", value: "Materiales 100% reciclables" },
    ],
  },
  {
    id: 9,
    nombre: "Mesa Comedor Pampa",
    descripcion:
      "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Se adapta a reuniones de 6 a 10 comensales.",
    imagen: `${process.env.PUBLIC_URL}/productos/mesa_comedor_pampa.png`,
    precio: 450000,
    destacado: false,
    detalles: [
      { label: "Medidas", value: "160-240 × 90 × 75 cm" },
      { label: "Materiales", value: "Roble macizo FSC®, mecanismo alemán" },
      { label: "Acabado", value: "Aceite-cera natural" },
      { label: "Capacidad", value: "6-10 comensales" },
      { label: "Extensión", value: "Sistema de mariposa central" },
    ],
  },
  {
    id: 10,
    nombre: "Sillas Córdoba",
    descripcion:
      "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Ergonomía y durabilidad garantizadas.",
    imagen: `${process.env.PUBLIC_URL}/productos/sillas_cordoba.png`,
    precio: 260000,
    destacado: false,
    detalles: [
      { label: "Medidas", value: "45 × 52 × 80 cm (cada una)" },
      { label: "Materiales", value: "Contrachapado nogal, tubo de acero" },
      { label: "Acabado", value: "Laca mate, pintura epoxi" },
      { label: "Apilables", value: "Hasta 6 sillas" },
      { label: "Incluye", value: "Set de 4 sillas" },
    ],
  },
  {
    id: 11,
    nombre: "Escritorio Costa",
    descripcion:
      "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa.",
    imagen: `${process.env.PUBLIC_URL}/productos/escritorio_costa.png`,
    precio: 180000,
    destacado: false,
    detalles: [
      { label: "Medidas", value: "120 × 60 × 75 cm" },
      { label: "Materiales", value: "Bambú laminado, herrajes ocultos" },
      { label: "Acabado", value: "Laca mate resistente" },
      { label: "Almacenamiento", value: "1 cajón con organizador" },
      { label: "Cables", value: "Pasacables integrado" },
    ],
  },
  {
    id: 12,
    nombre: "Silla de Trabajo Belgrano",
    descripcion:
      "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort.",
    imagen: `${process.env.PUBLIC_URL}/productos/silla_de_trabajo_belgrano.png`,
    precio: 150000,
    destacado: false,
    detalles: [
      { label: "Medidas", value: "60 × 60 × 90-100 cm" },
      { label: "Materiales", value: "Malla técnica, tejido reciclado" },
      { label: "Acabado", value: "Base cromada, tapizado premium" },
      { label: "Regulación", value: "Altura + inclinación respaldo" },
      { label: "Certificación", value: "Ergonomía europea EN 1335" },
    ],
  },
];

module.exports = productos;

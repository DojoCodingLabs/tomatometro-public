import { Candidato } from "@/types";

export const candidatos: Candidato[] = [
  {
    id: "douglas-caamano",
    orden: 1,
    nombre: "Douglas Caamaño",
    partido: "Alianza Costa Rica Primero",
    siglas: "CR1",
    colorPartido: "#1E40AF",
    fotoUrl: "/candidatos/douglas_caamaño.avif"
  },
  {
    id: "ronny-castillo",
    orden: 2,
    nombre: "Ronny Castillo González",
    partido: "Aquí Costa Rica Manda",
    siglas: "ACRM",
    colorPartido: "#7C3AED",
    fotoUrl: "/candidatos/ronny_castillo.avif"
  },
  {
    id: "jose-aguilar",
    orden: 3,
    nombre: "José Aguilar Berrocal",
    partido: "Avanza",
    siglas: "PA",
    colorPartido: "#0891B2",
    fotoUrl: "/candidatos/jose_berrocal.avif"
  },
  {
    id: "ana-virginia-calzada",
    orden: 4,
    nombre: "Ana Virginia Calzada Miranda",
    partido: "Centro Democrático y Social",
    siglas: "CDS",
    colorPartido: "#DB2777",
    fotoUrl: "/candidatos/ana_virginia_calzada.avif"
  },
  {
    id: "claudia-dobles",
    orden: 5,
    nombre: "Claudia Dobles Camargo",
    partido: "Coalición Agenda Ciudadana",
    siglas: "CAC",
    colorPartido: "#D97706",
    fotoUrl: "/candidatos/claudia_dobles.avif"
  },
  {
    id: "david-hernandez",
    orden: 6,
    nombre: "David Hernández Brenes",
    partido: "De la Clase Trabajadora",
    siglas: "PDLCT",
    colorPartido: "#DC2626",
    fotoUrl: "/candidatos/david_hernandez.avif"
  },
  {
    id: "claudio-alpizar",
    orden: 7,
    nombre: "Claudio Alpízar Otoya",
    partido: "Esperanza Nacional",
    siglas: "PEN",
    colorPartido: "#059669",
    fotoUrl: "/candidatos/claudio_alpizar.avif"
  },
  {
    id: "marco-rodriguez",
    orden: 8,
    nombre: "Marco Rodríguez Badilla",
    partido: "Esperanza y Libertad",
    siglas: "PEL",
    colorPartido: "#6366F1",
    fotoUrl: "/candidatos/marco_rodriguez.avif"
  },
  {
    id: "ariel-robles",
    orden: 9,
    nombre: "Andrés Ariel Robles Barrantes",
    partido: "Frente Amplio",
    siglas: "FA",
    colorPartido: "#CA8A04",
    fotoUrl: "/candidatos/ariel_robles.avif"
  },
  {
    id: "luis-amador",
    orden: 10,
    nombre: "Luis Amador Jiménez",
    partido: "Integración Nacional",
    siglas: "PIN",
    colorPartido: "#8B5CF6",
    fotoUrl: "/candidatos/luis_amador.avif"
  },
  {
    id: "walter-hernandez",
    orden: 11,
    nombre: "Walter Rubén Hernández Juárez",
    partido: "Justicia Social Costarricense",
    siglas: "PJSC",
    colorPartido: "#14B8A6",
    fotoUrl: "/candidatos/walter_ruben_hernandez.avif"
  },
  {
    id: "alvaro-ramos",
    orden: 12,
    nombre: "Álvaro Ramos Chaves",
    partido: "Liberación Nacional",
    siglas: "PLN",
    colorPartido: "#16A34A",
    fotoUrl: "/candidatos/alvaro_ramos.avif"
  },
  {
    id: "eli-feinzaig",
    orden: 13,
    nombre: "Eliécer Feinzaig Mintz",
    partido: "Liberal Progresista",
    siglas: "PLP",
    colorPartido: "#F97316",
    fotoUrl: "/candidatos/eliecer_feinzaig.avif"
  },
  {
    id: "fernando-zamora",
    orden: 14,
    nombre: "Fernando Zamora Castellanos",
    partido: "Nueva Generación",
    siglas: "PNG",
    colorPartido: "#10B981",
    fotoUrl: "/candidatos/fernando_zamora.avif"
  },
  {
    id: "fabricio-alvarado",
    orden: 15,
    nombre: "Fabricio Alvarado Muñoz",
    partido: "Nueva República",
    siglas: "PNR",
    colorPartido: "#B91C1C",
    fotoUrl: "/candidatos/fabricio_alvarado.avif"
  },
  {
    id: "luz-mary-alpizar",
    orden: 16,
    nombre: "Luz Mary Alpízar Loaiza",
    partido: "Progreso Social Democrático",
    siglas: "PSD",
    colorPartido: "#0EA5E9",
    fotoUrl: "/candidatos/luz_mary_alpizar.avif"
  },
  {
    id: "laura-fernandez",
    orden: 17,
    nombre: "Laura Fernández Delgado",
    partido: "Pueblo Soberano",
    siglas: "PPSO",
    colorPartido: "#1E3A8A",
    fotoUrl: "/candidatos/laura_fernandez.avif"
  },
  {
    id: "juan-carlos-hidalgo",
    orden: 18,
    nombre: "Juan Carlos Hidalgo Bogantes",
    partido: "Unidad Social Cristiana",
    siglas: "PUSC",
    colorPartido: "#2563EB",
    fotoUrl: "/candidatos/juan_carlos_hidalgo.avif"
  },
  {
    id: "natalia-diaz",
    orden: 19,
    nombre: "Natalia Díaz Quintana",
    partido: "Unidos Podemos",
    siglas: "UP",
    colorPartido: "#EC4899",
    fotoUrl: "/candidatos/natalia_diaz.avif"
  },
  {
    id: "boris-molina",
    orden: 20,
    nombre: "Boris Molina Acevedo",
    partido: "Unión Costarricense Democrática",
    siglas: "PUCD",
    colorPartido: "#78716C",
    fotoUrl: "/candidatos/boris_molina.avif"
  }
];

export function getCandidatoById(id: string): Candidato | undefined {
  return candidatos.find(c => c.id === id);
}

export function getCandidatoByOrden(orden: number): Candidato | undefined {
  return candidatos.find(c => c.orden === orden);
}

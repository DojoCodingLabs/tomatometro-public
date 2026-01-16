export interface Debate {
  id: string;
  titulo: string;
  organizador: string;
  descripcion: string;
  fecha: string; // ISO date string with timezone
  duracionMinutos: number;
  candidatos: string[]; // Array of candidato IDs
  transmision: string;
}

export const debates: Debate[] = [
  // TSE Official Debates (Past)
  {
    id: "tse-noche-4",
    titulo: "Debate TSE - Noche 4",
    organizador: "Tribunal Supremo de Elecciones",
    descripcion: "Cuarta noche de presentaciones del TSE",
    fecha: "2026-01-12T19:00:00-06:00",
    duracionMinutos: 120,
    candidatos: [
      "alvaro-ramos",
      "douglas-caamano",
      "luis-amador",
      "ariel-robles",
      "juan-carlos-hidalgo",
    ],
    transmision: "Canal 13, Canal 15",
  },

  // National Debates
  {
    id: "opa-canal38",
    titulo: "Debate OPA - Se Busca Presidente",
    organizador: "Grupo OPA / Canal 38",
    descripcion: "Debate con expertos evaluando viabilidad de propuestas. Top 5 encuestas (sin Laura Fernandez)",
    fecha: "2026-01-18T18:30:00-06:00",
    duracionMinutos: 150,
    candidatos: [
      "alvaro-ramos",
      "claudia-dobles",
      "ariel-robles",
      "juan-carlos-hidalgo",
      "eli-feinzaig",
    ],
    transmision: "Canal 38, redes sociales Grupo OPA",
  },
  {
    id: "ucr-electoral",
    titulo: "Debate UCR Electoral 2026",
    organizador: "Universidad de Costa Rica",
    descripcion: "Debate academico con 17 candidatos. Temas: educacion, seguridad social, seguridad ciudadana",
    fecha: "2026-01-19T18:00:00-06:00",
    duracionMinutos: 180,
    candidatos: [
      "alvaro-ramos",
      "claudia-dobles",
      "ariel-robles",
      "juan-carlos-hidalgo",
      "eli-feinzaig",
      "fabricio-alvarado",
      "natalia-diaz",
      "jose-aguilar",
      "claudio-alpizar",
      "luis-amador",
      "ana-virginia-calzada",
      "marco-rodriguez",
      "douglas-caamano",
      "ronny-castillo",
      "walter-hernandez",
      "boris-molina",
      "fernando-zamora",
    ],
    transmision: "Canal Quince UCR, Radioemisoras UCR",
  },
  {
    id: "extra-cfia",
    titulo: "Debate Construyamos Pais",
    organizador: "Grupo Extra / CFIA",
    descripcion: "Debate sobre infraestructura y desarrollo nacional",
    fecha: "2026-01-20T19:00:00-06:00",
    duracionMinutos: 120,
    candidatos: [
      "alvaro-ramos",
      "claudia-dobles",
      "ariel-robles",
      "juan-carlos-hidalgo",
      "eli-feinzaig",
      "fabricio-alvarado",
      "natalia-diaz",
    ],
    transmision: "Extra TV, Radio 92.3 FM",
  },
  {
    id: "trivision",
    titulo: "Debate Trivision",
    organizador: "Trivision",
    descripcion: "Debate matutino con Laura Fernandez confirmada",
    fecha: "2026-01-21T09:00:00-06:00",
    duracionMinutos: 120,
    candidatos: [
      "laura-fernandez",
      "alvaro-ramos",
      "claudia-dobles",
      "ariel-robles",
      "juan-carlos-hidalgo",
    ],
    transmision: "Canal Trivision",
  },
  {
    id: "columbia",
    titulo: "Debate Radio Columbia",
    organizador: "Grupo Columbia",
    descripcion: "Debate con top 5 encuestas incluyendo Laura Fernandez",
    fecha: "2026-01-26T18:00:00-06:00",
    duracionMinutos: 120,
    candidatos: [
      "laura-fernandez",
      "alvaro-ramos",
      "claudia-dobles",
      "ariel-robles",
      "juan-carlos-hidalgo",
    ],
    transmision: "Radio Columbia 98.7 FM",
  },
  {
    id: "repretel-nacional",
    titulo: "Debate Nacional Repretel-Monumental",
    organizador: "Repretel / Radio Monumental",
    descripcion: "Debate nacional con 8 candidatos confirmados",
    fecha: "2026-01-27T19:30:00-06:00",
    duracionMinutos: 150,
    candidatos: [
      "alvaro-ramos",
      "laura-fernandez",
      "claudia-dobles",
      "ariel-robles",
      "juan-carlos-hidalgo",
      "eli-feinzaig",
      "natalia-diaz",
      "fabricio-alvarado",
    ],
    transmision: "Canal 6, Radio Monumental 93.5 FM",
  },
  {
    id: "teletica",
    titulo: "Debate Teletica Canal 7",
    organizador: "Teletica",
    descripcion: "Debate con top 4 encuestas. Laura Fernandez declino participar",
    fecha: "2026-01-29T20:00:00-06:00",
    duracionMinutos: 120,
    candidatos: [
      "alvaro-ramos",
      "claudia-dobles",
      "ariel-robles",
      "juan-carlos-hidalgo",
    ],
    transmision: "Canal 7",
  },
];

export function getDebateById(id: string): Debate | undefined {
  return debates.find((d) => d.id === id);
}

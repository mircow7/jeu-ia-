// Réglages de Cueillette Orbitale.
// Modifie ces valeurs pour équilibrer le jeu sans toucher au reste du code.

const LARGEUR = 480; // largeur logique du canvas
const HAUTEUR = 720; // hauteur logique du canvas

// Types d'objets qui tombent.
const CRISTAL = "cristal";
const BOMBE = "bombe";
const DORE = "dore";
const GLACE = "glace";
const BOUCLIER = "bouclier";

const COULEURS = {
  fond: "#05030f",
  cyan: "#3dffa8",
  magenta: "#ff8c42",
  or: "#ffd166",
  rouge: "#ff4d6d",
  glace: "#c9b8ff",
  blanc: "#f5f7ff",
  grille: "rgba(61, 255, 168, 0.16)"
};

const REGLAGES = {
  viesDepart: 3,
  vitessePanier: 560,    // pixels par seconde au clavier
  vitesseChute: 145,     // vitesse du premier niveau
  vitesseChuteMax: 430,
  intervalleObjet: 0.95, // secondes entre deux objets
  intervalleMin: 0.34,
  dureeNiveau: 18,       // secondes avant d'accélérer
  dureeCombo: 3,         // secondes pour enchaîner
  multiplicateurMax: 5,
  hasardBombe: 0.14,
  hasardDore: 0.05,
  hasardGlace: 0.025,
  hasardBouclier: 0.02,  // chance qu'un objet soit un bouclier   // plus rare que le doré
  dureeGlace: 4,         // secondes de ralentissement
  ralentiGlace: 0.35,    // part de la vitesse gardée pendant la glace
  largeurPanier: 96,
  hauteurPanier: 16,
  margePanier: 12
};

const CLE_RECORD = "pluieDeNeonRecord";

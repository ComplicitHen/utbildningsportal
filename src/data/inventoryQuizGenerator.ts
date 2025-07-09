// Script för att generera quiz-frågor från inventering
import { completeInventory } from './completeInventory';

export interface InventoryItem {
  name: string;
  location: string;
  category: string;
  checkType?: 'visual' | 'functional' | 'date' | 'level' | 'number';
  details?: string;
  quantity?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Använd den kompletta inventarielistan
export const inventoryData: InventoryItem[] = completeInventory;

// Generator för quiz-frågor
export function generateQuizQuestions(count: number = 20): QuizQuestion[] {
  const questionTemplates = [
    {
      type: "location",
      template: "Var finns {item}?",
      generateOptions: (item: InventoryItem) => [
        item.location,
        getRandomLocation(item.location),
        getRandomLocation(item.location),
        getRandomLocation(item.location)
      ],
      correctIndex: 0
    },
    {
      type: "quantity",
      template: "Hur många {item} finns det?",
      filter: (item: InventoryItem) => item.quantity && item.quantity > 1,
      generateOptions: (item: InventoryItem) => [
        `${item.quantity} st`,
        `${item.quantity! - 1} st`,
        `${item.quantity! + 1} st`,
        `${item.quantity! + 2} st`
      ],
      correctIndex: 0
    },
    {
      type: "category",
      template: "I vilken kategori hör {item}?",
      generateOptions: (item: InventoryItem) => [
        getCategoryName(item.category),
        getRandomCategory(item.category),
        getRandomCategory(item.category),
        getRandomCategory(item.category)
      ],
      correctIndex: 0
    },
    {
      type: "check",
      template: "Vad ska kontrolleras på {item}?",
      filter: (item: InventoryItem) => item.checkType && item.details,
      generateOptions: (item: InventoryItem) => {
        const correctCheck = getCheckDescription(item.checkType!, item.details!);
        return [
          correctCheck,
          getRandomCheck(),
          getRandomCheck(),
          getRandomCheck()
        ];
      },
      correctIndex: 0
    }
  ];

  // Välj slumpmässiga items och generera frågor
  const shuffledItems = [...inventoryData].sort(() => Math.random() - 0.5);
  const questions: QuizQuestion[] = [];

  for (let i = 0; i < Math.min(count, shuffledItems.length * 2); i++) {
    const item = shuffledItems[i % shuffledItems.length];
    const availableTemplates = questionTemplates.filter(t => 
      !t.filter || t.filter(item)
    );
    
    if (availableTemplates.length > 0) {
      const template = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
      const options = template.generateOptions(item);
      
      questions.push({
        id: `generated-${i}`,
        question: template.template.replace('{item}', item.name),
        options: shuffleArray(options),
        correctAnswer: findCorrectIndex(options, options[template.correctIndex]),
        explanation: generateExplanation(item, template.type)
      });
    }
  }

  return questions.slice(0, count);
}

// Hjälpfunktioner
function getRandomLocation(excludeLocation: string): string {
  const locations = [
    "Fack 1", "Fack 2", "Fack 3", "Fack 4", "Fack 5", "Fack 6", "Fack 7", "Fack 8",
    "Hytt utsida vänster", "Hytt utsida höger", "Taklåda", "Under fack 1", "Under fack 3"
  ];
  const filtered = locations.filter(loc => !excludeLocation.includes(loc) && loc !== excludeLocation);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function getCategoryName(category: string): string {
  const categoryNames: { [key: string]: string } = {
    dimspikset: "Dimspiksutrustning",
    rh_pusher: "RH Pusher-utrustning",
    strålrör: "Strålrör och munstycken",
    verktyg: "Verktyg",
    lyftkudde: "Lyftkuddsutrustning",
    hytt: "Hyttutrustning",
    slangar: "Slangar",
    kopplingar: "Kopplingar",
    tätning: "Tätningsmaterial",
    skogsbrand: "Skogsbrandsutrustning",
    skydd: "Skyddsutrustning",
    säkerhet: "Säkerhetsutrustning",
    släckning: "Släckutrustning",
    räddning: "Räddningsutrustning",
    forcering: "Forceringsutrustning",
    hydraulik: "Hydraulikutrustning",
    lyft: "Lyftutrustning",
    rökdykning: "Rökdykningsutrustning",
    ledning: "Ledningsutrustning",
    filter: "Filtersystem",
    material: "Material och förbrukning",
    kemikalier: "Kemikalier",
    bränsle: "Bränsle"
  };
  return categoryNames[category] || category;
}

function getRandomCategory(excludeCategory: string): string {
  const categories = [
    "Dimspiksutrustning", "RH Pusher-utrustning", "Strålrör och munstycken",
    "Verktyg", "Lyftkuddsutrustning", "Hyttutrustning", "Slangar",
    "Kopplingar", "Tätningsmaterial", "Skogsbrandsutrustning",
    "Skyddsutrustning", "Säkerhetsutrustning", "Släckutrustning",
    "Räddningsutrustning", "Forceringsutrustning", "Hydraulikutrustning",
    "Lyftutrustning", "Rökdykningsutrustning", "Ledningsutrustning"
  ];
  const targetCategory = getCategoryName(excludeCategory);
  const filtered = categories.filter(cat => cat !== targetCategory);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function getCheckDescription(checkType: string, details?: string): string {
  const checkDescriptions: { [key: string]: string } = {
    visual: "Visuell kontroll",
    functional: "Funktionskontroll", 
    date: "Datumkontroll",
    level: "Nivåkontroll",
    number: "Antal kontroll"
  };
  
  if (details) {
    return `${checkDescriptions[checkType] || checkType}: ${details}`;
  }
  return checkDescriptions[checkType] || checkType;
}

function getRandomCheck(): string {
  const checks = [
    "Visuell kontroll: kontrollera skador",
    "Funktionskontroll: testa funktion",
    "Datumkontroll: kontrollera utgångsdatum",
    "Nivåkontroll: kontrollera vätskennivå",
    "Antal kontroll: räkna antal",
    "Tryckontroll: kontrollera tryck",
    "Rengöring: rengör utrustning"
  ];
  return checks[Math.floor(Math.random() * checks.length)];
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function findCorrectIndex<T>(shuffledOptions: T[], correctOption: T): number {
  return shuffledOptions.findIndex(option => option === correctOption);
}

function generateExplanation(item: InventoryItem, questionType: string): string {
  switch (questionType) {
    case "location":
      return `${item.name} förvaras i ${item.location}.`;
    case "quantity":
      return `Det finns ${item.quantity} st ${item.name} i ${item.location}.`;
    case "category":
      return `${item.name} tillhör kategorin ${getCategoryName(item.category)}.`;
    case "check":
      if (item.checkType && item.details) {
        return `${item.name} ska kontrolleras genom ${getCheckDescription(item.checkType, item.details)}.`;
      }
      return `${item.name} kräver särskild kontroll enligt instruktioner.`;
    default:
      return `${item.name} finns i ${item.location}.`;
  }
}

// Funktion för att generera quiz baserat på specifik kategori
export function generateCategoryQuiz(category: string, count: number = 20): QuizQuestion[] {
  const categoryItems = inventoryData.filter(item => item.category === category);
  if (categoryItems.length === 0) return [];
  
  // Använd bara items från den specifika kategorin
  const filteredData = inventoryData;
  const originalData = inventoryData;
  
  // Temporärt byt ut data
  (global as any).tempInventoryData = inventoryData;
  inventoryData.length = 0;
  inventoryData.push(...categoryItems);
  
  const questions = generateQuizQuestions(count);
  
  // Återställ data
  inventoryData.length = 0;
  inventoryData.push(...originalData);
  
  return questions;
}

// Funktion för att generera quiz baserat på specifikt fack
export function generateLocationQuiz(location: string, count: number = 20): QuizQuestion[] {
  const locationItems = inventoryData.filter(item => 
    item.location.toLowerCase().includes(location.toLowerCase())
  );
  if (locationItems.length === 0) return [];
  
  return generateQuizQuestions(count);
}

// Statistik om inventariet
export function getInventoryStats() {
  const totalItems = inventoryData.length;
  const categoryCounts = inventoryData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });
  
  const locationCounts = inventoryData.reduce((acc, item) => {
    acc[item.location] = (acc[item.location] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });
  
  return {
    totalItems,
    categoryCounts,
    locationCounts,
    itemsWithQuantity: inventoryData.filter(item => item.quantity).length,
    itemsWithChecks: inventoryData.filter(item => item.checkType).length
  };
}

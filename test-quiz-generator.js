// Test script för inventarie-quiz-generatorn
import { generateQuizQuestions, getInventoryStats } from './src/data/inventoryQuizGenerator.js';

console.log('🚒 Testing Inventory Quiz Generator...\n');

// Testa statistik
const stats = getInventoryStats();
console.log('📊 Inventory Statistics:');
console.log(`Total items: ${stats.totalItems}`);
console.log(`Items with quantity: ${stats.itemsWithQuantity}`);
console.log(`Items with checks: ${stats.itemsWithChecks}`);
console.log(`Categories: ${Object.keys(stats.categoryCounts).length}`);
console.log(`Locations: ${Object.keys(stats.locationCounts).length}\n`);

// Testa quizgenerering
console.log('🎯 Generating sample quiz questions...\n');
const questions = generateQuizQuestions(5);

questions.forEach((q, index) => {
  console.log(`Question ${index + 1}: ${q.question}`);
  q.options.forEach((opt, optIndex) => {
    const marker = optIndex === q.correctAnswer ? '✅' : '  ';
    console.log(`${marker} ${opt}`);
  });
  console.log(`💡 ${q.explanation}\n`);
});

console.log('✅ Quiz generator test completed!');

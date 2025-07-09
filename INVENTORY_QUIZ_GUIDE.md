# 🚒 Inventarie-quiz System - Guide

## Översikt
Det nya inventarie-quizsystemet ger dig tillgång till **200+ föremål** från hela inventarielistan för brandbil 6510. Varje gång du startar ett quiz får du **helt nya slumpmässiga frågor**!

## Funktioner

### 🎯 Komplett Inventariequiz 6510
- **200+ föremål** från alla fack, hytt, taklåda
- **Dynamiskt genererade frågor** - nya varje gång
- **Flexibel antal frågor**: 10, 20, 30, 50, 100 eller 200 frågor
- **4 olika frågetyper**:
  1. **Placering**: "Var finns [föremål]?"
  2. **Antal**: "Hur många [föremål] finns det?"
  3. **Kategori**: "I vilken kategori hör [föremål]?"
  4. **Kontroll**: "Vad ska kontrolleras på [föremål]?"

### 🔄 Randomisering
- **Slumpmässiga frågor** från hela inventariet
- **Blandade svarsalternativ** för varje fråga
- **Unika quiz** varje gång du startar

### 📊 Statistik & Resultat
- Alla resultat sparas i Firebase
- Leaderboard med alla quiz-resultat
- Personlig statistik och framsteg

## Så här använder du systemet

### 1. Starta ett Inventarie-quiz
1. Gå till **Utbildningsområden** → **Fordonskännedom 6510**
2. Välj **🚒 Komplett Inventariequiz 6510**
3. Välj antal frågor (10-200)
4. Klicka **Starta Quiz**

### 2. Anpassa svårighetsgrad
- **10-20 frågor**: Snabb repetition
- **30-50 frågor**: Normalt träningspass
- **100+ frågor**: Intensiv träning och förberedelse
- **200 frågor**: Fullständig inventariekontroll

### 3. Förbättra dina resultat
- **80% godkänt** - utmana dig själv!
- Varje fel visar **förklaring** med korrekt svar
- Använd **tips** för att lära dig mer

## Teknisk implementation

### Datakällor
- **Hårdkodade i projektet** (snabbare, inga nätverksproblem)
- Baserat på officiell inventarielista 2025-03-31
- Uppdateras via kod-deployment

### Fördelar med hårdkodning
✅ **Snabbt** - inga API-anrop  
✅ **Tillförlitligt** - fungerar offline  
✅ **Konsistent** - samma data för alla  
✅ **Versionskontroll** - spårbara ändringar  

### Framework
- React + TypeScript
- Firebase för användardata och resultat
- Netlify för hosting och deployment

## 📈 Statistik om inventariet
- **200+ unika föremål**
- **25+ kategorier** (verktyg, strålrör, säkerhet, etc.)
- **15+ platser** (Fack 1-8, Hytt, Taklåda, etc.)
- **Kontrollpunkter** för funktions- och säkerhetskontroll

## Framtida förbättringar
- [ ] Kategori-specifika quiz (t.ex. bara "Verktyg")
- [ ] Plats-specifika quiz (t.ex. bara "Fack 4")
- [ ] Tidspress-läge för snabbare träning
- [ ] Felanalys och svaga områden
- [ ] Team-challenges och jämförelser

## Support
Hör av dig om du hittar fel i inventarielistan eller har förslag på förbättringar!

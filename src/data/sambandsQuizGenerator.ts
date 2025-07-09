// Quiz-generator för samband vid räddningsinsats
// Baserat på RSG:s instruktion för samband vid räddningsinsats

export interface SambandsQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'advanced' | 'expert';
  category: string;
}

// LÄTTA FRÅGOR (30 st) - Grundläggande kunskaper för räddningstjänstpersonal
export const easyQuestions: SambandsQuizQuestion[] = [
  {
    id: "easy-1",
    question: "Vad heter RSG:s ledningscentral när de kommunicerar via radio?",
    options: ["RSG-50", "RSG-51", "RSG-52", "LC-51"],
    correctAnswer: 1,
    explanation: "RSG:s ledningscentral (LC) har anropsnamn RSG-51 vid radiosamband.",
    difficulty: "easy",
    category: "grundläggande"
  },
  {
    id: "easy-2",
    question: "Vilken talgrupp används för kontakt med LC vid alla tillfällen förutom vid händelse?",
    options: ["RSG Status", "RSG Info", "RSG Ledning", "RSG Central"],
    correctAnswer: 1,
    explanation: "Talgruppen RSG Info används för kontakt med LC vid alla tillfällen förutom vid händelse där resursen har blivit tilldelad annan talgrupp.",
    difficulty: "easy",
    category: "grundläggande"
  },
  {
    id: "easy-3",
    question: "Vad betyder förkortningen CBR?",
    options: ["Central Base Radio", "Callback Request", "Communication Base Report", "Central Backup Radio"],
    correctAnswer: 1,
    explanation: "CBR står för Callback Request - en samtalsbegäran som skickas från Rakelterminal till KC.",
    difficulty: "easy",
    category: "grundläggande"
  },
  {
    id: "easy-4",
    question: "Vilken knapp på Rakelterminalen används för nödlägesfunktion?",
    options: ["Den gröna knappen", "Den blå knappen", "Den orange/röda knappen", "Den gula knappen"],
    correctAnswer: 2,
    explanation: "Nödlägesfunktionen aktiveras med den orange/röda knappen på terminalen eller monofonen.",
    difficulty: "easy",
    category: "nödläge"
  },
  {
    id: "easy-5",
    question: "Vad ska resurser göra efter avslutad insats när terminalen lämnas obevakad?",
    options: ["Stänga av terminalen", "Ställa på RSG info, stationstalgrupp eller tyst passning", "Låsa terminalen", "Sätta på laddning"],
    correctAnswer: 1,
    explanation: "Efter avslutad insats ska terminalen vara inställd på RSG info, stationstalgrupp eller tyst passning när den lämnas obevakad.",
    difficulty: "easy",
    category: "säkerhet"
  },
  {
    id: "easy-6",
    question: "Hur presenterar sig resurser när de kommunicerar med andra RSG-enheter?",
    options: ["Endast resursnummer", "Station och de fyra sista Rakelsiffrorna", "Fullt namn och station", "Endast stationsnamn"],
    correctAnswer: 1,
    explanation: "Resurser adresserar och presenterar sig med station och de fyra sista Rakelsiffrorna, ex Gårda 12–10.",
    difficulty: "easy",
    category: "kommunikation"
  },
  {
    id: "easy-7",
    question: "Vad betyder status 'U' i ärendestatus?",
    options: ["Uppfattat", "Under transport", "Kvittera uppdrag", "Utryckning"],
    correctAnswer: 2,
    explanation: "Status 'U' betyder Kvittera uppdrag - resursen är på väg mot tilldelad insats och lyssnar på tilldelad samverkanstalgrupp.",
    difficulty: "easy",
    category: "status"
  },
  {
    id: "easy-8",
    question: "Vad betyder status 'F' i ärendestatus?",
    options: ["Färdig", "Framme", "Förstärkning", "Fullbemanning"],
    correctAnswer: 1,
    explanation: "Status 'F' betyder Framme - resursen är framme på adressen/brytpunkt.",
    difficulty: "easy",
    category: "status"
  },
  {
    id: "easy-9",
    question: "Vilken typ av radio används främst för kommunikation mellan brandmän och styrkeledare på skadeplats?",
    options: ["Rakel", "Rökdykradio", "VHF", "Kanal 96"],
    correctAnswer: 1,
    explanation: "Rökdykradio används främst för kommunikation mellan brandmän och styrkeledare på skadeplats.",
    difficulty: "easy",
    category: "radiosystem"
  },
  {
    id: "easy-10",
    question: "Vad kallas den första rapporten som lämnas när första enheten kommer fram till skadeplatsen?",
    options: ["Statusrapport", "Framkomstrapport/Vindruterapport", "Lägesrapport", "Ankomstrapport"],
    correctAnswer: 1,
    explanation: "Först anlända enhet ska lämna en framkomstrapport, även kallad vindruterapport, på tilldelad samverkanstalgrupp.",
    difficulty: "easy",
    category: "rapportering"
  },
  {
    id: "easy-11",
    question: "Vad ska vindruteraporten innehålla enligt OSH-principen?",
    options: ["Organisation, Styrka, Hjälp", "Område, Samband, Hot", "Objekt, Skada, Hot", "Överblick, Situation, Hjälpbehov"],
    correctAnswer: 2,
    explanation: "Vindruteraporten ska innehålla första intrycket enligt OSH: Objekt, Skada, Hot.",
    difficulty: "easy",
    category: "rapportering"
  },
  {
    id: "easy-12",
    question: "Vad betyder status 'DR' i resursstatus?",
    options: ["Disponibel Radio", "Disponibel på Radio", "Direkt Radio", "Disponibel Rakel"],
    correctAnswer: 1,
    explanation: "Status 'DR' betyder Disponibel på Radio - resursen är redo för insats och befinner sig utanför station.",
    difficulty: "easy",
    category: "status"
  },
  {
    id: "easy-13",
    question: "Hur kvitterar resurser information som de uppfattat?",
    options: ["Roger", "Uppfattat", "OK", "Klart"],
    correctAnswer: 1,
    explanation: "Information som uppfattas kvitteras med 'Uppfattat'. Repetition av information ska undvikas.",
    difficulty: "easy",
    category: "kommunikation"
  },
  {
    id: "easy-14",
    question: "Vilken kanal används som redundant sambandsteknik mellan LC och resurser?",
    options: ["Kanal 95", "Kanal 96", "Kanal 97", "Kanal 98"],
    correctAnswer: 1,
    explanation: "Radio för radionät kanal 96 används som redundant sambandsteknik för kommunikation mellan LC och resurser.",
    difficulty: "easy",
    category: "radiosystem"
  },
  {
    id: "easy-15",
    question: "Vad betyder DMO i Rakel-sammanhang?",
    options: ["Direct Mode Operation", "Dispatch Mode Operation", "Digital Mode Operation", "Data Mode Operation"],
    correctAnswer: 0,
    explanation: "DMO står för Direct Mode Operation - kommunikation mellan Rakelterminaler utan att gå via Rakelnätet.",
    difficulty: "easy",
    category: "teknisk"
  },
  {
    id: "easy-16",
    question: "När ska nödlägesfunktionen användas?",
    options: ["Vid alla akuta situationer", "Vid tekniska problem", "Vid nöd, hot eller våldssituationer", "Vid kommunikationsproblem"],
    correctAnswer: 2,
    explanation: "Nödlägesfunktionen används vid nöd, hot eller våldssituationer.",
    difficulty: "easy",
    category: "nödläge"
  },
  {
    id: "easy-17",
    question: "Vad kallas den information som LC ger till enheter under framkörning?",
    options: ["Lägesinformation", "Totalinfo", "Framkörningsinfo", "Händelseinfo"],
    correctAnswer: 1,
    explanation: "LC ansvarar för att ge totalinfo - samlad information om händelsen till enheter under framkörning.",
    difficulty: "easy",
    category: "information"
  },
  {
    id: "easy-18",
    question: "Vilka två huvudsystem använder RSG för talkommunikation?",
    options: ["Rakel och VHF", "Rakel och sektorradio", "VHF och mobiltelefoni", "Sektorradio och kanal 96"],
    correctAnswer: 1,
    explanation: "RSG har två huvudsystem för talkommunikation: Rakel och sektorradio (rökdykradio).",
    difficulty: "easy",
    category: "radiosystem"
  },
  {
    id: "easy-19",
    question: "Vad står PTT för?",
    options: ["Press To Talk", "Push To Transmit", "Press To Transmit", "Push To Talk"],
    correctAnswer: 3,
    explanation: "PTT står för Push To Talk - knappen som trycks in för att sända med radion.",
    difficulty: "easy",
    category: "teknisk"
  },
  {
    id: "easy-20",
    question: "Hur presenterar sig RSG-resurser när de kommunicerar med andra organisationer?",
    options: ["Station och nummer", "Räddning och de fyra sista siffrorna", "RSG och stationsnamn", "Endast resursnummer"],
    correctAnswer: 1,
    explanation: "Vid kommunikation med annan organisation presenterar sig resurser med organisationstillhörighet och de fyra sista Rakelsiffrorna, ex Räddning 12–10.",
    difficulty: "easy",
    category: "kommunikation"
  },
  {
    id: "easy-21",
    question: "Vad betyder status 'H' i ärendestatus?",
    options: ["Hjälp behövs", "Hemåt", "Håller position", "Har ankommit"],
    correctAnswer: 1,
    explanation: "Status 'H' betyder Hemåt - resursen lämnar insatsen och åker mot station.",
    difficulty: "easy",
    category: "status"
  },
  {
    id: "easy-22",
    question: "Vilken organisation ansvarar för Rakelsystemet?",
    options: ["SOS Alarm", "MSB", "Polismyndigheten", "Försvarsmakten"],
    correctAnswer: 1,
    explanation: "Myndigheten för samhällsskydd och beredskap (MSB) är ansvarig för Rakelsystemet.",
    difficulty: "easy",
    category: "grundläggande"
  },
  {
    id: "easy-23",
    question: "Vad ska göras vid förlust av Rakel-utrustning?",
    options: ["Rapporteras nästa dag", "Anmäls omedelbart till Vakthavande befäl", "Anmäls till MSB", "Dokumenteras i loggbok"],
    correctAnswer: 1,
    explanation: "Förlust av utrustning ska omedelbart anmälas till Vakthavande befäl.",
    difficulty: "easy",
    category: "säkerhet"
  },
  {
    id: "easy-24",
    question: "Vad används för att kvittera larm?",
    options: ["Muntlig kvittens", "Ärendestatus", "Resursstatus", "CBR"],
    correctAnswer: 1,
    explanation: "Resurser kvitterar larm genom att sända ärendestatus till LC.",
    difficulty: "easy",
    category: "larm"
  },
  {
    id: "easy-25",
    question: "Vilken rökdykradio-kanal används vid IVPA?",
    options: ["Kanal 11", "Kanal 12", "Kanal 13", "Kanal 14"],
    correctAnswer: 2,
    explanation: "Kanal 13 används av alla stationer vid IVPA och är krypterad.",
    difficulty: "easy",
    category: "radiosystem"
  },
  {
    id: "easy-26",
    question: "Vad står RAPS för?",
    options: ["Radio Alarm Police System", "Regional Alarm och Policysystem", "Räddningsalarm Polissystem", "Regional Alarm Prioritetsystem"],
    correctAnswer: 0,
    explanation: "RAPS är en samverkanstalgrupp som används för samverkan mellan organisationer.",
    difficulty: "easy",
    category: "samverkan"
  },
  {
    id: "easy-27",
    question: "Vilket dokument kompletterar denna instruktion från MSB?",
    options: ["Rakel användarmanual", "Nationella riktlinjer för samverkan i Rakel", "Räddningstjänstlagen", "Kommunikationsförordningen"],
    correctAnswer: 1,
    explanation: "Instruktionen kompletteras av MSB:s dokument 'Nationella riktlinjer för samverkan i Rakel'.",
    difficulty: "easy",
    category: "grundläggande"
  },
  {
    id: "easy-28",
    question: "Vad betyder status 'K' i ärendestatus?",
    options: ["Kontakt", "Klar", "Klar disponibel", "Kvittens"],
    correctAnswer: 2,
    explanation: "Status 'K' betyder Klar disponibel - resursen är klar på insatsen och hemma på station.",
    difficulty: "easy",
    category: "status"
  },
  {
    id: "easy-29",
    question: "Hur lång räckvidd har rökdykradio ungefär?",
    options: ["Obegränsad", "Inom ett mindre geografiskt område", "Hela Sverige", "Hela Göteborg"],
    correctAnswer: 1,
    explanation: "Rökdykradio har begränsad räckvidd och kan användas inom ett mindre geografiskt område.",
    difficulty: "easy",
    category: "radiosystem"
  },
  {
    id: "easy-30",
    question: "Vad ska alltid tillämpas vid radiokommunikation?",
    options: ["Snabb kommunikation", "Hög volym", "God radiodisciplin", "Frekventa upprop"],
    correctAnswer: 2,
    explanation: "Utgångspunkten är att alltid tillämpa god radiodisciplin vid radiokommunikation.",
    difficulty: "easy",
    category: "kommunikation"
  }
];

// AVANCERADE FRÅGOR (30 st) - Fördjupad kunskap om samband och procedurer
export const advancedQuestions: SambandsQuizQuestion[] = [
  {
    id: "advanced-1",
    question: "Vilka talgrupper tilldelar LC vid utlarmning till räddningsinsats?",
    options: ["Endast insatstalgrupp", "Samverkanstalgrupp RAPS och vid behov gruppkombinering", "Endast RAPS", "Ledningstalgrupp och RAPS"],
    correctAnswer: 1,
    explanation: "LC tilldelar samverkanstalgrupp RAPS och utför vid behov gruppkombinering vid utlarmning till räddningsinsats.",
    difficulty: "advanced",
    category: "sambandsplanering"
  },
  {
    id: "advanced-2",
    question: "Vilka enheter ska normalt kvittera totalinfo muntligt?",
    options: ["Alla larmade enheter", "Först beräknade anländande enheter samt högre ledningsfunktioner", "Endast räddningsledaren", "Alla enheter på RAPS"],
    correctAnswer: 1,
    explanation: "LC begär muntlig kvittens av totalinfo från först beräknade anländande enheter samt högre ledningsfunktioner.",
    difficulty: "advanced",
    category: "information"
  },
  {
    id: "advanced-3",
    question: "När får säkerhetskänslig information inte röjas i Rakelnätet?",
    options: ["Aldrig", "Vid kommunikation i Rakelnätet", "Endast på RAPS", "Endast på insatstalgrupper"],
    correctAnswer: 1,
    explanation: "Vid kommunikation i Rakelnätet får inte säkerhetskänslig information röjas enligt MSB:s allmänna villkor.",
    difficulty: "advanced",
    category: "säkerhet"
  },
  {
    id: "advanced-4",
    question: "Vilken talgruppsserie används för ledningstalgrupper i Västra Götaland?",
    options: ["250 RtjIns 1-9", "250 RtjLed 1-9", "251 RtjLed 1-9", "VGöt Led 1-9"],
    correctAnswer: 1,
    explanation: "För räddningsledning används talgrupper från serien 250 RtjLed 1-9 i Västra Götaland.",
    difficulty: "advanced",
    category: "talgrupper"
  },
  {
    id: "advanced-5",
    question: "Vad händer naturligt när VGöt RAPS 60 tilldelas?",
    options: ["Ingenting särskilt", "Insatstalgrupp 251 RtjIns60 medföljer", "Ledningstalgrupp aktiveras", "DMO aktiveras"],
    correctAnswer: 1,
    explanation: "Vid tilldelning av samverkanstalgrupp RAPS medföljer naturligt en räddningstjänst insatstalgrupp enligt RAPS numrering, ex VGöt RAPS 60 medföljer 251 RtjIns60.",
    difficulty: "advanced",
    category: "talgrupper"
  },
  {
    id: "advanced-6",
    question: "Hur ska resurser agera vid utebliven talgrupp i ärendeutskick?",
    options: ["Vänta på ny utlarmning", "Kontakta LC på RSG info, i andra hand via telefon", "Åka direkt till adressen", "Använda standardtalgrupp"],
    correctAnswer: 1,
    explanation: "Vid utebliven talgrupp ska LC kontaktas i första hand på talgrupp RSG info, i andra hand via telefon.",
    difficulty: "advanced",
    category: "problem"
  },
  {
    id: "advanced-7",
    question: "Vad innebär gruppkombinering av talgrupper?",
    options: ["Att skapa nya talgrupper", "Att sammankoppla talgrupper så användare tillfälligt får behörighet", "Att radera talgrupper", "Att öka volymen"],
    correctAnswer: 1,
    explanation: "Genom gruppkombinering kan KC sammankoppla talgrupper så användare tillfälligt får behörighet att tala och lyssna på en talgrupp.",
    difficulty: "advanced",
    category: "teknisk"
  },
  {
    id: "advanced-8",
    question: "I vilken turordning ska anrop från samverkande organisationer besvaras?",
    options: ["LC först", "Högsta ledningsnivå först", "Först anländande ledningsfunktion, sedan högre ledningsnivå, sedan LC", "Räddningsledaren"],
    correctAnswer: 2,
    explanation: "Turordning: först anländande ledningsfunktion (ofta styrkeledare), vid behov högre ledningsnivå (IL/RIL), sedan LC om ingen annan svarar.",
    difficulty: "advanced",
    category: "samverkan"
  },
  {
    id: "advanced-9",
    question: "Hur länge ska det gå mellan status K och DR när resurs lämnar insats för annan aktivitet?",
    options: ["5 sekunder", "10 sekunder", "Minst 15 sekunder", "30 sekunder"],
    correctAnswer: 2,
    explanation: "Det ska gå minst 15 sekunder mellan status K (som måste bekräftas av LC) och status DR.",
    difficulty: "advanced",
    category: "status"
  },
  {
    id: "advanced-10",
    question: "Vilka DMO-talgrupper används för räddningstjänst vid DMO-läge?",
    options: ["BLÅ DMO 1-10", "RTJ DMO 1-10", "RAPS DMO 1-10", "RSG DMO 1-10"],
    correctAnswer: 1,
    explanation: "RTJ DMO 1-10 används av räddningstjänst likt insatstalgrupp vid DMO-läge.",
    difficulty: "advanced",
    category: "DMO"
  },
  {
    id: "advanced-11",
    question: "Vad är Gateway Mode Operation (GMO)?",
    options: ["En typ av repeater", "Funktion för att länka DMO-talgrupp in i Rakelnätet", "En typ av nödlägesfunktion", "En typ av status"],
    correctAnswer: 1,
    explanation: "GMO används för att länka en DMO-talgrupp in i Rakelnätet genom en fordonsterminal.",
    difficulty: "advanced",
    category: "teknisk"
  },
  {
    id: "advanced-12",
    question: "Vilken rökdykradio-kanal används för reserv vid större insatser?",
    options: ["Kanal 10", "Kanal 11", "Kanal 12", "Kanal 13"],
    correctAnswer: 1,
    explanation: "Kanal 11 är reservkanal vid större insatser för rökdykradio.",
    difficulty: "advanced",
    category: "radiosystem"
  },
  {
    id: "advanced-13",
    question: "Vad krävs för att använda marin VHF enligt instruktionen?",
    options: ["Endast grundutbildning", "LRC-intyg från NFB", "MSB-certifiering", "RSG-licens"],
    correctAnswer: 1,
    explanation: "Användare måste ha ett Long Range Certificate (LRC-intyg) från nämnden för båtlivsutbildning (NFB).",
    difficulty: "advanced",
    category: "utbildning"
  },
  {
    id: "advanced-14",
    question: "Vilka kommuner har inte täckning för kanal 96?",
    options: ["Göteborg och Mölndal", "Stenungsund, Tjörn och Lilla Edet", "Partille och Härryda", "Kungälv och Ale"],
    correctAnswer: 1,
    explanation: "Täckning för kanal 96 saknas i kommunerna Stenungsund, Tjörn och Lilla Edet.",
    difficulty: "advanced",
    category: "radiosystem"
  },
  {
    id: "advanced-15",
    question: "Vad ska dokumenteras när nödlägesfunktion aktiveras?",
    options: ["Tid och plats", "Rakelnummer och position", "Orsak och åtgärd", "Alla resurser på plats"],
    correctAnswer: 1,
    explanation: "När nödlägesfunktion aktiveras ska Rakelnummer dokumenteras och position säkerställas i ResQmap.",
    difficulty: "advanced",
    category: "nödläge"
  },
  {
    id: "advanced-16",
    question: "Vilken typ av samtal kan likställas med telefonsamtal i Rakel?",
    options: ["Simplexsamtal", "Duplexsamtal", "Gruppsamtal", "CBR-samtal"],
    correctAnswer: 1,
    explanation: "Duplexsamtal kan likställas med telefonsamtal, men av belastningsskäl används huvudsakligen simplexkommunikation.",
    difficulty: "advanced",
    category: "teknisk"
  },
  {
    id: "advanced-17",
    question: "Vad används BLÅ DMO 1-2 för?",
    options: ["Räddningstjänst intern kommunikation", "Blåljusorganisationer samverkan likt samverkanstalgrupp", "Polisens kommunikation", "Ambulansens kommunikation"],
    correctAnswer: 1,
    explanation: "BLÅ DMO 1-2 används av blåljusorganisationer för samverkan likt samverkanstalgrupp vid DMO-läge.",
    difficulty: "advanced",
    category: "DMO"
  },
  {
    id: "advanced-18",
    question: "När tillämpas öppen passning av LC?",
    options: ["Alltid", "Endast vid större insatser", "Under framkörning", "Endast på dagen"],
    correctAnswer: 2,
    explanation: "LC tillämpar öppen passning under framkörning för att bevaka kommunikationen.",
    difficulty: "advanced",
    category: "passning"
  },
  {
    id: "advanced-19",
    question: "Vilka tunnlar använder rökdykradio kanal 5?",
    options: ["Endast Götatunneln", "Götatunneln, Lundby- och Marieholmstunneln m.fl.", "Alla tunnlar i Göteborg", "Endast spårvagnstunnlar"],
    correctAnswer: 1,
    explanation: "Kanal 5 används i Götatunneln, Lundby-, Marieholms-, Chalmers-, Hammarkulletunneln, spårvagnstunnlar m.fl.",
    difficulty: "advanced",
    category: "radiosystem"
  },
  {
    id: "advanced-20",
    question: "Vad gör LC vid utlarmning där annan organisation har ledningsansvar?",
    options: ["Tilldelar egna talgrupper", "Säkerställer att RSG-resurs kan kommunicera och grupkombinerar vid behov", "Tar över ledningen", "Avvaktar order"],
    correctAnswer: 1,
    explanation: "LC säkerställer att RSG-resurs kan kommunicera och grupkombinerar lämplig talgrupp om resursen saknar behörighet.",
    difficulty: "advanced",
    category: "samverkan"
  },
  {
    id: "advanced-21",
    question: "Vad betyder status 'DHT' i resursstatus?",
    options: ["Disponibel Hemtransport", "Disponibel Handterminal", "Disponibel Huvudterminal", "Disponibel Husterminal"],
    correctAnswer: 1,
    explanation: "DHT betyder Disponibel Handterminal - resursen är redo för insats och passar Rakel handterminal.",
    difficulty: "advanced",
    category: "status"
  },
  {
    id: "advanced-22",
    question: "Vilken talgruppsserie tillhör Hall RAPS 1-10?",
    options: ["250 RtjIns 1-10", "251 RtjIns 1-10", "255 RtjIns 1-10", "252 RtjIns 1-10"],
    correctAnswer: 2,
    explanation: "255 RtjIns 1-10 tillhör Hall RAPS 1-10 för Kungsbacka kommun.",
    difficulty: "advanced",
    category: "talgrupper"
  },
  {
    id: "advanced-23",
    question: "Vad ska göras om information inte uppfattas på radio?",
    options: ["Vänta på repetition", "Efterfråga repetition av informationen", "Gissa innehållet", "Använda annan kanal"],
    correctAnswer: 1,
    explanation: "I de fall information inte uppfattas ska repetition av informationen efterfrågas.",
    difficulty: "advanced",
    category: "kommunikation"
  },
  {
    id: "advanced-24",
    question: "Hur hanteras reservsamband när Rakel har driftstörning?",
    options: ["Endast mobiltelefoni", "Mobiltelefoni först, sedan kanal 96 och DMO", "Endast kanal 96", "Endast rökdykradio"],
    correctAnswer: 1,
    explanation: "Vid Rakelbortfall används först mobiltelefoni, sedan kanal 96 för operativt samband och DMO på skadeplats.",
    difficulty: "advanced",
    category: "reservhantering"
  },
  {
    id: "advanced-25",
    question: "Vilken organisation tilldelar RAPS-talgrupp vid IVPA?",
    options: ["RSG LC", "SOS Alarm", "Ambulansdirigent", "Regional ledning"],
    correctAnswer: 1,
    explanation: "SOS ska tilldela en RAPS-talgrupp för IVPA-händelsen, LC förmedlar denna till larmade resurser.",
    difficulty: "advanced",
    category: "IVPA"
  },
  {
    id: "advanced-26",
    question: "Vad innebär det att LC har högre behörigheter som KC?",
    options: ["De kan lyssna på alla kanaler", "De förväntas leda och planera kommunikationen", "De har tillgång till fler terminaler", "De kan stänga av andra terminaler"],
    correctAnswer: 1,
    explanation: "Som KC har LC högre behörigheter och förväntas leda och planera kommunikationen i Rakelnätet.",
    difficulty: "advanced",
    category: "behörigheter"
  },
  {
    id: "advanced-27",
    question: "När övertar räddningsledaren ansvaret för sambandet från LC?",
    options: ["Vid utlarmning", "När räddningsledare är etablerad på händelse", "Efter en timme", "Vid större insatser"],
    correctAnswer: 1,
    explanation: "När räddningsledare är etablerad på händelse övertar denne ansvaret för att styra och leda sambandet med hjälp av LC.",
    difficulty: "advanced",
    category: "ledning"
  },
  {
    id: "advanced-28",
    question: "Vilka kanaler kan LC tilldela vid driftstörning i CoorCom?",
    options: ["Alla vanliga kanaler", "Endast VGöt RAPS 60-69", "Begränsad uppsättning enligt bilaga 5", "Inga kanaler"],
    correctAnswer: 2,
    explanation: "Vid CoorCom-driftstörning begränsas talgrupperna LC får tilldela enligt specifik lista i bilaga 5.",
    difficulty: "advanced",
    category: "driftstörning"
  },
  {
    id: "advanced-29",
    question: "Vad används 250 Samv-GOT för?",
    options: ["Allmän samverkan Göteborg", "Landvetter flygplats", "Göteborgs hamn", "Göteborgs spårvägar"],
    correctAnswer: 1,
    explanation: "250 Samv-GOT är en lokal platstalgrupp för Landvetter flygplats.",
    difficulty: "advanced",
    category: "talgrupper"
  },
  {
    id: "advanced-30",
    question: "Vilken princip gäller för sambandsplanering vid områdesledning?",
    options: ["Separata talgrupper för varje insats", "Samma samverkanstalgrupp kan användas för flera insatser", "Endast ledningstalgrupper", "Ingen planering behövs"],
    correctAnswer: 1,
    explanation: "Vid områdesledning kan flera räddningsinsatser med samma räddningsledare använda samma samverkanstalgrupp.",
    difficulty: "advanced",
    category: "områdesledning"
  }
];

// EXPERTFRÅGOR (30 st) - Avancerad teknisk kunskap och komplexa scenarier
export const expertQuestions: SambandsQuizQuestion[] = [
  {
    id: "expert-1",
    question: "Vilka talgrupper används för gränssamverkan med Norge och i vilka kommuner?",
    options: ["NOSE EM/CO 2,4 i Göteborg", "NOSE EM/CO 2,4 i Strömstad/Tanum", "NORWAY 1-2 i alla gränskommuner", "SCAND 1-5 vid behov"],
    correctAnswer: 1,
    explanation: "NOSE EM 2,4 och NOSE CO 2,4 används för gränssamverkan Norge i Strömstad/Tanum kommun, och tilldelning sker även av SOS.",
    difficulty: "expert",
    category: "internationell_samverkan"
  },
  {
    id: "expert-2",
    question: "Hur skiljer sig talgruppstilldelning vid stor händelse med nationellt samband jämfört med regional samverkan?",
    options: ["Inga skillnader", "Nationella talgrupper har högre prioritet och kräver MSB-godkännande", "Fler sektorer men samma struktur", "Helt annan sambandsplan"],
    correctAnswer: 1,
    explanation: "Vid stora händelser med nationellt samband krävs koordinering på högre nivå och andra behörigheter än vid regional samverkan.",
    difficulty: "expert",
    category: "stor_händelse"
  },
  {
    id: "expert-3",
    question: "Vilken specifik kanal planeras för Västlänken som tillägg till kanal 5?",
    options: ["Kanal 15", "Kanal 16", "Kanal 17", "Kanal 14"],
    correctAnswer: 1,
    explanation: "Kanal 16 planeras för Västlänken som tillägg till kanal 5 (planerat, ej klart enligt instruktionen).",
    difficulty: "expert",
    category: "framtida_system"
  },
  {
    id: "expert-4",
    question: "När en fordonsterminal används som gateway, vilka förutsättningar måste vara uppfyllda?",
    options: ["Endast nätverksanslutning", "Fordonsterminalen måste ha kontakt med Rakelnätet OCH handterminalen DMO-kontakt med fordonet", "Endast DMO-kontakt", "Endast rätt programvara"],
    correctAnswer: 1,
    explanation: "För GMO krävs både att fordonsterminalen har kontakt med Rakelnätet och att handterminalen har DMO-kontakt med fordonet.",
    difficulty: "expert",
    category: "teknisk_implementation"
  },
  {
    id: "expert-5",
    question: "Vilken arbetsordning följer LC vid hantering av nödlägesfunktion efter att anropet besvarats?",
    options: ["Kontakta VRC direkt", "Dokumentera, positionera, säkerställa hjälpbehov, öppna talgrupp, avdela operatör, kontakta VB", "Skicka resurser omedelbart", "Vänta på mer information"],
    correctAnswer: 1,
    explanation: "LC följer specifik ordning: dokumentera Rakelnummer, säkerställa position, säkerställa hjälpbehov, öppna talgrupp, avdela operatör, kontakta VB som kontaktar VRC.",
    difficulty: "expert",
    category: "nödlägeshantering"
  },
  {
    id: "expert-6",
    question: "Vid DMO-läge på större skadeplatser (>1-2 km), hur ska signalförstärkning implementeras enligt instruktionen?",
    options: ["Använda repeater på alla fordon", "Placera ett fordon på lämplig plats för att förstärka/förlänga signalen", "Installera fast repeater", "Använda handterminaler som repeatrar"],
    correctAnswer: 1,
    explanation: "Vid skadeplatser större än 1-2 km bör ett fordon placeras på lämplig plats för att förstärka/förlänga DMO-signalen.",
    difficulty: "expert",
    category: "teknisk_implementation"
  },
  {
    id: "expert-7",
    question: "Hur hanteras sambandsplanering när RSG stödjer annan organisation som saknar behörighet till ordinarie talgrupper?",
    options: ["RSG tilldelar egna talgrupper", "Använd endast mobiltelefoni", "Tilldela särskilda samverkans- och lokala platstalgrupper som sammankopplas", "Vänta tills behörighet erhålls"],
    correctAnswer: 2,
    explanation: "Särskilda samverkans- och lokala platstalgrupper finns för samverkan med aktörer som saknar behörighet till ordinarie talgrupper, dessa sammankopplas vid händelse.",
    difficulty: "expert",
    category: "komplex_samverkan"
  },
  {
    id: "expert-8",
    question: "Vilken duplex-kanal är planerad för Tingstadtunneln och när?",
    options: ["Kanal 14, planerad klar hösten 2024", "Kanal 15, redan klar", "Kanal 16, planerad 2025", "Kanal 13, under utbyggnad"],
    correctAnswer: 0,
    explanation: "Kanal 14 för Tingstadtunneln är planerad klar hösten 2024 enligt instruktionen.",
    difficulty: "expert",
    category: "infrastruktur"
  },
  {
    id: "expert-9",
    question: "Vid vilka specifika förhållanden kan RMO (Repeater Mode Operation) bli aktuellt trots att fordonsterminaler inte stödjer funktionen?",
    options: ["RMO används aldrig i RSG", "Vid större händelser utomhus", "Vid underground-operationer", "Vid internationell samverkan"],
    correctAnswer: 0,
    explanation: "RMO används inte i RSG då tekniken i fordonsterminaler inte stödjer funktionen enligt instruktionen.",
    difficulty: "expert",
    category: "tekniska_begränsningar"
  },
  {
    id: "expert-10",
    question: "Hur ska sambandsplanering genomföras vid regional händelse där flera räddningstjänstorganisationer ska samverka med sektorsindelning?",
    options: ["Använd lokala planer", "Följ 'Riktlinjer för förstärkningsresurser Räddningstjänsterna Västra Götaland och Halland'", "Improvisera efter behov", "Använd nationella planer"],
    correctAnswer: 1,
    explanation: "Vid regionala händelser följs specifika riktlinjer för förstärkningsresurser för Västra Götaland och Halland.",
    difficulty: "expert",
    category: "regional_samverkan"
  },
  {
    id: "expert-11",
    question: "Vilken krypterad kanal används specifikt av SB (Släckningsbåt) och varför är den unik?",
    options: ["Kanal 13 som alla andra", "SB använder inte rökdykradio", "Kanal 12 som är licensfri", "SB har egen krypterad marin VHF"],
    correctAnswer: 1,
    explanation: "Resurser tillhörande SB är inte utrustade med radio för kanal 96 och har specifika sambandslösningar för marin verksamhet.",
    difficulty: "expert",
    category: "specialenheter"
  },
  {
    id: "expert-12",
    question: "Vid larm till annat ledningssystem (ALS), varför kan CBR inte skickas till annan ledningscentral?",
    options: ["Teknisk begränsning", "Olika organisationer kan inte ta emot CBR från varandra", "Säkerhetsrestriktioner", "Kostnadsskäl"],
    correctAnswer: 1,
    explanation: "CBR kan inte skickas till annan ledningscentral eftersom olika organisationers KC-system inte är kompatibla för CBR mellan organisationer.",
    difficulty: "expert",
    category: "inter_organisatorisk"
  },
  {
    id: "expert-13",
    question: "Vilken talgrupp används för Göteborgs energi och vad är dess specifika syfte?",
    options: ["GE PROD för produktionssamverkan", "GE SAMV för allmän samverkan", "GE DRIFT för driftproblem", "GE LC för ledningssamverkan"],
    correctAnswer: 0,
    explanation: "GE PROD används för samverkan med Göteborg Energi, troligen för produktions- och driftrelaterade ärenden.",
    difficulty: "expert",
    category: "specialsamverkan"
  },
  {
    id: "expert-14",
    question: "Hur hanteras kommunikationen i DMO när räckvidden är otillräcklig och ingen fordonsterminal kan användas som förstärkare?",
    options: ["Använd mobiltelefoni", "Gå tillbaka till nätläge", "Använd rökdykradio och etablera kommunikationskedjor", "Vänta på bättre förhållanden"],
    correctAnswer: 2,
    explanation: "Vid otillräcklig DMO-räckvidd används rökdykradio för lokalt samband och kommunikationskedjor för att överbrygga avståndet.",
    difficulty: "expert",
    category: "kommunikationskedjor"
  },
  {
    id: "expert-15",
    question: "Vilken är den tekniska skillnaden mellan en samverkanstalgrupp och en insatstalgrupp beträffande behörigheter?",
    options: ["Ingen skillnad", "Samverkanstalgrupper har behörigheter över organisationsgränser, insatstalgrupper är organisationsspecifika", "Insatstalgrupper har högre prioritet", "Samverkanstalgrupper är alltid krypterade"],
    correctAnswer: 1,
    explanation: "Samverkanstalgrupper används för samverkan mellan organisationer medan insatstalgrupper är för samband inom egen organisation.",
    difficulty: "expert",
    category: "behörighetsstruktur"
  },
  {
    id: "expert-16",
    question: "Vid samtidig hantering av IVPA och ordinarie räddningsinsats, hur prioriteras LC:s resurser?",
    options: ["IVPA har alltid prioritet", "Räddningsinsats har alltid prioritet", "LC ansvarar endast för räddningsinsats, IVPA hanteras av annan organisation", "Lika prioritet"],
    correctAnswer: 2,
    explanation: "Vid IVPA ansvarar annan organisations KC (ambulansdirigent) för sambandshanteringen, LC förmedlar endast talgruppen till RSG-resurser.",
    difficulty: "expert",
    category: "prioritering"
  },
  {
    id: "expert-17",
    question: "Vilken typ av sambandsplan används vid stor händelse med behov av både RAPS och nationellt samband mot sektorer?",
    options: ["Regional sambandsplan", "Nationell sambandsplan med RAPS-integration", "Hybridplan med både regionala och nationella element", "Två parallella sambandsplaner"],
    correctAnswer: 2,
    explanation: "Vid stora händelser används komplexa sambandsplaner som integrerar både RAPS-samverkan och nationella sambandsbehov enligt olika nivåer.",
    difficulty: "expert",
    category: "komplex_sambandsplan"
  },
  {
    id: "expert-18",
    question: "Hur hanteras säkerställande av samband när RSG-resurs inte har behörighet till tilldelad talgrupp vid samverkan?",
    options: ["Resurs får inte delta", "LC begär ny behörighet", "LC tilldelar och gruppkombinerar lämplig talgrupp", "Använd alternativt samband"],
    correctAnswer: 2,
    explanation: "LC säkerställer kommunikation genom tilldelning och gruppkombinering av lämplig talgrupp när resursen saknar behörighet.",
    difficulty: "expert",
    category: "behörighetshantering"
  },
  {
    id: "expert-19",
    question: "Vilken specifik utbildning krävs från 2026-01-01 enligt utbildningsplanen?",
    options: ["Alla befintliga kurser", "Sambandsplanering-aktörsanalys RSG och Rakel konferens", "Endast MSB webbkurs", "Teknisk genomgång DMO"],
    correctAnswer: 1,
    explanation: "Från 2026-01-01 blir Sambandsplanering-aktörsanalys RSG och Rakel konferens utbildningsmål enligt utbildningsplanen.",
    difficulty: "expert",
    category: "framtida_krav"
  },
  {
    id: "expert-20",
    question: "Vid vilken typ av händelse tillämpas den sambandsplan som visar 'Stor händelse med behov av nationellt samband mot sektorer'?",
    options: ["Alla stora händelser", "Endast när MSB aktiverar nationella resurser", "När händelsen berör flera regioner eller kräver nationell koordinering", "Endast vid naturkatastrofer"],
    correctAnswer: 2,
    explanation: "Nationellt samband används när händelsen kräver koordinering på nationell nivå eller berör flera regioner.",
    difficulty: "expert",
    category: "nationell_nivå"
  },
  {
    id: "expert-21",
    question: "Vad är den kritiska skillnaden mellan individsamtal via CBR gruppsamtal och CBR individanrop?",
    options: ["Ingen skillnad", "CBR gruppsamtal kan höras av alla på talgruppen, CBR individanrop endast av KC och anropande", "CBR individanrop har högre prioritet", "CBR gruppsamtal kräver godkännande"],
    correctAnswer: 1,
    explanation: "Vid CBR individanrop hör endast KC och anropande, vid CBR gruppsamtal kan alla på talgruppen höra kommunikationen.",
    difficulty: "expert",
    category: "kommunikationstyper"
  },
  {
    id: "expert-22",
    question: "Hur hanteras samband vid samtidig användning av områdesledning och DMO på grund av driftstörningar?",
    options: ["Områdesledning avbryts", "DMO används endast lokalt, mobiltelefoni för områdesledning", "Kombinerad plan med DMO lokalt och alternativt samband för områdesledning", "Vänta tills Rakel fungerar"],
    correctAnswer: 2,
    explanation: "Vid områdesledning med DMO-behov används kombinerad sambandsplanering med DMO lokalt och alternativa sambandslösningar för områdesövergreipande ledning.",
    difficulty: "expert",
    category: "kombinerad_problematik"
  },
  {
    id: "expert-23",
    question: "Vilken teknisk förutsättning gäller för att NOSE-talgrupper ska kunna användas effektivt?",
    options: ["Svensk utrustning", "Kompatibilitet med Norsk Nødnett-system", "Speciell kryptering", "MSB-godkännande"],
    correctAnswer: 1,
    explanation: "NOSE-talgrupper kräver kompatibilitet mellan svenska Rakel och norska Nødnett för gränsöverskridande samverkan.",
    difficulty: "expert",
    category: "internationell_teknik"
  },
  {
    id: "expert-24",
    question: "Vid vilken typ av driftstörning blir kanal 96 helt oanvändbar för vissa enheter?",
    options: ["Vid strömavbrott", "För SB-resurser som saknar utrustning", "Vid överbelastning", "Vid väderförhållanden"],
    correctAnswer: 1,
    explanation: "Resurser tillhörande SB är inte utrustade med radio för kanal 96 och kan därför inte använda denna reservlösning.",
    difficulty: "expert",
    category: "systemlimitationer"
  },
  {
    id: "expert-25",
    question: "Hur säkerställs kommunikation med förstärkande enheter som får endast ärendeutskick och medlyssning?",
    options: ["De får ingen kommunikation", "Medlyssning på samverkans- och insatstalgrupp efter statuskvittens", "Direkt kommunikation med LC", "Egen talgrupp tilldelas"],
    correctAnswer: 1,
    explanation: "Förstärkande enheter får medlyssning på samverkans- och insatstalgrupp efter kvittens via statusrapportering, men ingen totalinfo normalt.",
    difficulty: "expert",
    category: "information_distribution"
  },
  {
    id: "expert-26",
    question: "Vilken är den kritiska tidsfaktorn för totalinfo vid kort framkörning?",
    options: ["Alltid samma tid", "LC tillser att först anländande får tillräcklig info i tid för förberedelse", "Ingen speciell tidsfaktor", "Vänta tills alla är framme"],
    correctAnswer: 1,
    explanation: "Vid kort framkörning är det kritiskt att LC tillser att först anländande resurser får tillräckligt med information i tid för att förbereda sig.",
    difficulty: "expert",
    category: "tidskritiska_processer"
  },
  {
    id: "expert-27",
    question: "Vad händer med kommunikationskrypteringen i DMO-läge?",
    options: ["Samma kryptering som i nätläge", "Starkare kryptering", "Kommunikationen är inte krypterad", "Endast vissa kanaler är krypterade"],
    correctAnswer: 2,
    explanation: "I DMO-läge är inte kommunikationen krypterad enligt instruktionen.",
    difficulty: "expert",
    category: "säkerhetsaspekter"
  },
  {
    id: "expert-28",
    question: "Vilken procedurell skillnad gäller för resurser vid larm genom annat ledningssystem jämfört med RSG LC?",
    options: ["Ingen skillnad", "CBR kan inte skickas, totalinfo från annan LC, kontakta RSG LC vid problem", "Endast telefonkontakt", "Vänta på RSG LC"],
    correctAnswer: 1,
    explanation: "Vid larm från annat ledningssystem kan CBR inte skickas till annan LC, totalinfo kommer från den som larmat, vid problem kontakta RSG LC via telefon.",
    difficulty: "expert",
    category: "procedurella_skillnader"
  },
  {
    id: "expert-29",
    question: "Hur hanteras sambandsplanering när samma räddningsledare har ansvar för flera samtidiga insatser?",
    options: ["Separata planer för varje insats", "Samma samverkanstalgrupp kan användas enligt områdesledning i dialog med räddningsledaren", "Automatisk planering", "LC tar över helt"],
    correctAnswer: 1,
    explanation: "Vid områdesledning kan flera insatser med samma räddningsledare använda samma samverkanstalgrupp enligt planering i dialog med räddningsledaren.",
    difficulty: "expert",
    category: "komplex_ledningsstruktur"
  },
  {
    id: "expert-30",
    question: "Vilken är den tekniska begränsningen för 250-talgruppsserierna jämfört med 251-serierna beträffande tilldelningsbehörighet?",
    options: ["Ingen skillnad", "250-serier kräver regional koordinering och kan tilldelas av SOS", "251-serier har högre prioritet", "250-serier är endast för övningar"],
    correctAnswer: 1,
    explanation: "250-talgruppsserierna för Västra Götaland/Kungsbacka kan tilldelas även av SOS och kräver regional koordinering till skillnad från 251-serierna.",
    difficulty: "expert",
    category: "tilldelningsbehörigheter"
  }
];

// Funktion för att generera quiz baserat på svårighetsgrad
export function generateSambandsQuiz(difficulty: 'easy' | 'advanced' | 'expert', count: number = 10): SambandsQuizQuestion[] {
  let sourceQuestions: SambandsQuizQuestion[];
  
  switch (difficulty) {
    case 'easy':
      sourceQuestions = easyQuestions;
      break;
    case 'advanced':
      sourceQuestions = advancedQuestions;
      break;
    case 'expert':
      sourceQuestions = expertQuestions;
      break;
    default:
      sourceQuestions = easyQuestions;
  }
  
  // Blanda och returnera önskat antal frågor
  const shuffled = [...sourceQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, sourceQuestions.length));
}

// Funktion för att få alla frågor från alla nivåer
export function getAllSambandsQuestions(): SambandsQuizQuestion[] {
  return [...easyQuestions, ...advancedQuestions, ...expertQuestions];
}

// Statistik över frågorna
export function getSambandsQuizStats() {
  const allQuestions = getAllSambandsQuestions();
  const categoryStats = allQuestions.reduce((acc, question) => {
    acc[question.category] = (acc[question.category] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });
  
  const difficultyStats = allQuestions.reduce((acc, question) => {
    acc[question.difficulty] = (acc[question.difficulty] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });
  
  return {
    totalQuestions: allQuestions.length,
    categoryStats,
    difficultyStats,
    questionsPerDifficulty: {
      easy: easyQuestions.length,
      advanced: advancedQuestions.length,
      expert: expertQuestions.length
    }
  };
}

// Export för att använda i andra filer
export {
  easyQuestions as sambandsEasyQuestions,
  advancedQuestions as sambandsAdvancedQuestions,
  expertQuestions as sambandsExpertQuestions
};

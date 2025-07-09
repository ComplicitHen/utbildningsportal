import { InventoryItem } from './inventoryQuizGenerator';

export const completeInventory: InventoryItem[] = [
  // Hytt utsida vänster
  { name: "Vattenkokare", location: "Hytt utsida vänster", category: "hytt" },
  { name: "Frystorkad mat och värmepåsar", location: "Hytt utsida vänster", category: "hytt" },
  { name: "NATO kabel", location: "Hytt utsida vänster", category: "hytt" },
  { name: "DEFA kabel, grön", location: "Hytt utsida vänster", category: "hytt" },
  { name: "Saneringsväska med duschslang", location: "Hytt utsida vänster", category: "hytt" },
  { name: "Elhandskar", location: "Hytt utsida vänster", category: "hytt" },

  // Fack 1 - Dimspikset
  { name: "Attack", location: "Fack 1 - Dimspikset", category: "dimspikset", quantity: 1 },
  { name: "Begränsning", location: "Fack 1 - Dimspikset", category: "dimspikset", quantity: 2 },
  { name: "Grenrör", location: "Fack 1 - Dimspikset", category: "dimspikset" },
  { name: "Dimspikshammare", location: "Fack 1 - Dimspikset", category: "dimspikset" },
  { name: "Slangväska gul (3avd. 25mm)", location: "Fack 1 - Dimspikset", category: "dimspikset" },

  // Fack 1 - RH Pusher
  { name: "Räddningsstötta", location: "Fack 1 - RH Pusher", category: "rh_pusher", quantity: 2 },
  { name: "Vevhandtag", location: "Fack 1 - RH Pusher", category: "rh_pusher", quantity: 2 },
  { name: "Säkringsband", location: "Fack 1 - RH Pusher", category: "rh_pusher", quantity: 2 },
  { name: "Lyftkrok", location: "Fack 1 - RH Pusher", category: "rh_pusher", quantity: 2 },
  { name: "Lyftbygel", location: "Fack 1 - RH Pusher", category: "rh_pusher", quantity: 2 },
  { name: "Fyruddsspets", location: "Fack 1 - RH Pusher", category: "rh_pusher", quantity: 2 },

  // Fack 1 - Övrigt
  { name: "Strålrör applikator", location: "Fack 1", category: "strålrör" },
  { name: "Silvertejp", location: "Fack 1", category: "verktyg" },
  { name: "Övergångslock", location: "Fack 1", category: "kopplingar", quantity: 3 },
  { name: "Avstängningsventil", location: "Fack 1", category: "kopplingar", quantity: 2 },
  { name: "Grenkoppling 63-38", location: "Fack 1", category: "kopplingar", quantity: 2 },
  { name: "Brunnstätningsmatta", location: "Fack 1", category: "tätning" },
  { name: "Slangkrokar", location: "Fack 1", category: "verktyg", quantity: 3 },
  { name: "Grenrör med byxrör", location: "Fack 1", category: "strålrör" },
  { name: "Back-up strålrör", location: "Fack 1", category: "strålrör" },
  { name: "Slangbinda 76mm", location: "Fack 1", category: "kopplingar", quantity: 3 },
  { name: "Slangbinda 42mm", location: "Fack 1", category: "kopplingar", quantity: 2 },
  { name: "Dimstrålrör Unifire", location: "Fack 1", category: "strålrör", quantity: 2 },
  { name: "Dimstrålrör V12 Multifire", location: "Fack 1", category: "strålrör" },
  { name: "Enhetsstrålrör", location: "Fack 1", category: "strålrör" },
  { name: "Slangväskor röda", location: "Fack 1", category: "slangar", quantity: 6 },
  { name: "Slangväskor Blå skogsbrand 2x25m", location: "Fack 1", category: "slangar", quantity: 4 },

  // Fack 1 - Lyftkudde
  { name: "Flaskpaket till lyftkudde", location: "Fack 1 - Lyftkudde", category: "lyftkudde", checkType: "level", details: "kontrollera att flaskan är full" },
  { name: "Regulatorslang svart", location: "Fack 1 - Lyftkudde", category: "lyftkudde" },
  { name: "Manöverslang orange", location: "Fack 1 - Lyftkudde", category: "lyftkudde" },
  { name: "Manöverslang blå", location: "Fack 1 - Lyftkudde", category: "lyftkudde" },
  { name: "Lyftkudde", location: "Fack 1 - Lyftkudde", category: "lyftkudde" },
  { name: "Pallningsvirke", location: "Fack 1 - Lyftkudde", category: "lyftkudde" },
  { name: "Manöverpanel", location: "Fack 1 - Lyftkudde", category: "lyftkudde" },
  { name: "Lyftkudde (större)", location: "Fack 1 - Lyftkudde", category: "lyftkudde" },

  // Fack 1 - Övrigt
  { name: "Brunnstätning gul", location: "Fack 1", category: "tätning", quantity: 2 },

  // Under fack 1
  { name: "Slangbrygga", location: "Under fack 1", category: "verktyg" },

  // Fack 2 - Toppfack
  { name: "Skogsbrandsryggsäck", location: "Fack 2 toppfack", category: "skogsbrand", quantity: 4, details: "2 avd. 42mm, 1st byxrör i botten i varje väska" },
  { name: "Skogsbrandsoverall", location: "Fack 2 toppfack", category: "skogsbrand", quantity: 5 },

  // Fack 2 - Mellanfack
  { name: "Slangväskor JT pack", location: "Fack 2 mellanfack", category: "slangar", quantity: 2 },

  // Fack 2 - Underfack
  { name: "Slangväskor JT pack", location: "Fack 2 underfack", category: "slangar", quantity: 1 },

  // Fack 2 - Backar vid sidan
  { name: "RAP kläder", location: "Fack 2 backar", category: "skydd", quantity: 4, details: "uppsättningar + påsar" },
  { name: "Flytvästar", location: "Fack 2 backar", category: "säkerhet", quantity: 2 },
  { name: "Liksäck", location: "Fack 2 backar", category: "räddning", quantity: 2 },
  { name: "Tätningsmaterial", location: "Fack 2 backar", category: "tätning" },
  { name: "Skyddsmask", location: "Fack 2 backar", category: "skydd", details: "byte varje vecka till gällande lag" },

  // Fack 3
  { name: "Baspunktsväska", location: "Fack 3", category: "ledning" },
  { name: "Wermafilter", location: "Fack 3", category: "filter" },
  { name: "Pulversläckare 6kg", location: "Fack 3", category: "släckning", quantity: 2, checkType: "visual", details: "nål på grönt" },
  { name: "Södertörnhäck dubbel 42mm", location: "Fack 3", category: "slangar", details: "2 avd. rökdykarslang" },
  { name: "Södertörnhäck enkel 42mm", location: "Fack 3", category: "slangar", quantity: 2, details: "2 avd. rökdykarslang" },
  { name: "Brandfilt", location: "Fack 3", category: "släckning" },
  { name: "Pikyxa", location: "Fack 3", category: "verktyg" },
  { name: "Aluminiumspett", location: "Fack 3", category: "verktyg" },
  { name: "Rökdykarkorg", location: "Fack 3", category: "rökdykning", quantity: 2, details: "2 avd. 42mm slang med strålrör" },

  // Fack 3 - Dörrforceringsverktyg
  { name: "Falsbrytare", location: "Fack 3 - Dörrforcering", category: "forcering" },
  { name: "Multibreach", location: "Fack 3 - Dörrforcering", category: "forcering" },
  { name: "Brytjärn", location: "Fack 3 - Dörrforcering", category: "forcering" },
  { name: "Miniram (Bonk)", location: "Fack 3 - Dörrforcering", category: "forcering" },

  // Låda under fack 3
  { name: "Trappor", location: "Under fack 3", category: "verktyg", quantity: 2 },
  { name: "Kilar breda", location: "Under fack 3", category: "verktyg", quantity: 2 },
  { name: "Kilar smala", location: "Under fack 3", category: "verktyg", quantity: 2 },
  { name: "BP ända", location: "Under fack 3", category: "verktyg", quantity: 2 },

  // Fack 4
  { name: "Filtar", location: "Fack 4", category: "skydd", quantity: 3 },
  { name: "Klippskydd", location: "Fack 4", category: "skydd" },
  { name: "Cellplast", location: "Fack 4", category: "material" },
  { name: "Lyftband 6m, 2ton", location: "Fack 4", category: "lyft", quantity: 2 },
  { name: "Kantskydd Holmatro", location: "Fack 4", category: "skydd", quantity: 10 },
  { name: "Splitterskydd", location: "Fack 4", category: "skydd", quantity: 5 },
  { name: "Hydralslang grön till kombisax", location: "Fack 4", category: "hydraulik" },
  { name: "Lyftband rött", location: "Fack 4", category: "lyft" },
  { name: "Vajer med öglor", location: "Fack 4", category: "lyft" },
  { name: "Sopsäckar blå", location: "Fack 4", category: "material" },
  { name: "Verktygsplast", location: "Fack 4", category: "material" },
  { name: "Ögondusch", location: "Fack 4", category: "säkerhet", quantity: 2, checkType: "date", details: "kontrollera bäst före datum" },
  { name: "Gummihandskar", location: "Fack 4", category: "skydd" },
  { name: "Skyddsglasögon", location: "Fack 4", category: "skydd", quantity: 4 },
  { name: "Pappershållare minitork", location: "Fack 4", category: "material" },
  { name: "Glassåg", location: "Fack 4", category: "verktyg" },
  { name: "Bälteskniv", location: "Fack 4", category: "verktyg" },
  { name: "Kombisax", location: "Fack 4", category: "räddning" },
  { name: "Holmatro hydraulaggregat", location: "Fack 4", category: "hydraulik", checkType: "functional", details: "starta samt kolla oljenivå" },
  { name: "Schackel 3,2 ton", location: "Fack 4", category: "lyft", quantity: 2 },
  { name: "Blåsmunstycke tryckluft", location: "Fack 4", category: "verktyg" },
  { name: "Tillsatsmedel", location: "Fack 4", category: "kemikalier", quantity: 3 },
  { name: "Strålrör till tillsatsmedel", location: "Fack 4", category: "strålrör" },
  { name: "Absol", location: "Fack 4", category: "kemikalier", details: "minst 1 säck" },
  { name: "Alkylatbensin 4-takt", location: "Fack 4", category: "bränsle" },
  { name: "Stegsäkring svetstänger", location: "Fack 4", category: "verktyg" },
  { name: "Påfyllnadspip", location: "Fack 4", category: "verktyg" },

  // Fack 5
  { name: "Övergångslock, reserv", location: "Fack 5", category: "kopplingar" },
  { name: "Kombiskumrör", location: "Fack 5", category: "strålrör" },
  { name: "Arbetshandskar", location: "Fack 5", category: "skydd", quantity: 2 },
  { name: "Hörselskydd", location: "Fack 5", category: "skydd" },
  { name: "Blåslampa gasol", location: "Fack 5", category: "verktyg" },
  { name: "Strålrör CAFS", location: "Fack 5", category: "strålrör" },
  { name: "Adapter munstycke CAFS 25mm", location: "Fack 5", category: "kopplingar" },
  { name: "Adapter munstycke CAFS 32mm", location: "Fack 5", category: "kopplingar" },
  { name: "Slang 42mm veckad", location: "Fack 5", category: "slangar", quantity: 2, details: "avd. kopplat" },
  { name: "Strålrör", location: "Fack 5", category: "strålrör" },
  { name: "Duschslang", location: "Fack 5", category: "slangar" },
  { name: "Slang 76mm veckad", location: "Fack 5", category: "slangar", quantity: 1 },
  { name: "Kyrka", location: "Fack 5", category: "kopplingar" },
  { name: "CAFS-spett attack", location: "Fack 5", category: "strålrör" },
  { name: "CAFS-spett begränsning", location: "Fack 5", category: "strålrör" },
  { name: "Slangupprullare", location: "Fack 5", category: "verktyg" },
  { name: "Nödskiftnyckel", location: "Fack 5", category: "verktyg" },
  { name: "Nyckel till 6510", location: "Fack 5", category: "verktyg", details: "bakom skärmen" },
  { name: "Slangkopplingslås", location: "Fack 5", category: "verktyg", quantity: 2 },
  { name: "Övergångslock", location: "Fack 5", category: "kopplingar", quantity: 2, details: "på kyrka och uttag" },
  { name: "Hjälm chaffis med hörselskydd", location: "Fack 5", category: "skydd" },
  { name: "Smalslang kortis", location: "Fack 5", category: "slangar" },

  // Fack 6
  { name: "Räddningsbräda Höganäs", location: "Fack 6", category: "räddning", quantity: 2 },
  { name: "Brandposthuvud", location: "Fack 6", category: "verktyg" },
  { name: "Brandpostnyckel", location: "Fack 6", category: "verktyg" },
  { name: "Brandpostnyckel blå", location: "Fack 6", category: "verktyg" },
  { name: "Brandpostnyckel svärd svart", location: "Fack 6", category: "verktyg" },
  { name: "Spännband orange", location: "Fack 6", category: "verktyg", quantity: 2 },
  { name: "Kofot", location: "Fack 6", category: "verktyg", quantity: 2 },
  { name: "Måttband", location: "Fack 6", category: "verktyg" },
  { name: "Rörtång", location: "Fack 6", category: "verktyg" },
  { name: "Aluminiumspett", location: "Fack 6", category: "verktyg" },
  { name: "Avspärrningsband", location: "Fack 6", category: "material" },
  { name: "Verktygslåda", location: "Fack 6", category: "verktyg" },
  { name: "Arbetslina", location: "Fack 6", category: "verktyg", quantity: 3 },
  { name: "Bultsax", location: "Fack 6", category: "verktyg" },
  { name: "Kolsyresläckare", location: "Fack 6", category: "släckning" },
  { name: "Absoldunkar", location: "Fack 6", category: "kemikalier", quantity: 2 },
  { name: "Minigupp snoken", location: "Fack 6", category: "verktyg" },
  { name: "Orange varningslampa", location: "Fack 6", category: "säkerhet", details: "vid låda utdragen" },

  // Låda under fack 6
  { name: "Klappmax vägkona", location: "Under fack 6", category: "säkerhet", quantity: 7 },

  // Fack 7 - Topplåda
  { name: "Kastsåg", location: "Fack 7 topplåda", category: "verktyg" },
  { name: "Bågsåg trä", location: "Fack 7 topplåda", category: "verktyg", quantity: 2 },
  { name: "Yxa", location: "Fack 7 topplåda", category: "verktyg" },
  { name: "Vinkelkap, sladd", location: "Fack 7 topplåda", category: "verktyg" },
  { name: "Röklucka/brunnsöppnare", location: "Fack 7 topplåda", category: "verktyg" },
  { name: "Cirkelsåg, batteri", location: "Fack 7 topplåda", category: "verktyg" },

  // Fack 7 - Mellanlåda
  { name: "Tigersåg, batteri", location: "Fack 7 mellanlåda", category: "verktyg" },
  { name: "Vinkelkap, batteri", location: "Fack 7 mellanlåda", category: "verktyg" },
  { name: "Borrskruvdragare, batteri", location: "Fack 7 mellanlåda", category: "verktyg" },
  { name: "Batterier", location: "Fack 7 mellanlåda", category: "verktyg", quantity: 4 },
  { name: "Borrsats", location: "Fack 7 mellanlåda", category: "verktyg" },
  { name: "Bitssats", location: "Fack 7 mellanlåda", category: "verktyg" },
  { name: "Extrablad tigersåg", location: "Fack 7 mellanlåda", category: "verktyg" },
  { name: "Träborr 18mm inkl. borrförlängare", location: "Fack 7 mellanlåda", category: "verktyg" },
  { name: "CAFS-borr", location: "Fack 7 mellanlåda", category: "verktyg" },
  { name: "Spik/Skruvlåda", location: "Fack 7 mellanlåda", category: "verktyg" },
  { name: "5-56", location: "Fack 7 mellanlåda", category: "kemikalier" },
  { name: "Insexnycklar", location: "Fack 7 mellanlåda", category: "verktyg" },

  // Fack 7 - Underfack - Ytlivräddningsväska XL/L
  { name: "Dräkt", location: "Fack 7 underfack", category: "ytlivräddning" },
  { name: "Underställ", location: "Fack 7 underfack", category: "ytlivräddning" },
  { name: "Fenor", location: "Fack 7 underfack", category: "ytlivräddning" },
  { name: "Ficklampa", location: "Fack 7 underfack", category: "ytlivräddning" },
  { name: "Kniv", location: "Fack 7 underfack", category: "ytlivräddning" },
  { name: "Broddar", location: "Fack 7 underfack", category: "ytlivräddning" },
  { name: "Cyklop + snorkel", location: "Fack 7 underfack", category: "ytlivräddning" },
  { name: "Strumpor", location: "Fack 7 underfack", category: "ytlivräddning" },
  { name: "Flytväst", location: "Fack 7 underfack", category: "ytlivräddning" },
  { name: "Handskar", location: "Fack 7 underfack", category: "ytlivräddning" },
  { name: "Isdubbar", location: "Fack 7 underfack", category: "ytlivräddning" },

  // Fack 7 - Övrigt
  { name: "Personlina i orange säck", location: "Fack 7", category: "räddning" },
  { name: "Linrulle 300m", location: "Fack 7", category: "räddning" },

  // Fack 8
  { name: "Plastrulle", location: "Fack 8", category: "material" },
  { name: "IVPA väska", location: "Fack 8", category: "räddning", checkType: "functional", details: "funktionskontroll, tryck på I + kolla datum pads" },
  { name: "Repsäck taksäkring + sele", location: "Fack 8", category: "räddning", quantity: 2 },
  { name: "Extra sele i påse", location: "Fack 8", category: "räddning" },
  { name: "Spännband", location: "Fack 8", category: "verktyg" },
  { name: "Kabelvinda 25m", location: "Fack 8", category: "verktyg", quantity: 3 },
  { name: "Halvmasker med filter", location: "Fack 8", category: "skydd", quantity: 5 },
  { name: "Arbetsbelysning", location: "Fack 8", category: "verktyg", quantity: 2 },
  { name: "Hylsnyckelsats", location: "Fack 8", category: "verktyg" },
  { name: "Klass 1 pump med sugslang", location: "Fack 8", category: "pump", checkType: "functional", details: "funktionskontroll" },
  { name: "Aspen 4-takt med påfyllnadspip", location: "Fack 8", category: "bränsle" },
  { name: "Spillbag med fodral", location: "Fack 8", category: "material", quantity: 2 },
  { name: "Fläkt", location: "Fack 8", category: "verktyg", checkType: "functional", details: "funktionskontroll" },
  { name: "Morakniv", location: "Fack 8", category: "verktyg" },
  { name: "Säkringar 10A", location: "Fack 8", category: "verktyg", quantity: 1, details: "1 paket" },
  { name: "Säkringar 16A", location: "Fack 8", category: "verktyg", quantity: 1, details: "1 paket" },
  { name: "Adapter 400V/230V", location: "Fack 8", category: "verktyg" },
  { name: "Adapter 230V/230V", location: "Fack 8", category: "verktyg" },
  { name: "Dränkbar pump", location: "Fack 8", category: "pump", quantity: 2, checkType: "functional", details: "funktionskontroll" },
  { name: "Torrdräkt + underställ Medium", location: "Fack 8", category: "skydd" },

  // Under fack 8
  { name: "Slangbrygga", location: "Under fack 8", category: "verktyg" },

  // Mellan hytt och skåp
  { name: "Sopborstar", location: "Mellan hytt och skåp", category: "verktyg", quantity: 2 },
  { name: "Skyffel", location: "Mellan hytt och skåp", category: "verktyg" },

  // Hytt utsida höger
  { name: "Förbandskuddar", location: "Hytt utsida höger", category: "räddning", quantity: 2 },
  { name: "Hörselskydd", location: "Hytt utsida höger", category: "skydd", quantity: 5 },
  { name: "Trafiklampa", location: "Hytt utsida höger", category: "säkerhet", quantity: 4 },
  { name: "Olyckstält", location: "Hytt utsida höger", category: "räddning" },
  { name: "Varningstriangel", location: "Hytt utsida höger", category: "säkerhet" },
  { name: "Verktyg för fällning av hytt", location: "Hytt utsida höger", category: "verktyg" },

  // Hytt tak
  { name: "Livboj med kastlina", location: "Hytt tak", category: "ytlivräddning" },

  // Taklåda
  { name: "Autotraktor vinch", location: "Taklåda", category: "räddning" },
  { name: "Vattenkanon", location: "Taklåda", category: "strålrör" },
  { name: "Trådkorgar", location: "Taklåda", category: "verktyg", quantity: 2 },
  { name: "Plasthink", location: "Taklåda", category: "verktyg" },
  { name: "Sotningssats", location: "Taklåda", category: "verktyg" },
  { name: "Rivpåk stöt", location: "Taklåda", category: "verktyg" },
  { name: "Rivpåk drag", location: "Taklåda", category: "verktyg" },
  { name: "Presenningar", location: "Taklåda", category: "material", quantity: 2 },
  { name: "Eljordstång med krok", location: "Taklåda", category: "verktyg" },
  { name: "Spade gräv", location: "Taklåda", category: "verktyg", quantity: 2 },
  { name: "Slagor", location: "Taklåda", category: "verktyg", quantity: 3 },
  { name: "Slägga", location: "Taklåda", category: "verktyg" },
  { name: "Gummiskrapor", location: "Taklåda", category: "verktyg", quantity: 3 },
  { name: "Utskjutsstege", location: "Taklåda", category: "stegar" },
  { name: "Skarvstege", location: "Taklåda", category: "stegar", quantity: 4, details: "avd." },
  { name: "Klohacka", location: "Taklåda", category: "verktyg" },
  { name: "Lyftband", location: "Taklåda", category: "lyft", quantity: 2 }
];

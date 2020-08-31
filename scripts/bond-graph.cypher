// James Bond Graph
// Source: https://portal.graphgist.org/graph_gists/know-more-about-james-bond-movie/source
// Queried: 30-08-2020
// Update 1: Replaced CREATE UNIQUE by MERGE

MATCH (n)
DETACH DELETE n;

CREATE (:Film {Name: 'Dr. No', Year: 1962, Box: 440759072})
;

CREATE (:Film {Name: 'From Russia with Love', Year: 1963, Box: 576277964})
;

CREATE (:Film {Name: 'Goldfinger', Year: 1964, Box: 912257512})
;

CREATE (:Film {Name: 'Thunderball', Year: 1965, Box: 1014941117})
;

CREATE (:Film {Name: 'You Only Live Twice', Year: 1967, Box: 756544419})
;

CREATE (:Film {Name: "On Her Majesty's Secret Service", Year: 1969, Box: 505899782})
;

CREATE (:Film {Name: 'Diamonds Are Forever', Year: 1971, Box: 648514469})
;

CREATE (:Film {Name: 'Live and Let Die', Year: 1973, Box: 825110761})
;

CREATE (:Film {Name: 'The Man with the Golden Gun', Year: 1974, Box: 448249281})
;

CREATE (:Film {Name: 'The Spy Who Loved Me', Year: 1977, Box: 692713752})
;

CREATE (:Film {Name: 'Moonraker', Year: 1979, Box: 655872400})
;

CREATE (:Film {Name: 'For Your Eyes Only', Year: 1981, Box: 486468881})
;

CREATE (:Film {Name: 'Octopussy', Year: 1983, Box: 426244352})
;

CREATE (:Film {Name: 'A View to a Kill', Year: 1985, Box: 321172633})
;

CREATE (:Film {Name: 'The Living Daylights', Year: 1987, Box: 381088866})
;

CREATE (:Film {Name: 'Licence to Kill', Year: 1989, Box: 285157191})
;

CREATE (:Film {Name: 'GoldenEye', Year: 1995, Box: 529548711})
;

CREATE (:Film {Name: 'Tomorrow Never Dies', Year: 1997, Box: 478946402})
;

CREATE (:Film {Name: 'The World Is Not Enough', Year: 1999, Box: 491617153})
;

CREATE (:Film {Name: 'Die Another Day', Year: 2002, Box: 543639638})
;

CREATE (:Film {Name: 'Casino Royale', Year: 2006, Box: 669789482})
;

CREATE (:Film {Name: 'Quantum of Solace', Year: 2008, Box: 622246378})
;

CREATE (:Film {Name: 'Skyfall', Year: 2012, Box: 1108561008})
;

CREATE (:Film {Name: 'Spectre', Year: 2015, Box: 877470327})
;

CREATE (:People {Name: 'Terence Young'})
;

CREATE (:People {Name: 'Guy Hamilton'})
;

CREATE (:People {Name: 'Lewis Gilbert'})
;

CREATE (:People {Name: 'Peter R. Hunt'})
;

CREATE (:People {Name: 'John Glen'})
;

CREATE (:People {Name: 'Martin Campbell'})
;

CREATE (:People {Name: 'Roger Spottiswoode'})
;

CREATE (:People {Name: 'Michael Apted'})
;

CREATE (:People {Name: 'Lee Tamahori'})
;

CREATE (:People {Name: 'Marc Forster'})
;

CREATE (:People {Name: 'Sam Mendes'})
;

CREATE (:People {Name: 'Sean Connery'})
;

CREATE (:People {Name: 'George Lazenby'})
;

CREATE (:People {Name: 'Roger Moore'})
;

CREATE (:People {Name: 'Timothy Dalton'})
;

CREATE (:People {Name: 'Pierce Brosnan'})
;

CREATE (:People {Name: 'Daniel Craig'})
;

CREATE (:People {Name: 'Eunice Gayson'})
;

CREATE (:People {Name: 'Zena Marshall'})
;

CREATE (:People {Name: 'Ursula Andress'})
;

CREATE (:People {Name: 'Aliza Gur'})
;

CREATE (:People {Name: 'Martine Beswick'})
;

CREATE (:People {Name: 'Daniela Bianchi'})
;

CREATE (:People {Name: 'Shirley Eaton'})
;

CREATE (:People {Name: 'Honor Blackman'})
;

CREATE (:People {Name: 'Molly Peters'})
;

CREATE (:People {Name: 'Luciana Paluzzi'})
;

CREATE (:People {Name: 'Claudine Auger'})
;

CREATE (:People {Name: 'Akiko Wakabayashi'})
;

CREATE (:People {Name: 'Karin Dor'})
;

CREATE (:People {Name: 'Mie Hama'})
;

CREATE (:People {Name: 'Diana Rigg'})
;

CREATE (:People {Name: 'Angela Scoular'})
;

CREATE (:People {Name: 'Catherine Schell'})
;

CREATE (:People {Name: 'Jill St. John'})
;

CREATE (:People {Name: 'Madeline Smith'})
;

CREATE (:People {Name: 'Gloria Hendry'})
;

CREATE (:People {Name: 'Jane Seymour'})
;

CREATE (:People {Name: 'Maud Adams'})
;

CREATE (:People {Name: 'Britt Ekland'})
;

CREATE (:People {Name: 'Sue Vanner'})
;

CREATE (:People {Name: 'Dawn Rodrigues'})
;

CREATE (:People {Name: 'Barbara Bach'})
;

CREATE (:People {Name: 'Corinne Cléry'})
;

CREATE (:People {Name: 'Emily Bolton'})
;

CREATE (:People {Name: 'Lois Chiles'})
;

CREATE (:People {Name: 'Cassandra Harris'})
;

CREATE (:People {Name: 'Carole Bouquet'})
;

CREATE (:People {Name: 'Kristina Wayborn'})
;

CREATE (:People {Name: 'Mary Stävin'})
;

CREATE (:People {Name: 'Grace Jones'})
;

CREATE (:People {Name: 'Fiona Fullerton'})
;

CREATE (:People {Name: 'Tanya Roberts'})
;

CREATE (:People {Name: 'Kell Tyler'})
;

CREATE (:People {Name: "Maryam d'Abo"})
;

CREATE (:People {Name: 'Carey Lowell'})
;

CREATE (:People {Name: 'Talisa Soto'})
;

CREATE (:People {Name: 'Serena Gordon'})
;

CREATE (:People {Name: 'Izabella Scorupco'})
;

CREATE (:People {Name: 'Cecilie Thomsen'})
;

CREATE (:People {Name: 'Teri Hatcher'})
;

CREATE (:People {Name: 'Michelle Yeoh'})
;

CREATE (:People {Name: 'Serena Scott Thomas'})
;

CREATE (:People {Name: 'Sophie Marceau'})
;

CREATE (:People {Name: 'Denise Richards'})
;

CREATE (:People {Name: 'Halle Berry'})
;

CREATE (:People {Name: 'Rosamund Pike'})
;

CREATE (:People {Name: 'Eva Green'})
;

CREATE (:People {Name: 'Gemma Arterton'})
;

CREATE (:People {Name: 'Olga Kurylenko'})
;

CREATE (:People {Name: 'Tonia Sotiropoulou'})
;

CREATE (:People {Name: 'Bérénice Marlohe'})
;

CREATE (:People {Name: 'Stephanie Sigman'})
;

CREATE (:People {Name: 'Monica Bellucci'})
;

CREATE (:People {Name: 'Léa Seydoux'})
;

CREATE (:Vehicle {Brand: 'Alfa', Model: 'Alfa Romeo GTV6'})
;

CREATE (:Vehicle {Brand: 'Alfa', Model: 'Alfa Romeo 159'})
;

CREATE (:Vehicle {Brand: 'Alfa', Model: 'Alfa Romeo 156'})
;

CREATE (:Vehicle {Brand: 'AMC', Model: 'AMC Hornet'})
;

CREATE (:Vehicle {Brand: 'AMC', Model: 'AMC Matador coupe'})
;

CREATE (:Vehicle {Brand: 'AMC', Model: 'AMC Matador sedan'})
;

CREATE (:Vehicle {Brand: 'AMC', Model: 'AMC Concord'})
;

CREATE (:Vehicle {Brand: 'AMC', Model: 'Jeep Wagoneer'})
;

CREATE (:Vehicle {Brand: 'AMC', Model: 'Jeep Cherokee'})
;

CREATE (:Vehicle {Brand: 'AMC', Model: 'Jeep CJ-7'})
;

CREATE (:Vehicle {Brand: 'Aston Martin', Model: 'DB5'})
;

CREATE (:Vehicle {Brand: 'Aston Martin', Model: 'DBS'})
;

CREATE (:Vehicle {Brand: 'Aston Martin', Model: 'V8 Vantage Volante'})
;

CREATE (:Vehicle {Brand: 'Aston Martin', Model: 'V12 Vanquish'})
;

CREATE (:Vehicle {Brand: 'Aston Martin', Model: 'DBS V12'})
;

CREATE (:Vehicle {Brand: 'Aston Martin', Model: 'DB10'})
;

CREATE (:Vehicle {Brand: 'Audi', Model: 'Audi 200'})
;

CREATE (:Vehicle {Brand: 'Audi', Model: 'Audi 100 Avant Quattro'})
;

CREATE (:Vehicle {Brand: 'Audi', Model: 'Audi A6'})
;

CREATE (:Vehicle {Brand: 'Audi', Model: 'Audi A5'})
;

CREATE (:Vehicle {Brand: 'AvtoVAZ', Model: 'VAZ-2106'})
;

CREATE (:Vehicle {Brand: 'AvtoVAZ', Model: 'VAZ-2105'})
;

CREATE (:Vehicle {Brand: 'AvtoVAZ', Model: 'VAZ-2121'})
;

CREATE (:Vehicle {Brand: 'Bentley', Model: '1935 Bentley 3.5 Litredrophead coupé Park Ward'})
;

CREATE (:Vehicle {Brand: 'Bentley', Model: '1937 Bentley 4½ LitreGurney Nutting 3-Position-Drophead Coupé'})
;

CREATE (:Vehicle {Brand: 'BMW', Model: '518i'})
;

CREATE (:Vehicle {Brand: 'BMW', Model: 'Z3'})
;

CREATE (:Vehicle {Brand: 'BMW', Model: '750iL'})
;

CREATE (:Vehicle {Brand: 'BMW', Model: 'R1200C motorcycle'})
;

CREATE (:Vehicle {Brand: 'BMW', Model: 'Z8'})
;

CREATE (:Vehicle {Brand: 'Triumph', Model: 'Triumph Stag'})
;

CREATE (:Vehicle {Brand: 'BMC', Model: 'MGB'})
;

CREATE (:Vehicle {Brand: 'Leyland', Model: 'Leyland Sherpa van'})
;

CREATE (:Vehicle {Brand: 'Rover', Model: 'Austin FX4 taxi'})
;

CREATE (:Vehicle {Brand: 'Rover', Model: 'Rover 800'})
;

CREATE (:Vehicle {Brand: 'Daimler', Model: 'Daimler Limousine'})
;

CREATE (:Vehicle {Brand: 'Citroën', Model: 'Citroën 11 Legere'})
;

CREATE (:Vehicle {Brand: 'Citroën', Model: 'Citroën 2CV'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Anglia 105E'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: '1964 Lincoln Continental'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Country Squire'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Ranchero'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Thunderbird'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'MustangConvertible'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Fairlane Skyliner'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Lincoln Continental'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Mercury Cougar XR7'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Mustang Mach 1'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Econoline'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Custom 500'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Galaxie 500sedan'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'LTD'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Taunus 2.3 Ghia'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Bronco'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Mercury Grand Marquis stretched limousine'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Lincoln Mark VII LSC'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Scorpio'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Fairlane'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Crown Victoria Police Interceptor'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Mondeo 2.5 Litre ST'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Ka'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Edge'})
;

CREATE (:Vehicle {Brand: 'Ford', Model: 'Bronco II'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'LaSalle hearse'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'Chevrolet Bel Airconvertible'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'Chevrolet Impalasedan'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'Vauxhall PA Crestasedan'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'Chevrolet C30 flatbed truck'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'Cadillac hearse'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'Cadillac Fleetwood 60 Special Brougham'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'Chevrolet Impala'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'Chevrolet Chevelle'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'Chevrolet Nova'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'Corvorado'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'Chevrolet Veraneioambulance'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'Chevrolet Corvette C4'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'Cadillac Fleetwood 75 limousine'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'GMC VanduraAmbulance'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'Chevrolet Caprice'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'Vauxhall Omega'})
;

CREATE (:Vehicle {Brand: 'Chevrolet', Model: 'Opel Senator'})
;

CREATE (:Vehicle {Brand: 'Jaguar', Model: 'XKR'})
;

CREATE (:Vehicle {Brand: 'Jaguar', Model: 'XJ8'})
;

CREATE (:Vehicle {Brand: 'Jaguar', Model: 'XJ9'})
;

CREATE (:Vehicle {Brand: 'Jaguar', Model: 'XJ10'})
;

CREATE (:Vehicle {Brand: 'Jaguar', Model: 'XJ'})
;

CREATE (:Vehicle {Brand: 'Jaguar', Model: 'C-X75'})
;

CREATE (:Vehicle {Brand: 'Land Rover', Model: 'Range Rover Classicconvertible'})
;

CREATE (:Vehicle {Brand: 'Land Rover', Model: 'Land Rover Series III'})
;

CREATE (:Vehicle {Brand: 'Land Rover', Model: 'Range Rover Classic'})
;

CREATE (:Vehicle {Brand: 'Land Rover', Model: 'Range Rover (P38A)'})
;

CREATE (:Vehicle {Brand: 'Land Rover', Model: 'Range Rover Sport'})
;

CREATE (:Vehicle {Brand: 'Land Rover', Model: 'Land Rover Defender'})
;

CREATE (:Vehicle {Brand: 'Land Rover', Model: 'Range Rover (L322)'})
;

CREATE (:Vehicle {Brand: 'Land Rover', Model: 'Land Rover Discovery 4'})
;

CREATE (:Vehicle {Brand: 'Land Rover', Model: 'Land Rover Defender Bigfoot'})
;

CREATE (:Vehicle {Brand: 'Land Rover', Model: 'Discovery Sport'})
;

CREATE (:Vehicle {Brand: 'Lotus', Model: 'Lotus Esprit S1'})
;

CREATE (:Vehicle {Brand: 'Lotus', Model: 'Lotus Esprit Turbo'})
;

CREATE (:Vehicle {Brand: 'Mercedes Benz', Model: '180'})
;

CREATE (:Vehicle {Brand: 'Mercedes Benz', Model: '220S'})
;

CREATE (:Vehicle {Brand: 'Mercedes Benz', Model: '600'})
;

CREATE (:Vehicle {Brand: 'Mercedes Benz', Model: 'W115'})
;

CREATE (:Vehicle {Brand: 'Mercedes Benz', Model: '450 SEL'})
;

CREATE (:Vehicle {Brand: 'Mercedes Benz', Model: '250SE'})
;

CREATE (:Vehicle {Brand: 'Mercedes Benz', Model: 'W111'})
;

CREATE (:Vehicle {Brand: 'Mercedes Benz', Model: 'W140'})
;

CREATE (:Vehicle {Brand: 'Mercedes Benz', Model: 'W126s'})
;

CREATE (:Vehicle {Brand: 'Mercedes Benz', Model: 'S400'})
;

CREATE (:Vehicle {Brand: 'Mercedes Benz', Model: 'S-Class'})
;

CREATE (:Vehicle {Brand: 'Rolls-Royce', Model: 'Silver Wraith'})
;

CREATE (:Vehicle {Brand: 'Rolls-Royce', Model: 'Phantom III'})
;

CREATE (:Vehicle {Brand: 'Rolls-Royce', Model: 'Silver Shadow'})
;

CREATE (:Vehicle {Brand: 'Rolls-Royce', Model: 'Silver Wraith II'})
;

CREATE (:Vehicle {Brand: 'Rolls-Royce', Model: 'Phantom III'})
;

CREATE (:Vehicle {Brand: 'Rolls-Royce', Model: 'Silver Cloud II'})
;

CREATE (:Vehicle {Brand: 'Sunbeam', Model: 'Sunbeam Alpine'})
;

CREATE (:Vehicle {Brand: 'Toyota', Model: '2000GT'})
;

CREATE (:Vehicle {Brand: 'Lafer', Model: 'MP Lafer Cabriolet'})
;

CREATE (:Vehicle {Brand: 'Maserati', Model: 'Biturbo'})
;

CREATE (:Vehicle {Brand: 'GAZ', Model: 'GAZ-31029'})
;

CREATE (:Vehicle {Brand: 'ZAZ', Model: 'ZAZ-965'})
;

CREATE (:Vehicle {Brand: 'Volvo', Model: 'Volvo S40'})
;

CREATE (:Vehicle {Brand: 'Volkswagen', Model: 'Beetle'})
;

MATCH (a:People {Name:"Eunice Gayson"}) SET a.Role="Sylvia Trench" ;
MATCH (a:People {Name:"Zena Marshall"}) SET a.Role="Miss Taro" ;
MATCH (a:People {Name:"Ursula Andress"}) SET a.Role="Honey Ryder" ;
MATCH (a:People {Name:"Eunice Gayson"}) SET a.Role="Sylvia Trench" ;
MATCH (a:People {Name:"Aliza Gur"}) SET a.Role="Vida" ;
MATCH (a:People {Name:"Martine Beswick"}) SET a.Role="Zora" ;
MATCH (a:People {Name:"Daniela Bianchi"}) SET a.Role="Tatiana Romanova" ;
MATCH (a:People {Name:"Shirley Eaton"}) SET a.Role="Jill Masterson" ;
MATCH (a:People {Name:"Honor Blackman"}) SET a.Role="Pussy Galore" ;
MATCH (a:People {Name:"Molly Peters"}) SET a.Role="Patricia Pat Fearing" ;
MATCH (a:People {Name:"Luciana Paluzzi"}) SET a.Role="Fiona Volpe" ;
MATCH (a:People {Name:"Claudine Auger"}) SET a.Role="Domino Derval" ;
MATCH (a:People {Name:"Akiko Wakabayashi"}) SET a.Role="Aki" ;
MATCH (a:People {Name:"Karin Dor"}) SET a.Role="Helga Brandt" ;
MATCH (a:People {Name:"Mie Hama"}) SET a.Role="Kissy Suzuki" ;
MATCH (a:People {Name:"Diana Rigg"}) SET a.Role="Teresa di Vicenzo" ;
MATCH (a:People {Name:"Angela Scoular"}) SET a.Role="Ruby Bartlett" ;
MATCH (a:People {Name:"Catherine Schell"}) SET a.Role="Nancy" ;
MATCH (a:People {Name:"Jill St. John"}) SET a.Role="Tiffany Case" ;
MATCH (a:People {Name:"Madeline Smith"}) SET a.Role="Miss Caruso" ;
MATCH (a:People {Name:"Gloria Hendry"}) SET a.Role="Rosie Carver" ;
MATCH (a:People {Name:"Jane Seymour"}) SET a.Role="Solitaire" ;
MATCH (a:People {Name:"Maud Adams"}) SET a.Role="Andrea Anders" ;
MATCH (a:People {Name:"Britt Ekland"}) SET a.Role="Mary Goodnight" ;
MATCH (a:People {Name:"Sue Vanner"}) SET a.Role="Log Cabin Girl" ;
MATCH (a:People {Name:"Dawn Rodrigues"}) SET a.Role="Harem Tent Girl" ;
MATCH (a:People {Name:"Barbara Bach"}) SET a.Role="Anya Amasova" ;
MATCH (a:People {Name:"Corinne Cléry"}) SET a.Role="Corinne Dufour" ;
MATCH (a:People {Name:"Emily Bolton"}) SET a.Role="Manuela" ;
MATCH (a:People {Name:"Lois Chiles"}) SET a.Role="Holly Goodhead" ;
MATCH (a:People {Name:"Cassandra Harris"}) SET a.Role="Countess Lisl von Schlaf" ;
MATCH (a:People {Name:"Carole Bouquet"}) SET a.Role="Melina Havelock" ;
MATCH (a:People {Name:"Kristina Wayborn"}) SET a.Role="Magda" ;
MATCH (a:People {Name:"Maud Adams"}) SET a.Role="Octopussy" ;
MATCH (a:People {Name:"Mary Stävin"}) SET a.Role="Kimberley Jones" ;
MATCH (a:People {Name:"Grace Jones"}) SET a.Role="May Day" ;
MATCH (a:People {Name:"Fiona Fullerton"}) SET a.Role="Pola Ivanova" ;
MATCH (a:People {Name:"Tanya Roberts"}) SET a.Role="Stacey Sutton" ;
MATCH (a:People {Name:"Kell Tyler"}) SET a.Role="Linda" ;
MATCH (a:People {Name:"Maryam d'Abo"}) SET a.Role="Kara Milovy" ;
MATCH (a:People {Name:"Carey Lowell"}) SET a.Role="Pam Bouvier" ;
MATCH (a:People {Name:"Talisa Soto"}) SET a.Role="Lupe Lamora" ;
MATCH (a:People {Name:"Serena Gordon"}) SET a.Role="Caroline" ;
MATCH (a:People {Name:"Izabella Scorupco"}) SET a.Role="Natalya Simonova" ;
MATCH (a:People {Name:"Cecilie Thomsen"}) SET a.Role="Prof. Inga Bergstrøm" ;
MATCH (a:People {Name:"Teri Hatcher"}) SET a.Role="Paris Carver" ;
MATCH (a:People {Name:"Michelle Yeoh"}) SET a.Role="Wai Lin" ;
MATCH (a:People {Name:"Serena Scott Thomas"}) SET a.Role="Dr. Molly Warmflash" ;
MATCH (a:People {Name:"Sophie Marceau"}) SET a.Role="Elektra King" ;
MATCH (a:People {Name:"Denise Richards"}) SET a.Role="Dr. Christmas Jones" ;
MATCH (a:People {Name:"Halle Berry"}) SET a.Role="Giacinta Jinx Johnson" ;
MATCH (a:People {Name:"Rosamund Pike"}) SET a.Role="Miranda Frost" ;
MATCH (a:People {Name:"Eva Green"}) SET a.Role="Vesper Lynd" ;
MATCH (a:People {Name:"Gemma Arterton"}) SET a.Role="Strawberry Fields" ;
MATCH (a:People {Name:"Olga Kurylenko"}) SET a.Role="Camille Montes" ;
MATCH (a:People {Name:"Tonia Sotiropoulou"}) SET a.Role="Bond's Lover" ;
MATCH (a:People {Name:"Bérénice Marlohe"}) SET a.Role="Sévérine" ;
MATCH (a:People {Name:"Stephanie Sigman"}) SET a.Role="Estrella" ;
MATCH (a:People {Name:"Monica Bellucci"}) SET a.Role="Lucia Sciarra" ;
MATCH (a:People {Name:"Léa Seydoux"}) SET a.Role="Dr. Madeleine Swann" ;

MATCH (a:People), (b:Film) WHERE a.Name="Sean Connery" AND b.Name="Dr. No" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Sean Connery" AND b.Name="From Russia with Love" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Sean Connery" AND b.Name="Goldfinger" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Sean Connery" AND b.Name="Thunderball" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Sean Connery" AND b.Name="You Only Live Twice" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="George Lazenby" AND b.Name="On Her Majesty's Secret Service" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Sean Connery" AND b.Name="Diamonds Are Forever" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Roger Moore" AND b.Name="Live and Let Die" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Roger Moore" AND b.Name="The Man with the Golden Gun" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Roger Moore" AND b.Name="The Spy Who Loved Me" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Roger Moore" AND b.Name="Moonraker" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Roger Moore" AND b.Name="For Your Eyes Only" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Roger Moore" AND b.Name="Octopussy" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Roger Moore" AND b.Name="A View to a Kill" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Timothy Dalton" AND b.Name="The Living Daylights" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Timothy Dalton" AND b.Name="Licence to Kill" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Pierce Brosnan" AND b.Name="GoldenEye" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Pierce Brosnan" AND b.Name="Tomorrow Never Dies" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Pierce Brosnan" AND b.Name="The World Is Not Enough" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Pierce Brosnan" AND b.Name="Die Another Day" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Daniel Craig" AND b.Name="Casino Royale" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Daniel Craig" AND b.Name="Quantum of Solace" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Daniel Craig" AND b.Name="Skyfall" MERGE (a)-[r:AS_BOND_IN]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Daniel Craig" AND b.Name="Spectre" MERGE (a)-[r:AS_BOND_IN]->(b);

MATCH (a:People), (b:Film) WHERE a.Name="Terence Young" AND b.Name="Dr. No" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Terence Young" AND b.Name="From Russia with Love" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Guy Hamilton" AND b.Name="Goldfinger" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Terence Young" AND b.Name="Thunderball" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Lewis Gilbert" AND b.Name="You Only Live Twice" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Peter R. Hunt" AND b.Name="On Her Majesty's Secret Service" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Guy Hamilton" AND b.Name="Diamonds Are Forever" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Guy Hamilton" AND b.Name="Live and Let Die" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Guy Hamilton" AND b.Name="The Man with the Golden Gun" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Lewis Gilbert" AND b.Name="The Spy Who Loved Me" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Lewis Gilbert" AND b.Name="Moonraker" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="John Glen" AND b.Name="For Your Eyes Only" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="John Glen" AND b.Name="Octopussy" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="John Glen" AND b.Name="A View to a Kill" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="John Glen" AND b.Name="The Living Daylights" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="John Glen" AND b.Name="Licence to Kill" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Martin Campbell" AND b.Name="GoldenEye" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Roger Spottiswoode" AND b.Name="Tomorrow Never Dies" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Michael Apted" AND b.Name="The World Is Not Enough" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Lee Tamahori" AND b.Name="Die Another Day" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Martin Campbell" AND b.Name="Casino Royale" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Marc Forster" AND b.Name="Quantum of Solace" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Sam Mendes" AND b.Name="Skyfall" MERGE (a)-[r:DIRECTOR_OF]->(b);
MATCH (a:People), (b:Film) WHERE a.Name="Sam Mendes" AND b.Name="Spectre" MERGE (a)-[r:DIRECTOR_OF]->(b);

MATCH (a:Film), (b:People) WHERE a.Name="Dr. No" AND b.Name="Eunice Gayson" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Dr. No" AND b.Name="Zena Marshall" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Dr. No" AND b.Name="Ursula Andress" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="From Russia with Love" AND b.Name="Eunice Gayson" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="From Russia with Love" AND b.Name="Aliza Gur" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="From Russia with Love" AND b.Name="Martine Beswick" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="From Russia with Love" AND b.Name="Daniela Bianchi" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Goldfinger" AND b.Name="Shirley Eaton" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Goldfinger" AND b.Name="Honor Blackman" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Thunderball" AND b.Name="Molly Peters" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Thunderball" AND b.Name="Luciana Paluzzi" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Thunderball" AND b.Name="Claudine Auger" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="You Only Live Twice" AND b.Name="Akiko Wakabayashi" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="You Only Live Twice" AND b.Name="Karin Dor" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="You Only Live Twice" AND b.Name="Mie Hama" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="On Her Majesty's Secret Service" AND b.Name="Diana Rigg" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="On Her Majesty's Secret Service" AND b.Name="Angela Scoular" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="On Her Majesty's Secret Service" AND b.Name="Catherine Schell" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Diamonds Are Forever" AND b.Name="Jill St. John" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Live and Let Die" AND b.Name="Madeline Smith" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Live and Let Die" AND b.Name="Gloria Hendry" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Live and Let Die" AND b.Name="Jane Seymour" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="The Man with the Golden Gun" AND b.Name="Maud Adams" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="The Man with the Golden Gun" AND b.Name="Britt Ekland" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="The Spy Who Loved Me" AND b.Name="Sue Vanner" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="The Spy Who Loved Me" AND b.Name="Dawn Rodrigues" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="The Spy Who Loved Me" AND b.Name="Barbara Bach" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Moonraker" AND b.Name="Corinne Cléry" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Moonraker" AND b.Name="Emily Bolton" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Moonraker" AND b.Name="Lois Chiles" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="For Your Eyes Only" AND b.Name="Cassandra Harris" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="For Your Eyes Only" AND b.Name="Carole Bouquet" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Octopussy" AND b.Name="Kristina Wayborn" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Octopussy" AND b.Name="Maud Adams" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="A View to a Kill" AND b.Name="Mary Stävin" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="A View to a Kill" AND b.Name="Grace Jones" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="A View to a Kill" AND b.Name="Fiona Fullerton" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="A View to a Kill" AND b.Name="Tanya Roberts" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="The Living Daylights" AND b.Name="Kell Tyler" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="The Living Daylights" AND b.Name="Maryam d'Abo" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Licence to Kill" AND b.Name="Carey Lowell" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Licence to Kill" AND b.Name="Talisa Soto" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="GoldenEye" AND b.Name="Serena Gordon" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="GoldenEye" AND b.Name="Izabella Scorupco" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Tomorrow Never Dies" AND b.Name="Cecilie Thomsen" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Tomorrow Never Dies" AND b.Name="Teri Hatcher" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Tomorrow Never Dies" AND b.Name="Michelle Yeoh" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="The World Is Not Enough" AND b.Name="Serena Scott Thomas" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="The World Is Not Enough" AND b.Name="Sophie Marceau" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="The World Is Not Enough" AND b.Name="Denise Richards" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Die Another Day" AND b.Name="Halle Berry" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Die Another Day" AND b.Name="Rosamund Pike" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Casino Royale" AND b.Name="Eva Green" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Quantum of Solace" AND b.Name="Gemma Arterton" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Quantum of Solace" AND b.Name="Olga Kurylenko" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Skyfall" AND b.Name="Tonia Sotiropoulou" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Skyfall" AND b.Name="Bérénice Marlohe" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Spectre" AND b.Name="Stephanie Sigman" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Spectre" AND b.Name="Monica Bellucci" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);
MATCH (a:Film), (b:People) WHERE a.Name="Spectre" AND b.Name="Léa Seydoux" MERGE (b)-[:IS_BOND_GIRL_IN]->(a);

MATCH (a:Film), (b:Vehicle) WHERE a.Name="Octopussy" AND b.Model="Alfa Romeo GTV6" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Quantum of Solace" AND b.Model="Alfa Romeo 159" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Quantum of Solace" AND b.Model="Alfa Romeo 156" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Man With The Golden Gun" AND b.Model="AMC Hornet" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Man With The Golden Gun" AND b.Model="AMC Matador coupe" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Man With The Golden Gun" AND b.Model="AMC Matador sedan" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Moonraker" AND b.Model="AMC Concord" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Moonraker" AND b.Model="Jeep Wagoneer" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="A View to a Kill" AND b.Model="Jeep Cherokee" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Licence to Kill" AND b.Model="Jeep CJ-7" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Tomorrow Never Dies" AND b.Model="Jeep Cherokee" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Goldfinger" AND b.Model="DB5" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Thunderball" AND b.Model="DB5" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="On Her Majesty's Secret Service" AND b.Model="DBS" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Living Daylights" AND b.Model="V8 Vantage Volante" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="GoldenEye" AND b.Model="DB5" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Tomorrow Never Dies" AND b.Model="DB5" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The World Is Not Enough" AND b.Model="DB5" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Die Another Day" AND b.Model="V12 Vanquish" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Casino Royale" AND b.Model="DBS V12" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Casino Royale" AND b.Model="DB5" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Quantum of Solace" AND b.Model="DBS V12" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Skyfall" AND b.Model="DB5" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Spectre" AND b.Model="DB10" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Spectre" AND b.Model="DB5" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Living Daylights" AND b.Model="Audi 200" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Living Daylights" AND b.Model="Audi 100 Avant Quattro" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Quantum of Solace" AND b.Model="Audi A6" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Skyfall" AND b.Model="Audi A5" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Living Daylights" AND b.Model="VAZ-2106" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Living Daylights" AND b.Model="VAZ-2105" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="GoldenEye" AND b.Model="VAZ-2105" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The World Is Not Enough" AND b.Model="VAZ-2121" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="From Russia With Love" AND b.Model="1935 Bentley 3.5 Litredrophead coupé Park Ward" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Never Say Never Again" AND b.Model="1937 Bentley 4½ LitreGurney Nutting 3-Position-Drophead Coupé" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Octopussy" AND b.Model="518i" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="GoldenEye" AND b.Model="Z3" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Tomorrow Never Dies" AND b.Model="750iL" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Tomorrow Never Dies" AND b.Model="R1200C motorcycle" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The World Is Not Enough" AND b.Model="Z8" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Diamonds Are Forever" AND b.Model="Triumph Stag" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Man With The Golden Gun" AND b.Model="MGB" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Spy Who Loved Me" AND b.Model="Leyland Sherpa van" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Octopussy" AND b.Model="Austin FX4 taxi" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Living Daylights" AND b.Model="Rover 800" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Tomorrow Never Dies" AND b.Model="Daimler Limousine" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="From Russia With Love" AND b.Model="Citroën 11 Legere" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="On Her Majesty's Secret Service" AND b.Model="Citroën 2CV" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="For Your Eyes Only" AND b.Model="Citroën 2CV" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Dr. No" AND b.Model="Anglia 105E" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Goldfinger" AND b.Model="1964 Lincoln Continental" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Goldfinger" AND b.Model="Country Squire" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Goldfinger" AND b.Model="Ranchero" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Goldfinger" AND b.Model="Thunderbird" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Goldfinger" AND b.Model="MustangConvertible" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Thunderball" AND b.Model="MustangConvertible" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Thunderball" AND b.Model="Fairlane Skyliner" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Thunderball" AND b.Model="Thunderbird" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Thunderball" AND b.Model="Lincoln Continental" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="On Her Majesty's Secret Service" AND b.Model="Mercury Cougar XR7" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Diamonds Are Forever" AND b.Model="Mustang Mach 1" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Diamonds Are Forever" AND b.Model="Econoline" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Diamonds Are Forever" AND b.Model="Thunderbird" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Diamonds Are Forever" AND b.Model="Custom 500" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Diamonds Are Forever" AND b.Model="Galaxie 500sedan" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Diamonds Are Forever" AND b.Model="LTD" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Spy Who Loved Me" AND b.Model="Taunus 2.3 Ghia" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="A View to a Kill" AND b.Model="Bronco" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="A View to a Kill" AND b.Model="LTD" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Licence to Kill" AND b.Model="Mercury Grand Marquis stretched limousine" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Licence to Kill" AND b.Model="Lincoln Mark VII LSC" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Tomorrow Never Dies" AND b.Model="Scorpio" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Die Another Day" AND b.Model="Thunderbird" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Die Another Day" AND b.Model="Fairlane" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Casino Royale" AND b.Model="Crown Victoria Police Interceptor" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Casino Royale" AND b.Model="Mondeo 2.5 Litre ST" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Quantum of Solace" AND b.Model="Ka" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Quantum of Solace" AND b.Model="Edge" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Quantum of Solace" AND b.Model="Bronco II" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Dr. No" AND b.Model="LaSalle hearse" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Dr. No" AND b.Model="Chevrolet Bel Airconvertible" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Dr. No" AND b.Model="Chevrolet Impalasedan" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Dr. No" AND b.Model="Vauxhall PA Crestasedan" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="From Russia With Love" AND b.Model="Chevrolet C30 flatbed truck" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Diamonds Are Forever" AND b.Model="Cadillac hearse" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Live and Let Die" AND b.Model="Cadillac Fleetwood 60 Special Brougham" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Live and Let Die" AND b.Model="Chevrolet Impala" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Live and Let Die" AND b.Model="Chevrolet Chevelle" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Live and Let Die" AND b.Model="Chevrolet Nova" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Live and Let Die" AND b.Model="Corvorado" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Moonraker" AND b.Model="Chevrolet Veraneioambulance" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="A View to a Kill" AND b.Model="Chevrolet Corvette C4" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="A View to a Kill" AND b.Model="Cadillac Fleetwood 75 limousine" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Living Daylights" AND b.Model="GMC VanduraAmbulance" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Licence to Kill" AND b.Model="Chevrolet Caprice" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Tomorrow Never Dies" AND b.Model="Vauxhall Omega" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Tomorrow Never Dies" AND b.Model="Opel Senator" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Die Another Day" AND b.Model="XKR" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Casino Royale" AND b.Model="XJ8" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Casino Royale" AND b.Model="XJ9" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Quantum of Solace" AND b.Model="XJ10" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Skyfall" AND b.Model="XJ" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Spectre" AND b.Model="C-X75" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Spectre" AND b.Model="XJ8" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Octopussy" AND b.Model="Range Rover Classicconvertible" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Living Daylights" AND b.Model="Land Rover Series III" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Living Daylights" AND b.Model="Range Rover Classic" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Living Daylights" AND b.Model="Land Rover Series III" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Tomorrow Never Dies" AND b.Model="Range Rover (P38A)" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Casino Royale" AND b.Model="Range Rover Sport" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Quantum of Solace" AND b.Model="Range Rover Sport" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Skyfall" AND b.Model="Land Rover Defender" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Skyfall" AND b.Model="Range Rover (L322)" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Skyfall" AND b.Model="Land Rover Discovery 4" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Spectre" AND b.Model="Land Rover Defender Bigfoot" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Spectre" AND b.Model="Range Rover Sport" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Spectre" AND b.Model="Discovery Sport" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Spy Who Loved Me" AND b.Model="Lotus Esprit S1" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="For Your Eyes Only" AND b.Model="Lotus Esprit Turbo" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Goldfinger" AND b.Model="180" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="On Her Majesty's Secret Service" AND b.Model="220S" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="On Her Majesty's Secret Service" AND b.Model="600" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Diamonds Are Forever" AND b.Model="600" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Man With The Golden Gun" AND b.Model="W115" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="For Your Eyes Only" AND b.Model="450 SEL" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Octopussy" AND b.Model="600" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Octopussy" AND b.Model="250SE" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Living Daylights" AND b.Model="W111" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="GoldenEye" AND b.Model="W140" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Tomorrow Never Dies" AND b.Model="W126s" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Skyfall" AND b.Model="S400" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Spectre" AND b.Model="S-Class" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="From Russia with Love" AND b.Model="Silver Wraith" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Goldfinger" AND b.Model="Phantom III" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="On Her Majesty's Secret Service" AND b.Model="Silver Shadow" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The Man With The Golden Gun" AND b.Model="Silver Shadow" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Moonraker" AND b.Model="Silver Shadow" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="For Your Eyes Only" AND b.Model="Silver Wraith II" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Octopussy" AND b.Model="Phantom III" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="A View to a Kill" AND b.Model="Silver Cloud II" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Licence to Kill" AND b.Model="Silver Shadow" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="The World Is Not Enough" AND b.Model="Silver Shadow" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Spectre" AND b.Model="Silver Wraith" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Dr. No" AND b.Model="Sunbeam Alpine" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="You Only Live Twice" AND b.Model="2000GT" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Moonraker" AND b.Model="MP Lafer Cabriolet" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Licence to Kill" AND b.Model="Biturbo" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="GoldenEye" AND b.Model="GAZ-31029" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="GoldenEye" AND b.Model="VAZ-2106" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="GoldenEye" AND b.Model="ZAZ-965" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Quantum of Solace" AND b.Model="Volvo S40" MERGE (a)-[:HAS_VEHICLE]->(b);
MATCH (a:Film), (b:Vehicle) WHERE a.Name="Quantum of Solace" AND b.Model="Beetle" MERGE (a)-[:HAS_VEHICLE]->(b);
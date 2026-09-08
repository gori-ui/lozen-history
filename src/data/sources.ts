export type Source = { id:string; title:string; institution:string; year?:string; url:string; type:'Археологическа публикация'|'Официален източник'|'Първичен материал'|'Каталог'; notes?:string };
export const sources:Source[] = [
 {id:'sofia-municipality-spas',title:'Лозенски манастир „Св. Спас“',institution:'Столична община',url:'https://www.sofia.bg/web/tourism-in-sofia/sofa-holy-mount/-/asset_publisher/dNvQtQd3f7lS/content/lozenski-manastir-sv-spas-',type:'Официален източник'},
 {id:'tourism-spas',title:'Лозенски манастир „Св. Спас“',institution:'Министерство на туризма',url:'https://www.tourism.government.bg/bg/tourist-destinations/2305/3365',type:'Официален източник'},
 {id:'mitropolia-spas',title:'Долнолозенски манастир „Св. Спас“',institution:'Софийска света митрополия',url:'https://mitropolia-sofia.org/2015/02/27/manasti-sv-spas-s-dolni-lozen/',type:'Официален източник'},
 {id:'mitropolia-peter',title:'Манастир „Св. ап. Петър и Павел“',institution:'Софийска света митрополия',url:'https://mitropolia-sofia.org/2015/02/27/manastir-sv-ap-petar-i-pavel-s-dolni-lozen/',type:'Официален източник'},
 {id:'rim-field-2024',title:'Теренни издирвания на територията на Столична община',institution:'Регионален исторически музей — София',year:'2024',url:'https://e-bulletin.sofiahistorymuseum.bg/images/pdf/2024/E-Bulletin-2024_NEW.pdf',type:'Археологическа публикация'},
 {id:'rim-bulletin-2023',title:'Електронен бюлетин на РИМ — София',institution:'Регионален исторически музей — София',year:'2023',url:'https://www.e-bulletine.sofiahistorymuseum.bg/images/pdf/2023/E-bulletine-2023.pdf',type:'Археологическа публикация'},
 {id:'rim-field-reports',title:'Field Surveys in the Lands of Lozen and Kazichene Villages',institution:'РИМ — София / Academia.edu',url:'https://sofiahistorymuseum.academia.edu/AlexanderStanev/FieldReports',type:'Археологическа публикация'},
 {id:'dobromir-photo',title:'Приписка към църковна книга (снимка)',institution:'Първичен материал, предоставен от местен изследовател',url:'#',type:'Първичен материал',notes:'Датировката и пълният текст изискват палеографска проверка.'},
 {id:'oldmaps-sofia',title:'Old maps of Sofia',institution:'OldMapsOnline',url:'https://www.oldmapsonline.org/en/Sofia',type:'Каталог',notes:'Каталог на карти; не е самостоятелно доказателство за локален обект.'},
 {id:'commons-sofia-maps',title:'Category:Maps of Sofia',institution:'Wikimedia Commons',url:'https://commons.wikimedia.org/wiki/Category:Maps_of_Sofia',type:'Каталог',notes:'Публичен каталог; лицензът се проверява за всеки файл отделно.'}
];

import { CityGroup, Place, EditorialRecommendation, CityEditorial } from './types';

export const INITIAL_CITIES: CityGroup[] = [
  {
    city: 'Rzym',
    country: 'Włochy',
    places: [
      {
        id: '1',
        name: 'Pantheon',
        type: 'Kultura',
        location: 'Rzym',
        description: 'Historyczne serce miasta, najlepiej odwiedzić rano.',
        isSaved: true,
      },
      {
        id: '2',
        name: 'Trattoria Da Cesare',
        type: 'Restauracja',
        location: 'Rzym',
        description: 'Autentyczna kuchnia rzymska, konieczna rezerwacja.',
        isSaved: true,
      },
      {
        id: '3',
        name: 'Terrazza Borromini',
        type: 'Kultura',
        location: 'Rzym',
        description: 'Widok na dach, idealny na aperitivo.',
        isSaved: true,
      }
    ]
  },
  {
    city: 'Kopenhaga',
    country: 'Dania',
    places: [
      {
        id: '4',
        name: 'Nyhavn Waterfront',
        type: 'Przyroda',
        location: 'Kopenhaga',
        description: 'Wieczorny spacer wzdłuż kanału.',
        isSaved: true,
      },
      {
        id: '5',
        name: 'Hay House',
        type: 'Zakupy',
        location: 'Kopenhaga',
        description: 'Ikona duńskiego designu.',
        isSaved: true,
      }
    ]
  }
];

export const EDITORIAL_RECOMMENDATIONS: EditorialRecommendation[] = [
  {
    id: 'rec1',
    name: 'Atelier September',
    location: 'Kopenhaga',
    type: 'Kawiarnia',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz5YkwLB_N6wOvFiETUoCobm0Ob9pQiXKaZqgQ9TkW982FOz7Q2eQEE2JfazNviwntAyVkpTDu7YNmbnyhH-BVG20pVlC2Fix1D_2vqqqlLPH50HbDiPg9PmRY6nOxTJ-ZsbtLMhnQxwlh9AFNosNVBMMQ-KUK9l0HVRw8tbyNzg252uhe6xAfEXQ0LSaJb76f3_e85W45-znaiZzdEbTDJEz3CgSKfdaucPatrRizCh3mgKZuoXd8pTuToiqWy9ne006BdgTRIAj_'
  },
  {
    id: 'rec2',
    name: 'Osteria Oggi',
    location: 'Adelajda',
    type: 'Restauracja',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhOxJ41zi7JByeq1ivEcUILj0emWY5MvEOs2nSWMjGDorwANrGXuLnoVvt2XuV5AUfumt5B6sMYKEakkSp5QfVZRccWwSJQ9uS09WqLZOK1qLrlBlmP1F7ZyLEJQuhgsFHpH5GkgWxPYKPwkVPqc5yvlWIZM5SuohgY_1HnuhyBoeJ9_SLUv8XlQXNuoTedkUIhxlRIhhI9zQTuN_AG92--oUAC5rjGk9_lqMQNcvxkAalsQ_iMU4ZWnknjkjGF-h-NkPVD7BWrfNc'
  },
  {
    id: 'rec3',
    name: 'The Standard',
    location: 'Londyn',
    type: 'Hotel',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmukpOsTEySQwagtc3dj8182qIRPBE21hrjmrxDWG0Eo-ic_3Dx3UnX7xON1iAtGd8rHm1xlzTgTplFFZt2MPRtalc_xVfw5W7r1ZFBdcX31LJ4bqikj4nwXAgmgwxgj7pI8hE2jr5DcDBKB_Vw88R6YW7VnVQR8rPIV68JFy7hA_KE6rZMW2u_W40u7y6Hhbs0ZC6omkDpzHJJ_L6CSWsPOqceqaEA50SihZJy3VPky3YZFfuQMUppnQd-Pw9b1UjXRYtN9EZhSRn'
  }
];

export const EXPLORE_CITIES: CityEditorial[] = [
  {
    id: 'lizbona',
    name: 'Lizbona',
    country: 'Portugalia',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6mIoPWYe55ge19J6v1iuGvkvFX6vfOIp1-Bfg8Nf_rIG7tRE4GcKyLMR6-f2xzrCBe_syGHT5KSa637beYx0PFbR0ZNi62nJXgbFMFpIza0HVwgNIxUlB_8Kq4KmW2ksGG6hoyFFCji3m33fms6XT1Ei1f5VMwao2grAu9uRgXQO2BW5NXls9PcxsI_u4oWrdGgfNNC-IrtcQGaaPcW3jqLk-awCPenqvGJ9PE4z7EcbSfagWL5jlWq_739ORa_L6EuSAbqhFnxcG'
  },
  {
    id: 'rzym',
    name: 'Rzym',
    country: 'Włochy',
    description: 'Gdzie starożytne echa rozbrzmiewają na skąpanych w słońcu placach, a każdy kamień opowiada historię wiecznego imperium spoczywającego w nowoczesnej gracji.',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&h=800&fit=crop',
    curatedPlaces: [
      {
        id: 'roma1',
        name: 'Trastevere',
        type: 'Kultura',
        location: 'Rzym',
        category: 'KULTURA',
        description: 'Wędrówka krętymi, porośniętymi bluszczem uliczkami, gdzie prawdziwa dusza Rzymu oddycha w każdym ukrytym dziedzińcu i bohemicznym tarasie.',
        imageUrl: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800&h=600&fit=crop'
      },
      {
        id: 'roma2',
        name: 'Roscioli Salumeria',
        type: 'Restauracja',
        location: 'Rzym',
        category: 'JEDZENIE',
        description: 'Instytucja rzymskiego smaku. Skosztuj najlepszego wyboru pecorino, guanciale i win rocznikowych w otoczeniu wyrafinowanej tradycji.',
        imageUrl: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800&h=600&fit=crop'
      },
      {
        id: 'roma3',
        name: 'Willa Borghese',
        type: 'Przyroda',
        location: 'Rzym',
        category: 'PRZYRODA',
        description: 'Zielone serce miasta. Rozległy krajobraz neoklasycystycznych ogrodów, spokojnych stawów i jednych z najpiękniejszych rzeźb na świecie.',
        imageUrl: 'https://images.unsplash.com/photo-1542332213-31f87348057f?w=800&h=600&fit=crop'
      },
      {
        id: 'roma4',
        name: 'Loran',
        type: 'Zakupy',
        location: 'Rzym',
        category: 'ZAKUPY',
        description: 'Starannie dobrane sanktuarium dla wymagających. Odkryj skrupulatną selekcję współczesnego włoskiego wzornictwa i rzadkich znalezisk vintage.',
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop'
      },
      {
        id: 'roma5',
        name: 'Koloseum',
        type: 'Kultura',
        location: 'Rzym',
        category: 'KULTURA',
        description: 'Monumentalne świadectwo potęgi Cesarstwa Rzymskiego. Odkryj sekrety gladiatorów w cieniu największego amfiteatru świata.',
        imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop'
      },
      {
        id: 'roma6',
        name: 'Fontana di Trevi',
        type: 'Kultura',
        location: 'Rzym',
        category: 'KULTURA',
        description: 'Barokowe arcydzieło wody i kamienia. Wrzuć monetę, by zagwarantować sobie powrót do Wiecznego Miasta pod okiem Neptuna.',
        imageUrl: 'https://images.unsplash.com/photo-1515542641795-1507a783a9e3?w=800&h=600&fit=crop'
      },
      {
        id: 'roma7',
        name: 'Schody Hiszpańskie',
        type: 'Kultura',
        location: 'Rzym',
        category: 'KULTURA',
        description: 'Miejsce spotkań artystów i marzycieli. Najszersze schody w Europie, prowadzące od tętniącej życiem Piazza di Spagna.',
        imageUrl: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=800&h=600&fit=crop'
      },
      {
        id: 'roma8',
        name: 'Muzea Watykańskie',
        type: 'Kultura',
        location: 'Rzym',
        category: 'KULTURA',
        description: 'Skarbnica ludzkiego geniuszu. Od Kaplicy Sykstyńskiej po Schody Bramantego – podróż przez wieki sztuki i wiary.',
        imageUrl: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&h=600&fit=crop'
      },
      {
        id: 'roma9',
        name: 'Campo de\' Fiori',
        type: 'Restauracja',
        location: 'Rzym',
        category: 'JEDZENIE',
        description: 'Tętniące serce rzymskiego życia codziennego. Za dnia kolorowy targ pełen świeżych owoców i kwiatów.',
        imageUrl: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=800&h=600&fit=crop'
      }
    ]
  },
  {
    id: 'kopenhaga',
    name: 'Kopenhaga',
    country: 'Dania',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi6n0_olHAIPlWKGm9fUB1Bs9QthwMnMnTQ398HpmwPozEX5Fes5v-jL75igv6gZiieCbmjzQJwJ_g3Wp-ja10YEYL0kue4zoqBu8bBA_pwfjiWBWCp7IS6016ZJ9xl5yVjKe9ud53TDf0w7uSUKAKRs4TFMKFn6hxNfkxSOSHSIXwdwb1hfNB6CbNLA6TzPZV9XZeyhBiVTNgC2wxMW0vQepUfhBlv8bHm6De1es_bCbLw4afxWQHTD0OJungK3k8heFGG3w5AmU3'
  },
  {
    id: 'berlin',
    name: 'Berlin',
    country: 'Niemcy',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-FpMU4feACUJO9xQ9m79Kethq9nHc7QQBTR7EkZh05b3o3fX-oKdrngvzWgT3SDX3dprU-XdM3pa5C0dpw6xnKRA1BzNaXBut1h57PVSyO7YdVjUYJjgF9wkrsdMtkh5-LDfhQmSRCHEndpxuxXQr3R1imPrAoYJzw64hYhArgJFT8mA4A-GSoHmvMkRYJBgcYucYYs2NDHnE7fFVzvsqubg4Fdyvu4qVmNAmM2fPqeXUwYOf29OgafiErCqMimhJtyw6KXvwRtGp'
  },
  {
    id: 'kioto',
    name: 'Kioto',
    country: 'Japonia',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW1mskJDtTMVk0ay7SaeacNyyry1vRG2jlSfc3OlY0pBa1fHAJPgO5Kz7WSGrtSsEvCJL-SPuVQ8pqB6ftkNKLoRrXCtRcQZCkqFoDHIZ64WoxXAdODAK95vlmRBUmSECP_lk1ohdcUoDueHKV605eesRiMrFyKM5QrUjemuqaJCOGiiJZ_K9DqHafnoZE95dpBngAKjeEsxBY5agJgIbCZPtZEOifAzOwzSMpZwYtassotKodrNWvVu3VPZgIGsCzZj3L9IJMf5J7'
  }
];

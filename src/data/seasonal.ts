export const SEASONAL_INGREDIENTS = {
  inverno: {
    verdura: [
      'Cavolfiore', 'Broccoli', 'Verza', 'Finocchi', 'Spinaci', 
      'Radicchio', 'Cardi', 'Zucca', 'Cime di rapa', 'Carciofi'
    ],
    frutta: [
      'Arance', 'Mandarini', 'Kiwi', 'Pere', 'Mele', 
      'Pompelmo', 'Melograno'
    ]
  },
  primavera: {
    verdura: [
      'Asparagi', 'Agretti', 'Fave', 'Piselli', 'Carciofi', 
      'Ravanelli', 'Lattuga', 'Rucola'
    ],
    frutta: [
      'Fragole', 'Cieglie', 'Nespole', 'Albicocche'
    ]
  },
  estate: {
    verdura: [
      'Pomodori', 'Zucchine', 'Melanzane', 'Peperoni', 'Fagiolini', 
      'Cetrioli', 'Rucola', 'Basilico'
    ],
    frutta: [
      'Pesche', 'Albicocche', 'Anguria', 'Melone', 'Susine', 
      'Fichi', 'Lamponi', 'More'
    ]
  },
  autunno: {
    verdura: [
      'Zucca', 'Funghi', 'Broccoli', 'Cavolfiore', 'Bietole', 
      'Spinaci', 'Verza'
    ],
    frutta: [
      'Uva', 'Cachi', 'Castagne', 'Melograno', 'Pere', 'Mele', 'Kiwi'
    ]
  }
};

export const getSeason = (date: Date): keyof typeof SEASONAL_INGREDIENTS => {
  const month = date.getMonth(); // 0-11
  // Simple approximation
  if (month >= 2 && month <= 5) return 'primavera';
  if (month >= 6 && month <= 8) return 'estate';
  if (month >= 9 && month <= 11) return 'autunno';
  return 'inverno';
};

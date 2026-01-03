import { DayPlan, FridgeItem } from '@/types/diet';

export const sampleWeekPlan: DayPlan[] = [
  // Lunedì
  {
    id: '1',
    date: '2026-01-05',
    meals: [
      {
        id: 'lun-col',
        type: 'colazione',
        confirmed: false,
        recipes: [
          {
            id: 'r-lun-col',
            name: 'Wasa con Philadelphia e avocado',
            ingredients: [
              { id: 'i1', name: 'Wasa', quantity: 40, unit: 'g' },
              { id: 'i2', name: 'Philadelphia', quantity: 30, unit: 'g' },
              { id: 'i3', name: 'Avocado', quantity: 40, unit: 'g' },
            ],
            prepTime: 5,
          },
        ],
      },
      {
        id: 'lun-spu',
        type: 'spuntino',
        confirmed: false,
        recipes: [
          {
            id: 'r-lun-spu',
            name: 'Wasa con cioccolato fondente',
            ingredients: [
              { id: 'i4', name: 'Wasa', quantity: 20, unit: 'g' },
              { id: 'i5', name: 'Cioccolato fondente', quantity: 10, unit: 'g' },
            ],
            prepTime: 2,
          },
        ],
      },
      {
        id: 'lun-pra',
        type: 'pranzo',
        confirmed: false,
        recipes: [
          {
            id: 'r-lun-pra',
            name: 'Riso basmati con tonno e verdure',
            ingredients: [
              { id: 'i6', name: 'Riso basmati', quantity: 80, unit: 'g' },
              { id: 'i7', name: 'Tonno', quantity: 120, unit: 'g' },
              { id: 'i8', name: 'Verdure', quantity: 200, unit: 'g' },
              { id: 'i9', name: 'Olio EVO', quantity: 10, unit: 'g' },
            ],
            prepTime: 25,
          },
        ],
      },
      {
        id: 'lun-mer',
        type: 'spuntino',
        confirmed: false,
        recipes: [
          {
            id: 'r-lun-mer',
            name: 'Frutta con mandorle',
            ingredients: [
              { id: 'i10', name: 'Frutta', quantity: 150, unit: 'g' },
              { id: 'i11', name: 'Mandorle', quantity: 10, unit: 'g' },
            ],
            prepTime: 2,
          },
        ],
      },
      {
        id: 'lun-cen',
        type: 'cena',
        confirmed: false,
        recipes: [
          {
            id: 'r-lun-cen',
            name: 'Frese con uova e verdure',
            ingredients: [
              { id: 'i12', name: 'Frese', quantity: 30, unit: 'g' },
              { id: 'i13', name: 'Uova', quantity: 110, unit: 'g' },
              { id: 'i14', name: 'Verdure', quantity: 250, unit: 'g' },
              { id: 'i15', name: 'Olio EVO', quantity: 10, unit: 'g' },
            ],
            prepTime: 20,
          },
        ],
      },
    ],
  },
  // Martedì
  {
    id: '2',
    date: '2026-01-06',
    meals: [
      {
        id: 'mar-col',
        type: 'colazione',
        confirmed: false,
        recipes: [
          {
            id: 'r-mar-col',
            name: 'Wasa con Philadelphia e avocado',
            ingredients: [
              { id: 'i16', name: 'Wasa', quantity: 40, unit: 'g' },
              { id: 'i17', name: 'Philadelphia', quantity: 30, unit: 'g' },
              { id: 'i18', name: 'Avocado', quantity: 40, unit: 'g' },
            ],
            prepTime: 5,
          },
        ],
      },
      {
        id: 'mar-spu',
        type: 'spuntino',
        confirmed: false,
        recipes: [
          {
            id: 'r-mar-spu',
            name: 'Banana con mandorle',
            ingredients: [
              { id: 'i19', name: 'Banana', quantity: 150, unit: 'g' },
              { id: 'i20', name: 'Mandorle', quantity: 10, unit: 'g' },
            ],
            prepTime: 2,
          },
        ],
      },
      {
        id: 'mar-pra',
        type: 'pranzo',
        confirmed: false,
        recipes: [
          {
            id: 'r-mar-pra',
            name: 'Riso basmati con ceci e verdure',
            ingredients: [
              { id: 'i21', name: 'Riso basmati', quantity: 80, unit: 'g' },
              { id: 'i22', name: 'Ceci', quantity: 60, unit: 'g' },
              { id: 'i23', name: 'Verdure', quantity: 200, unit: 'g' },
              { id: 'i24', name: 'Olio EVO', quantity: 10, unit: 'g' },
            ],
            prepTime: 25,
          },
        ],
      },
      {
        id: 'mar-mer',
        type: 'spuntino',
        confirmed: false,
        recipes: [
          {
            id: 'r-mar-mer',
            name: 'Frutta con Actimel bianco',
            ingredients: [
              { id: 'i25', name: 'Frutta', quantity: 150, unit: 'g' },
              { id: 'i26', name: 'Actimel bianco', quantity: 100, unit: 'g' },
            ],
            prepTime: 2,
          },
        ],
      },
      {
        id: 'mar-cen',
        type: 'cena',
        confirmed: false,
        recipes: [
          {
            id: 'r-mar-cen',
            name: 'Frese con merluzzo e verdure',
            ingredients: [
              { id: 'i27', name: 'Frese', quantity: 35, unit: 'g' },
              { id: 'i28', name: 'Merluzzo', quantity: 250, unit: 'g' },
              { id: 'i29', name: 'Verdure', quantity: 250, unit: 'g' },
              { id: 'i30', name: 'Olio EVO', quantity: 10, unit: 'g' },
            ],
            prepTime: 30,
          },
        ],
      },
    ],
  },
  // Mercoledì
  {
    id: '3',
    date: '2026-01-07',
    meals: [
      {
        id: 'mer-col',
        type: 'colazione',
        confirmed: false,
        recipes: [
          {
            id: 'r-mer-col',
            name: 'Wasa con uovo e avocado',
            ingredients: [
              { id: 'i31', name: 'Wasa', quantity: 40, unit: 'g' },
              { id: 'i32', name: 'Uovo', quantity: 55, unit: 'g' },
              { id: 'i33', name: 'Avocado', quantity: 40, unit: 'g' },
            ],
            prepTime: 10,
          },
        ],
      },
      {
        id: 'mer-spu',
        type: 'spuntino',
        confirmed: false,
        recipes: [
          {
            id: 'r-mer-spu',
            name: 'Frutta con mandorle',
            ingredients: [
              { id: 'i34', name: 'Frutta', quantity: 150, unit: 'g' },
              { id: 'i35', name: 'Mandorle', quantity: 10, unit: 'g' },
            ],
            prepTime: 2,
          },
        ],
      },
      {
        id: 'mer-pra',
        type: 'pranzo',
        confirmed: false,
        recipes: [
          {
            id: 'r-mer-pra',
            name: 'Pasta integrale con tonno e verdure',
            ingredients: [
              { id: 'i36', name: 'Pasta integrale', quantity: 80, unit: 'g' },
              { id: 'i37', name: 'Tonno', quantity: 120, unit: 'g' },
              { id: 'i38', name: 'Verdure', quantity: 200, unit: 'g' },
              { id: 'i39', name: 'Olio EVO', quantity: 10, unit: 'g' },
            ],
            prepTime: 20,
          },
        ],
      },
      {
        id: 'mer-mer',
        type: 'spuntino',
        confirmed: false,
        recipes: [
          {
            id: 'r-mer-mer',
            name: 'Frutta con mandorle',
            ingredients: [
              { id: 'i40', name: 'Frutta', quantity: 150, unit: 'g' },
              { id: 'i41', name: 'Mandorle', quantity: 10, unit: 'g' },
            ],
            prepTime: 2,
          },
        ],
      },
      {
        id: 'mer-cen',
        type: 'cena',
        confirmed: false,
        recipes: [
          {
            id: 'r-mer-cen',
            name: 'Frese con pollo e verdure',
            ingredients: [
              { id: 'i42', name: 'Frese', quantity: 35, unit: 'g' },
              { id: 'i43', name: 'Pollo', quantity: 200, unit: 'g' },
              { id: 'i44', name: 'Verdure', quantity: 250, unit: 'g' },
              { id: 'i45', name: 'Olio EVO', quantity: 10, unit: 'g' },
            ],
            prepTime: 30,
          },
        ],
      },
    ],
  },
  // Giovedì
  {
    id: '4',
    date: '2026-01-08',
    meals: [
      {
        id: 'gio-col',
        type: 'colazione',
        confirmed: false,
        recipes: [
          {
            id: 'r-gio-col',
            name: 'Wasa con Philadelphia e avocado',
            ingredients: [
              { id: 'i46', name: 'Wasa', quantity: 40, unit: 'g' },
              { id: 'i47', name: 'Philadelphia', quantity: 30, unit: 'g' },
              { id: 'i48', name: 'Avocado', quantity: 40, unit: 'g' },
            ],
            prepTime: 5,
          },
        ],
      },
      {
        id: 'gio-spu',
        type: 'spuntino',
        confirmed: false,
        recipes: [
          {
            id: 'r-gio-spu',
            name: 'Wasa con cioccolato fondente',
            ingredients: [
              { id: 'i49', name: 'Wasa', quantity: 20, unit: 'g' },
              { id: 'i50', name: 'Cioccolato fondente', quantity: 10, unit: 'g' },
            ],
            prepTime: 2,
          },
        ],
      },
      {
        id: 'gio-pra',
        type: 'pranzo',
        confirmed: false,
        recipes: [
          {
            id: 'r-gio-pra',
            name: 'Riso basmati con ceci e verdure',
            ingredients: [
              { id: 'i51', name: 'Riso basmati', quantity: 80, unit: 'g' },
              { id: 'i52', name: 'Ceci', quantity: 60, unit: 'g' },
              { id: 'i53', name: 'Verdure', quantity: 200, unit: 'g' },
              { id: 'i54', name: 'Olio EVO', quantity: 10, unit: 'g' },
            ],
            prepTime: 25,
          },
        ],
      },
      {
        id: 'gio-mer',
        type: 'spuntino',
        confirmed: false,
        recipes: [
          {
            id: 'r-gio-mer',
            name: 'Frutta con Actimel bianco',
            ingredients: [
              { id: 'i55', name: 'Frutta', quantity: 150, unit: 'g' },
              { id: 'i56', name: 'Actimel bianco', quantity: 100, unit: 'g' },
            ],
            prepTime: 2,
          },
        ],
      },
      {
        id: 'gio-cen',
        type: 'cena',
        confirmed: false,
        recipes: [
          {
            id: 'r-gio-cen',
            name: 'Frese con uova e verdure',
            ingredients: [
              { id: 'i57', name: 'Frese', quantity: 30, unit: 'g' },
              { id: 'i58', name: 'Uova', quantity: 110, unit: 'g' },
              { id: 'i59', name: 'Verdure', quantity: 250, unit: 'g' },
              { id: 'i60', name: 'Olio EVO', quantity: 10, unit: 'g' },
            ],
            prepTime: 20,
          },
        ],
      },
    ],
  },
  // Venerdì
  {
    id: '5',
    date: '2026-01-09',
    meals: [
      {
        id: 'ven-col',
        type: 'colazione',
        confirmed: false,
        recipes: [
          {
            id: 'r-ven-col',
            name: 'Wasa con uovo e avocado',
            ingredients: [
              { id: 'i61', name: 'Wasa', quantity: 40, unit: 'g' },
              { id: 'i62', name: 'Uovo', quantity: 55, unit: 'g' },
              { id: 'i63', name: 'Avocado', quantity: 40, unit: 'g' },
            ],
            prepTime: 10,
          },
        ],
      },
      {
        id: 'ven-spu',
        type: 'spuntino',
        confirmed: false,
        recipes: [
          {
            id: 'r-ven-spu',
            name: 'Frutta con mandorle',
            ingredients: [
              { id: 'i64', name: 'Frutta', quantity: 150, unit: 'g' },
              { id: 'i65', name: 'Mandorle', quantity: 10, unit: 'g' },
            ],
            prepTime: 2,
          },
        ],
      },
      {
        id: 'ven-pra',
        type: 'pranzo',
        confirmed: false,
        recipes: [
          {
            id: 'r-ven-pra',
            name: 'Pasta integrale con tonno e verdure',
            ingredients: [
              { id: 'i66', name: 'Pasta integrale', quantity: 80, unit: 'g' },
              { id: 'i67', name: 'Tonno', quantity: 120, unit: 'g' },
              { id: 'i68', name: 'Verdure', quantity: 200, unit: 'g' },
              { id: 'i69', name: 'Olio EVO', quantity: 10, unit: 'g' },
            ],
            prepTime: 20,
          },
        ],
      },
      {
        id: 'ven-mer',
        type: 'spuntino',
        confirmed: false,
        recipes: [
          {
            id: 'r-ven-mer',
            name: 'Frutta con yogurt bianco magro',
            ingredients: [
              { id: 'i70', name: 'Frutta', quantity: 150, unit: 'g' },
              { id: 'i71', name: 'Yogurt bianco magro', quantity: 125, unit: 'g' },
            ],
            prepTime: 2,
          },
        ],
      },
      {
        id: 'ven-cen',
        type: 'cena',
        confirmed: false,
        recipes: [
          {
            id: 'r-ven-cen',
            name: 'Frese con merluzzo e verdure',
            ingredients: [
              { id: 'i72', name: 'Frese', quantity: 35, unit: 'g' },
              { id: 'i73', name: 'Merluzzo', quantity: 250, unit: 'g' },
              { id: 'i74', name: 'Verdure', quantity: 250, unit: 'g' },
              { id: 'i75', name: 'Olio EVO', quantity: 10, unit: 'g' },
            ],
            prepTime: 30,
          },
        ],
      },
    ],
  },
  // Sabato
  {
    id: '6',
    date: '2026-01-10',
    meals: [
      {
        id: 'sab-col',
        type: 'colazione',
        confirmed: false,
        recipes: [
          {
            id: 'r-sab-col',
            name: 'Frese con tacchino e frutta secca',
            ingredients: [
              { id: 'i76', name: 'Frese', quantity: 25, unit: 'g' },
              { id: 'i77', name: 'Tacchino', quantity: 50, unit: 'g' },
              { id: 'i78', name: 'Frutta secca', quantity: 10, unit: 'g' },
            ],
            prepTime: 5,
          },
        ],
      },
      {
        id: 'sab-spu',
        type: 'spuntino',
        confirmed: false,
        recipes: [
          {
            id: 'r-sab-spu',
            name: 'Frutta con cioccolato fondente',
            ingredients: [
              { id: 'i79', name: 'Frutta', quantity: 150, unit: 'g' },
              { id: 'i80', name: 'Cioccolato fondente', quantity: 10, unit: 'g' },
            ],
            prepTime: 2,
          },
        ],
      },
      {
        id: 'sab-pra',
        type: 'pranzo',
        confirmed: false,
        recipes: [
          {
            id: 'r-sab-pra',
            name: 'Riso basmati con tonno e verdure',
            ingredients: [
              { id: 'i81', name: 'Riso basmati', quantity: 80, unit: 'g' },
              { id: 'i82', name: 'Tonno', quantity: 120, unit: 'g' },
              { id: 'i83', name: 'Verdure', quantity: 200, unit: 'g' },
              { id: 'i84', name: 'Olio EVO', quantity: 10, unit: 'g' },
            ],
            prepTime: 25,
          },
        ],
      },
      {
        id: 'sab-mer',
        type: 'spuntino',
        confirmed: false,
        recipes: [
          {
            id: 'r-sab-mer',
            name: 'Frutta con Actimel bianco',
            ingredients: [
              { id: 'i85', name: 'Frutta', quantity: 150, unit: 'g' },
              { id: 'i86', name: 'Actimel bianco', quantity: 100, unit: 'g' },
            ],
            prepTime: 2,
          },
        ],
      },
      {
        id: 'sab-cen',
        type: 'cena',
        confirmed: false,
        recipes: [
          {
            id: 'r-sab-cen',
            name: 'Pizza 🍕',
            ingredients: [
              { id: 'i87', name: 'Pizza', quantity: 400, unit: 'g' },
            ],
            prepTime: 0,
          },
        ],
      },
    ],
  },
  // Domenica
  {
    id: '7',
    date: '2026-01-11',
    meals: [
      {
        id: 'dom-col',
        type: 'colazione',
        confirmed: false,
        recipes: [
          {
            id: 'r-dom-col',
            name: 'Pane integrale con avocado e yogurt',
            ingredients: [
              { id: 'i88', name: 'Pane integrale', quantity: 40, unit: 'g' },
              { id: 'i89', name: 'Avocado', quantity: 40, unit: 'g' },
              { id: 'i90', name: 'Yogurt bianco magro', quantity: 125, unit: 'g' },
            ],
            prepTime: 5,
          },
        ],
      },
      {
        id: 'dom-spu',
        type: 'spuntino',
        confirmed: false,
        recipes: [
          {
            id: 'r-dom-spu',
            name: 'Frutta con yogurt bianco magro',
            ingredients: [
              { id: 'i91', name: 'Frutta', quantity: 150, unit: 'g' },
              { id: 'i92', name: 'Yogurt bianco magro', quantity: 125, unit: 'g' },
            ],
            prepTime: 2,
          },
        ],
      },
      {
        id: 'dom-pra',
        type: 'pranzo',
        confirmed: false,
        recipes: [
          {
            id: 'r-dom-pra',
            name: 'Riso basmati con uova e verdure',
            ingredients: [
              { id: 'i93', name: 'Riso basmati', quantity: 80, unit: 'g' },
              { id: 'i94', name: 'Uova', quantity: 110, unit: 'g' },
              { id: 'i95', name: 'Verdure', quantity: 200, unit: 'g' },
              { id: 'i96', name: 'Olio EVO', quantity: 10, unit: 'g' },
            ],
            prepTime: 25,
          },
        ],
      },
      {
        id: 'dom-mer',
        type: 'spuntino',
        confirmed: false,
        recipes: [
          {
            id: 'r-dom-mer',
            name: 'Frutta con mandorle',
            ingredients: [
              { id: 'i97', name: 'Frutta', quantity: 150, unit: 'g' },
              { id: 'i98', name: 'Mandorle', quantity: 10, unit: 'g' },
            ],
            prepTime: 2,
          },
        ],
      },
      {
        id: 'dom-cen',
        type: 'cena',
        confirmed: false,
        recipes: [
          {
            id: 'r-dom-cen',
            name: 'Frese con pollo e verdure',
            ingredients: [
              { id: 'i99', name: 'Frese', quantity: 35, unit: 'g' },
              { id: 'i100', name: 'Pollo', quantity: 200, unit: 'g' },
              { id: 'i101', name: 'Verdure', quantity: 200, unit: 'g' },
              { id: 'i102', name: 'Olio EVO', quantity: 10, unit: 'g' },
            ],
            prepTime: 30,
          },
        ],
      },
    ],
  },
];

export const sampleFridge: FridgeItem[] = [
  { id: 'f1', name: 'Wasa', quantity: 200, unit: 'g', category: 'altro' },
  { id: 'f2', name: 'Philadelphia', quantity: 150, unit: 'g', category: 'latticini', expiryDate: '2026-01-15' },
  { id: 'f3', name: 'Avocado', quantity: 3, unit: 'pz', category: 'verdure', expiryDate: '2026-01-08' },
  { id: 'f4', name: 'Riso basmati', quantity: 500, unit: 'g', category: 'altro' },
  { id: 'f5', name: 'Tonno in scatola', quantity: 240, unit: 'g', category: 'proteine' },
  { id: 'f6', name: 'Uova', quantity: 6, unit: 'pz', category: 'proteine', expiryDate: '2026-01-12' },
  { id: 'f7', name: 'Mandorle', quantity: 100, unit: 'g', category: 'altro' },
  { id: 'f8', name: 'Frese', quantity: 200, unit: 'g', category: 'altro' },
  { id: 'f9', name: 'Cioccolato fondente', quantity: 50, unit: 'g', category: 'altro' },
  { id: 'f10', name: 'Olio EVO', quantity: 500, unit: 'ml', category: 'altro' },
];

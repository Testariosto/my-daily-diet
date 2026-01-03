import { DayPlan, FridgeItem } from '@/types/diet';

export const sampleWeekPlan: DayPlan[] = [
  {
    id: '1',
    date: '2026-01-05',
    meals: [
      {
        id: 'm1',
        type: 'colazione',
        confirmed: false,
        recipes: [
          {
            id: 'r1',
            name: 'Porridge con frutti di bosco',
            ingredients: [
              { id: 'i1', name: 'Fiocchi d\'avena', quantity: 50, unit: 'g' },
              { id: 'i2', name: 'Latte di mandorla', quantity: 200, unit: 'ml' },
              { id: 'i3', name: 'Mirtilli', quantity: 50, unit: 'g' },
              { id: 'i4', name: 'Miele', quantity: 10, unit: 'g' },
            ],
            prepTime: 10,
          },
          {
            id: 'r2',
            name: 'Yogurt greco con granola',
            ingredients: [
              { id: 'i5', name: 'Yogurt greco', quantity: 150, unit: 'g' },
              { id: 'i6', name: 'Granola', quantity: 40, unit: 'g' },
              { id: 'i7', name: 'Banana', quantity: 1, unit: 'pz' },
            ],
            prepTime: 5,
          },
        ],
      },
      {
        id: 'm2',
        type: 'pranzo',
        confirmed: false,
        recipes: [
          {
            id: 'r3',
            name: 'Insalata di quinoa con verdure',
            ingredients: [
              { id: 'i8', name: 'Quinoa', quantity: 80, unit: 'g' },
              { id: 'i9', name: 'Pomodorini', quantity: 100, unit: 'g' },
              { id: 'i10', name: 'Cetriolo', quantity: 100, unit: 'g' },
              { id: 'i11', name: 'Feta', quantity: 50, unit: 'g' },
              { id: 'i12', name: 'Olio EVO', quantity: 15, unit: 'ml' },
            ],
            prepTime: 25,
          },
          {
            id: 'r4',
            name: 'Poke bowl al salmone',
            ingredients: [
              { id: 'i13', name: 'Riso basmati', quantity: 80, unit: 'g' },
              { id: 'i14', name: 'Salmone fresco', quantity: 120, unit: 'g' },
              { id: 'i15', name: 'Avocado', quantity: 50, unit: 'g' },
              { id: 'i16', name: 'Edamame', quantity: 40, unit: 'g' },
              { id: 'i17', name: 'Salsa di soia', quantity: 15, unit: 'ml' },
            ],
            prepTime: 20,
          },
        ],
      },
      {
        id: 'm3',
        type: 'cena',
        confirmed: false,
        recipes: [
          {
            id: 'r5',
            name: 'Petto di pollo con verdure grigliate',
            ingredients: [
              { id: 'i18', name: 'Petto di pollo', quantity: 150, unit: 'g' },
              { id: 'i19', name: 'Zucchine', quantity: 150, unit: 'g' },
              { id: 'i20', name: 'Peperoni', quantity: 100, unit: 'g' },
              { id: 'i21', name: 'Olio EVO', quantity: 10, unit: 'ml' },
            ],
            prepTime: 30,
          },
        ],
      },
      {
        id: 'm4',
        type: 'spuntino',
        confirmed: false,
        recipes: [
          {
            id: 'r6',
            name: 'Frutta secca mista',
            ingredients: [
              { id: 'i22', name: 'Mandorle', quantity: 20, unit: 'g' },
              { id: 'i23', name: 'Noci', quantity: 15, unit: 'g' },
            ],
            prepTime: 0,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    date: '2026-01-06',
    meals: [
      {
        id: 'm5',
        type: 'colazione',
        confirmed: false,
        recipes: [
          {
            id: 'r7',
            name: 'Toast integrale con avocado',
            ingredients: [
              { id: 'i24', name: 'Pane integrale', quantity: 60, unit: 'g' },
              { id: 'i25', name: 'Avocado', quantity: 80, unit: 'g' },
              { id: 'i26', name: 'Uova', quantity: 2, unit: 'pz' },
              { id: 'i27', name: 'Semi di sesamo', quantity: 5, unit: 'g' },
            ],
            prepTime: 15,
          },
        ],
      },
      {
        id: 'm6',
        type: 'pranzo',
        confirmed: false,
        recipes: [
          {
            id: 'r8',
            name: 'Pasta integrale al pesto',
            ingredients: [
              { id: 'i28', name: 'Pasta integrale', quantity: 80, unit: 'g' },
              { id: 'i29', name: 'Pesto alla genovese', quantity: 30, unit: 'g' },
              { id: 'i30', name: 'Parmigiano', quantity: 20, unit: 'g' },
              { id: 'i31', name: 'Pinoli', quantity: 10, unit: 'g' },
            ],
            prepTime: 15,
          },
        ],
      },
      {
        id: 'm7',
        type: 'cena',
        confirmed: false,
        recipes: [
          {
            id: 'r9',
            name: 'Filetto di merluzzo al forno',
            ingredients: [
              { id: 'i32', name: 'Merluzzo', quantity: 180, unit: 'g' },
              { id: 'i33', name: 'Patate', quantity: 150, unit: 'g' },
              { id: 'i34', name: 'Limone', quantity: 1, unit: 'pz' },
              { id: 'i35', name: 'Prezzemolo', quantity: 5, unit: 'g' },
            ],
            prepTime: 35,
          },
        ],
      },
      {
        id: 'm8',
        type: 'spuntino',
        confirmed: false,
        recipes: [
          {
            id: 'r10',
            name: 'Smoothie verde',
            ingredients: [
              { id: 'i36', name: 'Spinaci', quantity: 50, unit: 'g' },
              { id: 'i37', name: 'Mela', quantity: 1, unit: 'pz' },
              { id: 'i38', name: 'Zenzero', quantity: 5, unit: 'g' },
              { id: 'i39', name: 'Acqua', quantity: 150, unit: 'ml' },
            ],
            prepTime: 5,
          },
        ],
      },
    ],
  },
];

export const sampleFridge: FridgeItem[] = [
  { id: 'f1', name: 'Latte di mandorla', quantity: 500, unit: 'ml', category: 'latticini', expiryDate: '2026-01-10' },
  { id: 'f2', name: 'Yogurt greco', quantity: 300, unit: 'g', category: 'latticini', expiryDate: '2026-01-08' },
  { id: 'f3', name: 'Pomodorini', quantity: 200, unit: 'g', category: 'verdure', expiryDate: '2026-01-07' },
  { id: 'f4', name: 'Petto di pollo', quantity: 300, unit: 'g', category: 'proteine', expiryDate: '2026-01-06' },
  { id: 'f5', name: 'Mirtilli', quantity: 100, unit: 'g', category: 'frutta', expiryDate: '2026-01-05' },
  { id: 'f6', name: 'Fiocchi d\'avena', quantity: 400, unit: 'g', category: 'altro' },
];

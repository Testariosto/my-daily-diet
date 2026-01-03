import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, AlertTriangle, Refrigerator } from 'lucide-react';
import { format, parseISO, differenceInDays } from 'date-fns';
import { it } from 'date-fns/locale';
import { FridgeItem } from '@/types/diet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FridgeInventoryProps {
  items: FridgeItem[];
  onAddItem: (item: Omit<FridgeItem, 'id'>) => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const categoryEmojis: Record<FridgeItem['category'], string> = {
  verdure: '🥬',
  frutta: '🍎',
  proteine: '🥩',
  latticini: '🧀',
  altro: '📦',
};

const categoryLabels: Record<FridgeItem['category'], string> = {
  verdure: 'Verdure',
  frutta: 'Frutta',
  proteine: 'Proteine',
  latticini: 'Latticini',
  altro: 'Altro',
};

export function FridgeInventory({
  items,
  onAddItem,
  onRemoveItem,
  onUpdateQuantity,
}: FridgeInventoryProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    unit: 'g',
    category: 'altro' as FridgeItem['category'],
  });

  const handleAddItem = () => {
    if (newItem.name && newItem.quantity) {
      onAddItem({
        name: newItem.name,
        quantity: parseFloat(newItem.quantity),
        unit: newItem.unit,
        category: newItem.category,
      });
      setNewItem({ name: '', quantity: '', unit: 'g', category: 'altro' });
      setShowAddForm(false);
    }
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, FridgeItem[]>);

  const getExpiryStatus = (expiryDate?: string) => {
    if (!expiryDate) return null;
    const days = differenceInDays(parseISO(expiryDate), new Date());
    if (days < 0) return 'expired';
    if (days <= 2) return 'warning';
    return 'ok';
  };

  if (items.length === 0 && !showAddForm) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Refrigerator className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-1">Frigorifero vuoto</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Aggiungi gli ingredienti che hai in casa
        </p>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Aggiungi ingrediente
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {items.length} ingredienti
        </span>
        <Button size="sm" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-1" />
          Aggiungi
        </Button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-card border border-border rounded-xl p-4 space-y-3">
              <Input
                placeholder="Nome ingrediente"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Quantità"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                  className="flex-1"
                />
                <select
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                  className="px-3 rounded-lg border border-border bg-background text-foreground"
                >
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                  <option value="ml">ml</option>
                  <option value="l">l</option>
                  <option value="pz">pz</option>
                </select>
              </div>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(categoryLabels) as FridgeItem['category'][]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewItem({ ...newItem, category: cat })}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                      newItem.category === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {categoryEmojis[cat]} {categoryLabels[cat]}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowAddForm(false)}>
                  Annulla
                </Button>
                <Button className="flex-1" onClick={handleAddItem}>
                  Aggiungi
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {(Object.keys(groupedItems) as FridgeItem['category'][]).map((category) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {categoryEmojis[category]} {categoryLabels[category]}
            </h3>
            <div className="space-y-2">
              {groupedItems[category].map((item) => {
                const expiryStatus = getExpiryStatus(item.expiryDate);
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="bg-card border border-border rounded-lg p-3 flex items-center gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{item.name}</span>
                        {expiryStatus === 'warning' && (
                          <Badge variant="outline" className="text-warning border-warning gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Scade presto
                          </Badge>
                        )}
                        {expiryStatus === 'expired' && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Scaduto
                          </Badge>
                        )}
                      </div>
                      {item.expiryDate && (
                        <span className="text-xs text-muted-foreground">
                          Scade: {format(parseISO(item.expiryDate), 'd MMM', { locale: it })}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.id, parseFloat(e.target.value) || 0)}
                        className="w-20 text-center"
                      />
                      <span className="text-sm text-muted-foreground w-8">{item.unit}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

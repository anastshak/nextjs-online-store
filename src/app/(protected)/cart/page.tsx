'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import ActionButton from '@/components/common/ActionButton';
import Title from '@/components/common/Title';
import OrderButton from '@/components/OrderButton';

import { getProduct } from '@/lib/api/products';
import { useCartStore } from '@/lib/stores/cart.store';

import type { Product } from '@/types/product';

export default function CartPage() {
  const router = useRouter();

  const items = useCartStore((s) => s.items);
  const increase = useCartStore((s) => s.increaseAmount);
  const decrease = useCartStore((s) => s.decreaseAmount);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = items.reduce((sum, item) => sum + item.amount * item.price, 0);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const productIdsKey = useMemo(
    () =>
      items
        .map((i) => i.productId)
        .sort()
        .join(','),
    [items]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadCartItems() {
      if (!productIdsKey) {
        setProducts([]);
        return;
      }

      setLoading(true);

      try {
        const ids = productIdsKey.split(',');

        const data = await Promise.all(ids.map((id) => getProduct(id)));

        if (!cancelled) {
          setProducts(data);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCartItems();

    return () => {
      cancelled = true;
    };
  }, [productIdsKey]);

  const handleOrderSuccess = () => {
    clearCart();
    toast.success('Order placed successfully', { position: 'top-center' });
    router.push('/');
  };

  if (loading) {
    return <div className="py-10 text-center">Loading cart...</div>;
  }

  if (products.length === 0) {
    return <div className="py-10 text-center">Cart is empty</div>;
  }

  return (
    <>
      <div className="flex justify-between items-start">
        <Title text="Cart" />

        <ActionButton onClick={clearCart} active activeClassName="text-red-600 border-red-200">
          <Trash2 /> Clear cart
        </ActionButton>
      </div>

      <div className="space-y-4 p-10">
        {products.map((product) => {
          const item = items.find((i) => i.productId === product.id)!;
          if (!item) return null;
          return (
            <div
              key={product.id}
              className="flex items-center justify-between border p-4 rounded-lg"
            >
              <div>
                <div className="font-medium">{product.title}</div>
                <div className="text-sm text-muted-foreground">${product.price}</div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => decrease(product.id)} className="px-2 border rounded">
                  −
                </button>

                <span>{item.amount}</span>

                <button
                  onClick={() => increase(product.id, product.price)}
                  className="px-2 border rounded"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center mt-6 px-10">
        <div className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</div>

        <OrderButton onOrderSuccess={handleOrderSuccess} />
      </div>
    </>
  );
}

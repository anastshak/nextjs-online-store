'use client';

import { useState } from 'react';

import { Loader2, Check } from 'lucide-react';

import ActionButton from './common/ActionButton';

interface OrderButtonProps {
  onOrderSuccess: () => void;
}

export default function OrderButton({ onOrderSuccess }: OrderButtonProps) {
  const [isOrdering, setIsOrdering] = useState(false);

  const handleOrder = async () => {
    setIsOrdering(true);

    await new Promise((res) => setTimeout(res, 2000));

    onOrderSuccess();
    setIsOrdering(false);
  };

  return (
    <ActionButton
      onClick={handleOrder}
      active
      activeClassName="text-green-700 border-green-200"
      disabled={isOrdering}
    >
      {isOrdering ? (
        <>
          <Loader2 className="animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Check />
          Order
        </>
      )}
    </ActionButton>
  );
}

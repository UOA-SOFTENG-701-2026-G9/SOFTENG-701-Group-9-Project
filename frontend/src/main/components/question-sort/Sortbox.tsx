import React from 'react';
import { useDroppable } from '@dnd-kit/react';
import type { UniqueIdentifier } from '@dnd-kit/abstract';

type SortBoxProps = React.PropsWithChildren<{ id: UniqueIdentifier }>;

const SortBox = ({ id, children }: SortBoxProps) => {
  const { ref } = useDroppable({ id });
  return (
    <div className="bg-[#F7F5EE]" ref={ref} style={{ width: 300, height: 300 }}>
      {children}
    </div>
  );
};

export default SortBox;
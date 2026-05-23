import React from 'react';
import { useDraggable } from '@dnd-kit/react';
import type { UniqueIdentifier } from '@dnd-kit/abstract';

type SortableProps = React.PropsWithChildren<{ id: UniqueIdentifier; className?: string }>;

const Sortable = ({ id, children, className }: SortableProps) => {
	const { ref } = useDraggable({ id });
	return (
		<div ref={ref} className={`inline-flex ${className ?? ''}`}>
			{children}
		</div>
	);
};

export default Sortable;
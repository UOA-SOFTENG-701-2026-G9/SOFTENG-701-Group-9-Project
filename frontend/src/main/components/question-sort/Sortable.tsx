import React from 'react';
import { useDraggable } from '@dnd-kit/react';
import type { UniqueIdentifier } from '@dnd-kit/abstract';

type SortableProps = React.PropsWithChildren<{ id: UniqueIdentifier }>;

const Sortable = ({ id, children }: SortableProps) => {
	const { ref } = useDraggable({ id });
	return (
		<div ref={ref}>
			{children}
		</div>
	);
};

export default Sortable;
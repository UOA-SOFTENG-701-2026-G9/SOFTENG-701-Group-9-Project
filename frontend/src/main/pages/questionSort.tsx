import { useState } from "react";
import { DragDropProvider } from '@dnd-kit/react';

import Sidebar from "../components/question-sort/Sidebar.tsx"
import SortBox from "../components/question-sort/SortBox.tsx"
import Sortable from "../components/question-sort/Sortable.tsx";

import safeFace from '../../resources/icons/Safe-Face.png';

interface SortableItem {
  id: string;
  target: 'middle' | 'left' | 'right';
  label: string;
}

const QuestionSort = () => {
  const [items, setItems] = useState<SortableItem[]>([
    { id: 'item-1', target: 'middle', label: 'Answer 1' },
    { id: 'item-2', target: 'middle', label: 'Answer 2' },
    { id: 'item-3', target: 'middle', label: 'Answer 3' },
    { id: 'item-4', target: 'middle', label: 'Answer 4' },
  ]);

  const middleItems = items.filter(i => i.target === 'middle');
  const leftItems = items.filter(i => i.target === 'left');
  const rightItems = items.filter(i => i.target === 'right');

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const sourceId = event.operation.source?.id;
        const targetId = event.operation.target?.id;

        if (!targetId) return;

        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === sourceId 
              ? { ...item, target: targetId as 'middle' | 'left' | 'right' } 
              : item
          )
        );
      }}
    >
      <div>
        <div className="relative py-4">
          <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">Sort these out!</h1>
          <div className="absolute right-0 top-0">
            <Sidebar />
          </div>
        </div>

        <div>
          <div className="flex justify-center items-start gap-8 mt-6">
            <div className="w-1/3 flex flex-col items-center">
              <img src={safeFace} alt="Safe" />
              <h2 className="mt-2">Safe</h2>
              
              <SortBox id="left">
                {leftItems.map(item => (
                  <Sortable key={item.id} id={item.id}>{item.label}</Sortable>
                ))}
              </SortBox>
            </div>

            <div className="w-1/3 flex flex-col items-center self-center gap-2">
              {middleItems.map(item => (
                <Sortable key={item.id} id={item.id}>{item.label}</Sortable>
              ))}
            </div>

            <div className="w-1/3 flex flex-col items-center">
              <img src={safeFace} alt="Unsafe" />
              <h2 className="mt-2">Unsafe</h2>
              
              <SortBox id="right">
                {rightItems.map(item => (
                  <Sortable key={item.id} id={item.id}>{item.label}</Sortable>
                ))}
              </SortBox>
            </div>
          </div>
        </div>
      </div>
    </DragDropProvider>
  )
}

export default QuestionSort;
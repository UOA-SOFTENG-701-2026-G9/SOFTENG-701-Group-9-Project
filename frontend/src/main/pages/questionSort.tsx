import { useState } from "react";
import { DragDropProvider } from '@dnd-kit/react';

import Sidebar from "../components/question-sort/Sidebar.tsx"
import SortBox from "../components/question-sort/SortBox.tsx"
import Sortable from "../components/question-sort/Sortable.tsx";

import safeFace from '../../resources/icons/Safe-Face.png';
import unsafeFace from '../../resources/icons/Unsafe-Face.png';

interface SortableItem {
  id: string;
  target: 'middle' | 'left' | 'right';
  label: string;
}

const QuestionSort = () => {
  const sortableCardClass = "w-[389px] h-[77px] rounded-[20px] border-[5px] border-[#3B6D11] bg-white flex items-center justify-center";
  const headingTextClass = "text-[#3B6D11] text-center font-['Holtwood_One_SC'] text-[64px] font-normal leading-normal flex w-[302px] h-[123px] flex-col items-center justify-center";

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
      <div className="bg-[#F7F5EE] min-h-screen">
        <div className="relative py-4">
          <h1 className={`absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap ${headingTextClass}`}>Sort these out!</h1>
          <div className="absolute right-0 top-0">
            <Sidebar />
          </div>
        </div>

        <div>
          <div className="flex justify-center items-start gap-8 mt-6">
            <div className="w-1/3 flex flex-col items-center">
              <div className="flex items-center gap-3">
                <img
                  src={safeFace}
                  alt="Safe"
                  style={{
                    width: 148,
                    height: 148,
                    aspectRatio: '1 / 1',
                    background: `url(${safeFace}) lightgray -213px -807px / 1037.838% 691.892% no-repeat`,
                  }}
                />
                <h2 className={headingTextClass}>Safe</h2>
              </div>
              <SortBox id="left">
                <div className="w-[504px] h-[575px] rounded-[20px] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                  <div className="flex h-full w-full flex-col items-center justify-start gap-4 py-4">
                    {leftItems.map(item => (
                      <Sortable key={item.id} id={item.id}>
                        <div className={sortableCardClass}>
                          <span className="text-black text-center" style={{ fontFamily: 'Holtwood One SC', fontSize: 36, fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }}>{item.label}</span>
                        </div>
                      </Sortable>
                    ))}
                  </div>
                </div>
              </SortBox>
            </div>

            <div className="w-1/3 flex flex-col items-center self-center gap-2">
              {middleItems.map(item => (
                <Sortable key={item.id} id={item.id}>
                  <div className={sortableCardClass}>
                    <span className="text-black text-center" style={{ fontFamily: 'Holtwood One SC', fontSize: 36, fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }}>{item.label}</span>
                  </div>
                </Sortable>
              ))}
            </div>

            <div className="w-1/3 flex flex-col items-center">
              <div className="flex items-center gap-3">
                <img
                  src={unsafeFace}
                  alt="Unsafe"
                  style={{
                    width: 148,
                    height: 148,
                    aspectRatio: '1 / 1',
                    background: `url(${unsafeFace}) lightgray -213px -807px / 1037.838% 691.892% no-repeat`,
                  }}
                />
                <h2 className={headingTextClass}>Unsafe</h2>
              </div>
              <SortBox id="right">
                <div className="w-[504px] h-[575px] rounded-[20px] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                  <div className="flex h-full w-full flex-col items-center justify-start gap-4 py-4">
                    {rightItems.map(item => (
                      <Sortable key={item.id} id={item.id}>
                        <div className={sortableCardClass}>
                          <span className="text-black text-center" style={{ fontFamily: 'Holtwood One SC', fontSize: 36, fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal' }}>{item.label}</span>
                        </div>
                      </Sortable>
                    ))}
                  </div>
                </div>
              </SortBox>
            </div>
          </div>
        </div>
      </div>
    </DragDropProvider>
  )
}

export default QuestionSort;
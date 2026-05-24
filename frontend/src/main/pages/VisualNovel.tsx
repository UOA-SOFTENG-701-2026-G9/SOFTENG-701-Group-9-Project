"use client";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import QuestionSort from "./questionSort.tsx";

/*
  Visual Novel Framework for Next.js / React
  - Background image per scene
  - Two character slots (left / right)
  - Speaker-aware dialogue box
  - Click dialogue box to advance
  - Optional branching choice overlay (2 buttons)
  - Easy scene-by-scene story authoring
*/

type CharacterSlot = {
  name: string;
  image: string;
  side: "left" | "right";
  color: string;
  speaking?: boolean;
};

type Choice = {
  label: string;
  nextSceneId: string;
};

type Scene = {
  id: string;
  background: string;
  left: CharacterSlot;
  right: CharacterSlot;
  speaker: string;
  speakerColor: string;
  dialogue: string;
  nextSceneId?: string;
  choices?: [Choice, Choice];
  pauseAfterText?: boolean;
};

type Story = {
  startSceneId: string;
  scenes: Record<string, Scene>;
};

type VisualNovelPlayerProps = {
  story: Story;
  onEnd?: () => void;
  className?: string;
};

function cn(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function CharacterSprite({
  character,
  dimmed,
}: {
  character: CharacterSlot;
  dimmed?: boolean;
}) {
  const isLeft = character.side === "left";

  return (
    <div
      className={cn(
        "absolute bottom-[22rem] z-10 transition-all duration-300",
        isLeft ? "left-[26.5rem]" : "right-[26.5rem]",
        dimmed ? "scale-[2.0] opacity-100" : "scale-[2.2] opacity-100"
      )}
      style={{ filter: dimmed ? "brightness(0.6)" : "none" }}
    >
      <div className="relative select-none">
        <img
          src={character.image}
          alt={character.name}
          className={cn(
            "h-[220px] w-auto md:h-[280px] drop-shadow-[0_10px_12px_rgba(0,0,0,0.18)]",
            isLeft ? "origin-bottom-left" : "origin-bottom-right"
          )}
          draggable={false}
        />
      </div>
    </div>
  );
}

// 'Speaker' = character name & colour, 'Dialogue' = the actual text content
function DialogueBox({
  speaker,
  speakerColor,
  dialogue,
  onAdvance,
  canAdvance,
}: {
  speaker: string;
  speakerColor: string;
  dialogue: string;
  onAdvance: () => void;
  canAdvance: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onAdvance}
      disabled={!canAdvance}
      className={cn(
        "group absolute bottom-[4.5rem] left-1/2 z-20 w-[min(92vw,1220px)] -translate-x-1/2 rounded-[28px] border border-white/60 bg-white/85 px-[3rem] py-[1.5rem] text-left shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-sm outline-none transition",
        canAdvance ? "hover:-translate-y-0.5 active:translate-y-0" : "cursor-default"
      )}
      aria-label="Advance dialogue"
    >
      <div className="mb-4 inline-flex items-center gap-2">
        <span
          className="rounded-xl px-[1rem] py-[0.5rem] text-[2rem] font-bold text-white shadow-sm"
          style={{ backgroundColor: speakerColor }}
        >
          {speaker}
        </span>
      </div>
      <p className="max-w-[72ch] text-[clamp(1.15rem,2vw,1.75rem)] leading-[1.35] text-slate-800 md:text-[3rem]">
        {dialogue}
      </p>
      <div className="mt-3 text-right text-md font-medium text-slate-400 opacity-0 transition group-hover:opacity-100">
        Click to continue
      </div>
    </button>
  );
}

function ChoiceOverlay({
  choices,
  onPick,
}: {
  choices: [Choice, Choice];
  onPick: (nextSceneId: string) => void;
}) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-[760px] rounded-[28px] border border-white/50 bg-emerald-800 px-5 py-6 shadow-[0_30px_70px_rgba(0,0,0,0.35)] md:px-8 md:py-8">
        <h2 className="mb-8 text-center text-[clamp(1.2rem,2vw,2rem)] font-black uppercase tracking-wide text-white">
          What should Kōro do?
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {choices.map((choice) => (
            <button
              key={choice.label}
              type="button"
              onClick={() => onPick(choice.nextSceneId)}
              className="min-h-[120px] rounded-[22px] bg-[#f3f0e8] px-5 py-5 text-[2rem] font-medium leading-snug text-slate-900 shadow-[0_10px_25px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0"
            >
              {choice.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function VisualNovelPlayer({ story, onEnd, className }: VisualNovelPlayerProps) {
  const [currentSceneId, setCurrentSceneId] = useState(story.startSceneId);
  const [choiceLocked, setChoiceLocked] = useState(false);
  const [showQuestionSort, setShowQuestionSort] = useState(false);

  const scene = story.scenes[currentSceneId];

  const hasChoices = Boolean(scene?.choices?.length);
  const isChoiceScene = hasChoices && !choiceLocked;

  const currentCharacters = useMemo(() => {
    if (!scene) return null;
    const leftIsSpeaker = scene.left.name === scene.speaker;
    const rightIsSpeaker = scene.right.name === scene.speaker;

    return {
      left: { ...scene.left, speaking: leftIsSpeaker },
      right: { ...scene.right, speaking: rightIsSpeaker },
    };
  }, [scene]);

  if (!scene || !currentCharacters) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Story not found.
      </div>
    );
  }

  const advance = () => {
    if (hasChoices) {
      setChoiceLocked(false);
      return;
    }

    if (scene.nextSceneId) {
      if (scene.nextSceneId === "end-placeholder") {
        setShowQuestionSort(true);
        return;
      }
      setCurrentSceneId(scene.nextSceneId);
      return;
    }

    onEnd?.();
  };

  const pickChoice = (nextSceneId: string) => {
    setChoiceLocked(true);
    setTimeout(() => setCurrentSceneId(nextSceneId), 180);
  };

  return (
    <div
      className={cn(
        "relative h-screen w-full overflow-hidden bg-slate-900 text-slate-900",
        className
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${scene.background})` }}
      />

      {/* subtle readability overlay */}
      <div className="absolute inset-0 bg-black/10" />

      <CharacterSprite character={currentCharacters.left} dimmed={!currentCharacters.left.speaking} />
      <CharacterSprite character={currentCharacters.right} dimmed={!currentCharacters.right.speaking} />

      {/* top UI area - optional pause/menu */}
      <Link to="/" className="absolute right-4 top-4 z-20 rounded-2xl bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <span className="h-7 w-1.5 rounded-full bg-slate-700" />
          <span className="h-7 w-1.5 rounded-full bg-slate-700" />
        </div>
      </Link>

      <DialogueBox
        speaker={scene.speaker}
        speakerColor={scene.speakerColor}
        dialogue={scene.dialogue}
        onAdvance={advance}
        canAdvance={!hasChoices}
      />

      {isChoiceScene ? (
        <ChoiceOverlay choices={scene.choices!} onPick={pickChoice} />
      ) : null}

      {showQuestionSort ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm">
          <div className="relative h-[min(92vh,980px)] w-[min(96vw,1600px)] overflow-hidden rounded-[32px] border border-white/40 bg-[#F7F5EE] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <button
              type="button"
              onClick={() => setShowQuestionSort(false)}
              className="absolute right-4 top-4 z-50 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-white"
              aria-label="Close question sort popup"
            >
              Close
            </button>
            <div className="h-full w-full overflow-auto">
              <QuestionSort
                embedded
                onSubmit={() => {
                  // Keep the popup open after submit so only the Close button dismisses it.
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Example story data                                                         */
/* -------------------------------------------------------------------------- */

const exampleStory: Story = {
  startSceneId: "koro-link-1",
  scenes: {
    "koro-link-1": {
      id: "koro-link-1",
      background: "/vn/backgrounds/lounge.png",
      left: {
        name: "Kōro",
        side: "left",
        color: "#5B8E3E",
        image: "/vn/characters/koro-idle.png",
      },
      right: {
        name: "Ruru",
        side: "right",
        color: "#D69C1E",
        image: "/vn/characters/ruru-happy.png",
      },
      speaker: "Ruru",
      speakerColor: "#D69C1E",
      dialogue: "Wow Kōro, you're so lucky! Quick, let's claim our million dollars now!",
      nextSceneId: "koro-link-2",
    },
    "koro-link-2": {
      id: "koro-link-2",
      background: "/vn/backgrounds/lounge.png",
      left: {
        name: "Kōro",
        side: "left",
        color: "#5B8E3E",
        image: "/vn/characters/koro-shock.png",
      },
      right: {
        name: "Ruru",
        side: "right",
        color: "#D69C1E",
        image: "/vn/characters/ruru-happy.png",
      },
      speaker: "Kōro",
      speakerColor: "#5B8E3E",
      dialogue: "R-really? But... can it really be this easy?",
      nextSceneId: "koro-link-3",
    },
    "koro-link-3": {
      id: "koro-link-3",
      background: "/vn/backgrounds/lounge.png",
      left: {
        name: "Kōro",
        side: "left",
        color: "#5B8E3E",
        image: "/vn/characters/koro-shock.png",
      },
      right: {
        name: "Ruru",
        side: "right",
        color: "#D69C1E",
        image: "/vn/characters/ruru-happy.png",
      },
      speaker: "Kōro",
      speakerColor: "#5B8E3E",
      dialogue: "R-really? But... can it really be this easy?",
      choices: [
        {
          label: "This sounds too good to be true",
          nextSceneId: "safe-path",
        },
        {
          label: "FREE ROBUX!!!",
          nextSceneId: "unsafe-path",
        },
      ],
    },
    "safe-path": {
      id: "safe-path",
      background: "/vn/backgrounds/lounge.png",
      left: {
        name: "Kōro",
        side: "left",
        color: "#5B8E3E",
        image: "/vn/characters/koro-thinking.png",
      },
      right: {
        name: "Ruru",
        side: "right",
        color: "#D69C1E",
        image: "/vn/characters/ruru-worried.png",
      },
      speaker: "Kōro",
      speakerColor: "#5B8E3E",
      dialogue: "I should stop and check with a trusted adult first. That link could be a scam!",
      nextSceneId: "safe-path-2",
    },
    "safe-path-2": {
      id: "safe-path-2",
      background: "/vn/backgrounds/lounge.png",
      left: {
        name: "Kōro",
        side: "left",
        color: "#5B8E3E",
        image: "/vn/characters/koro-idle.png",
      },
      right: {
        name: "Ruru",
        side: "right",
        color: "#D69C1E",
        image: "/vn/characters/ruru-thinking.png",
      },
      speaker: "Ruru",
      speakerColor: "#D69C1E",
      dialogue: "Good catch. Let's ask an adult and report it together!",
      nextSceneId: "end-placeholder",
    },
    "unsafe-path": {
      id: "unsafe-path",
      background: "/vn/backgrounds/lounge.png",
      left: {
        name: "Kōro",
        side: "left",
        color: "#5B8E3E",
        image: "/vn/characters/koro-shock.png",
      },
      right: {
        name: "Ruru",
        side: "right",
        color: "#D69C1E",
        image: "/vn/characters/ruru-worried.png",
      },
      speaker: "Kōro",
      speakerColor: "#5B8E3E",
      dialogue: "Oops — that page looks suspicious. I should have checked before clicking!",
      nextSceneId: "end-placeholder",
    },
    "end-placeholder": {
      id: "end-placeholder",
      background: "/vn/backgrounds/lounge.png",
      left: {
        name: "Kōro",
        side: "left",
        color: "#5B8E3E",
        image: "/vn/characters/koro-happy.png",
      },
      right: {
        name: "Ruru",
        side: "right",
        color: "#D69C1E",
        image: "/vn/characters/ruru-happy.png",
      },
      speaker: "Kōro",
      speakerColor: "#5B8E3E",
      dialogue: "Now I know what to look out for. Let's keep going!",
      nextSceneId: "koro-link-1",
    },
  },
};

export default function VisualNovelDemo() {
  return <VisualNovelPlayer story={exampleStory} />;
}

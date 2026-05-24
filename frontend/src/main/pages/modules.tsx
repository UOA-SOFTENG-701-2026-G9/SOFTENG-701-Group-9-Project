import HeroBanner from "../components/HeroBanner";
import ModuleCardFull from "../components/modules/ModuleCardFull";

const Modules = () => {
  return (
    <div className="flex flex-col bg-[#F7F5EE]">
			<HeroBanner title="Modules" subtitle="Play through short stories that teach you important things about good cyber safety." />

      <div className="flex flex-col px-40 grid-lessons my-32 gap-8">
        <ModuleCardFull
					moduleNum={1}
					title="Interacting with people online" 
					description="Help Tāne and Ruru learn how to interact with other people online!"
					imgUrl="/card.png"
					linkUrl="/modules"
				/> 
          
				<ModuleCardFull
					moduleNum={2}
					title="Viruses & Malware" 
					description="Tāne and Ruru explore what happens if you get infected with a virus!"
					imgUrl="/card.png"
					linkUrl="/modules"
				/> 

				<ModuleCardFull 
					moduleNum={3}
					title="Scammers" 
					description="Tāne gets a message offering him free robux!"
					imgUrl="/card.png"
					linkUrl="/modules"
				/> 

				<ModuleCardFull 
					moduleNum={4}
					title="Cyberbullying" 
					description="Someone is messaging Tāne mean messages! Can Ruru help?"
					imgUrl="/card.png"
					linkUrl="/modules"
				/> 
      </div>
    </div>
  )
}

export default Modules

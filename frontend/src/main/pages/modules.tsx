import ModuleCardFull from "../components/home/ModuleCardFull";

const Modules = () => {

  return (
    <div>
      <header className="px-10 mb-4">
        <h1>Modules</h1>
        <p>Welcome to the modules page!</p>
	<p className="py-2">Pick a topic to start learning!</p>
      </header>

      <div class="flex flex-wrap px-10 -mb-4 grid-lessons">
        <ModuleCardFull 
	  title="Interacting with people online" 
	  description="Help Tāne and Ruru learn how to interact with other people online!"
	  imgUrl="/public/card.png"
	  linkUrl="/modules"
	/> 
          
	<ModuleCardFull 
	  title="Viruses & Malware" 
	  description="Tāne and Ruru explore what happens if you get infected with a virus!"
	  imgUrl="/public/card.png"
	  linkUrl="/modules"
	/> 

	<ModuleCardFull 
	  title="Scammers" 
	  description="Tāne gets a message offering him free robux!"
	  imgUrl="/public/card.png"
	  linkUrl="/modules"
	/> 

	<ModuleCardFull 
	  title="Cyberbullying" 
	  description="Someone is messaging Tāne mean messages! Can Ruru help?"
	  imgUrl="/public/card.png"
	  linkUrl="/modules"
	/> 

      </div>

      <div className="px-4 py-4"></div>
    </div>
  )
}

export default Modules

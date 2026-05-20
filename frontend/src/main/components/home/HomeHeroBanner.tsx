const HomeHeroBanner = () => {
  return (
    <div className="relative w-full h-[70vh] bg-gradient-to-b from-[#1B7D63] to-[#56C29E]">
      <div className="absolute top-[250px] left-[300px] transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-start pb-16">
          <h1>Stay Safe</h1>
          <h1>Online with</h1>
          <h1>Kiwi Smarts!</h1>
          <p className="text-xl tracking-wider flex flex-col items-start z-1">
            <span>Learn how to spot cyber threats, protect</span>
            <span> yourself online, and have fun doing it with</span>
            <span>your kiwi crew.</span>
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-auto z-10">
        <div className="flex flex-row">
          <img src="/home/ferns.png" alt="Kiwi Smarts" className=" w-1/3 h-auto object-cover" />
          <img src="/home/ferns.png" alt="Kiwi Smarts" className="w-1/3 h-auto object-cover" />
          <img src="/home/ferns.png" alt="Kiwi Smarts" className="w-1/3 h-auto object-cover" />
        </div>
      </div>
    </div>
  )
}

export default HomeHeroBanner;
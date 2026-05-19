const ModuleSection = () => {
  return (
    <div className="flex flex-col items-center py-16">
      <h2 className="text-[#3B6D11]">
        Build your cyber
      </h2>
      <h2 className="text-[#3B6D11]">
        superpowers with our
      </h2>
      <h2 className="text-[#3B6D11]">
        modules
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Module cards will be rendered here */}
      </div>
    </div>
  )
}

export default ModuleSection;
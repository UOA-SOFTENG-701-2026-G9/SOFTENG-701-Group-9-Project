interface HeroBannerProps {
  title: string
  subtitle: string
}

const HeroBanner = ({ title, subtitle }: HeroBannerProps) => {
  return (
    <div className="relative w-full h-[30vh] bg-gradient-to-b from-[#1B7D63] to-[#56C29E]">
      <div className="flex flex-col w-full h-full items-center justify-center pb-16">
        <h1>{title}</h1>
        <p className="max-w-lg">{subtitle}</p>
      </div>
      <div className="bg-[#EF9F27] w-full h-8"></div>
    </div>
  )
}

export default HeroBanner;
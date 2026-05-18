import { HomeHeroBanner } from "../components/HeroBanner"
import AmberBanner from "../components/home/AmberBanner"

const Home = () => {
  return (
    <div className="flex flex-col">
      <HomeHeroBanner />
      <AmberBanner />
    </div>
   
  )
}

export default Home
import { Link } from "react-router-dom";

const ModuleCardFull = ({title, description, imgUrl, linkUrl}) => {
  return (
   <div className="px-4 max-w-1/2 min-w-80"> 
        <article className="mb-4 bg-gray-800 rounded overflow-hidden shadow-lg"> 
          <img className="w-full" src={imgUrl}/>  
          <div className="px-9 py-4 flex flex-col items-center"> 
            <h2>{title}</h2> 
            <p className="text-gray-200 py-2 text-base">{description}</p> 
 
            <Link to={linkUrl} className="min-w-8 max-w-23 py-1 px-3 bg-[#EF9F27] rounded-full hover:bg-[#D48A1A] transition-colors duration-200 items-center">  
              <h3> Check it out </h3> 
            </Link> 
          </div> 
        </article> 
      </div>
  )
}

export default ModuleCardFull

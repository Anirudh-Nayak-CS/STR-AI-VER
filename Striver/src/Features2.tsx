import code from "./assets/code.jpg"
import { WobbleCard } from "./components/ui/wobblecard";
import list from "./assets/list.png"

export function Features() {

  return (
    <div  id="features" className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Detailed Step-by-Step Explanations
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
             Get a detailed analysis for DSA concepts,problems ranging from various approaches to the most optimal one.
          </p>
        </div>
        <img
          src={code}
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[10%] grayscale filter -bottom-10 object-contain rounded-2xl "
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
         Free of Cost!

        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
         AlgoBuddy has a free tier. Get the best solutions explained in a structured manner for free.
                 </p>
      </WobbleCard>
       <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-green-600">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
        Code correction

        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
         See why the testcases were failing with AlgoBuddy's code correction feature. 
                 </p>
      </WobbleCard>
           <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-orange-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
           Revision List!!
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            Save your  questions and solutions to revisit them later.
          </p>
        </div>
        <img
          src={list}
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[10%] grayscale filter -bottom-10 object-contain rounded-2xl "
        />
      </WobbleCard>
   
    </div>
  );
}

import Link from "next/link";
import { db } from "~/server/db";

export default async function HomePage() {
  return (
    <div className="flex grow flex-col bg-white">
      <div className="ml-36 mt-9 self-center text-5xl font-extrabold uppercase text-green-600 max-md:text-4xl">
        About Us
      </div>
      <div className="w-full max-w-[1130px] self-center max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex w-[42%] flex-col max-md:ml-0 max-md:w-full">
            <img
              src="/screenshot.png"
              className="aspect-[1.16] w-full max-md:mt-10"
            />
          </div>
          <div className="ml-5 flex w-[58%] flex-col max-md:ml-0 max-md:w-full">
            <div className="mt-10 text-xl capitalize text-black max-md:mt-10 max-md:max-w-full">
              Helios envisions a world where discipline and fitness converge
              into a lifestyle, embraced with passion and commitment. The
              integration of a dynamic leaderboard, powered by precise kinematic
              pose analysis, ignites a competitive spirit, encouraging a
              friendly rivalry that propels discipline and elevates fitness
              routines. This innovative approach not only tracks progress but
              also sparks a vibrant, supportive community where each
              individual's success is celebrated and every milestone becomes a
              shared triumph.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

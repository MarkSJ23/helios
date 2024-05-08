import Link from "next/link";
import { db } from "~/server/db";

export default async function HomePage() {
  return (
    <div className="flex flex-col justify-center bg-white">
      <div className="relative flex min-h-[1285px] w-full flex-col overflow-hidden max-md:max-w-full">
        <img
          loading="lazy"
          srcSet="..."
          className="absolute inset-0 size-full object-cover"
        />
        <div className="relative flex min-h-[520px] w-full flex-col overflow-hidden fill-black px-5 pb-20 pt-3.5 font-extrabold text-white max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0cb371f7914ba1f23da964437999c4a9b61202e1f008cfd6432e788f24042d3e?"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="relative mb-44 ml-16 mt-24 self-center text-8xl uppercase max-md:my-10 max-md:max-w-full max-md:text-4xl">
            Leaderboard{" "}
          </div>
        </div>
        <div className="relative z-10 mt-0 w-full max-w-[1355px] self-center max-md:mt-0 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex w-[32%] flex-col max-md:ml-0 max-md:w-full">
              <div className="relative my-auto flex flex-col items-center self-stretch px-5 text-4xl font-extrabold capitalize text-white max-md:mt-10">
                <div className="ml-9 self-stretch text-4xl">
                  Rep Counter live
                </div>
                <div className="mt-28 w-[195px] max-w-full justify-center whitespace-nowrap bg-black p-2.5 max-md:mt-10 max-md:px-5">
                  Squats
                </div>
                <div className="mt-10 w-[195px] max-w-full justify-center whitespace-nowrap bg-black p-2.5">
                  Push-Ups
                </div>
              </div>
            </div>
            <div className="ml-5 flex w-[68%] flex-col max-md:ml-0 max-md:w-full">
              <div className="relative flex grow flex-col border border-solid border-orange-700 py-px max-md:mt-10 max-md:max-w-full">
                <div className="flex w-full justify-between gap-5 text-lg uppercase leading-[99px] text-white max-md:max-w-full max-md:flex-wrap">
                  <div className="mt-1 flex justify-between gap-5 self-start whitespace-nowrap">
                    <div>rank</div>
                    <div>USer</div>
                  </div>
                  <div>Total Reps</div>
                </div>
                <div className="mt-3 flex w-full justify-between gap-5 bg-yellow-950 px-8 py-6 max-md:max-w-full max-md:flex-wrap max-md:px-5">
                  <div className="flex items-start justify-between gap-5 text-sm leading-6 text-zinc-400">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/f34f57b9a69e0c48b02e5613ffef48909654fdccd9a8877620e3a88ab10fdcb0?"
                      className="mt-1 aspect-[0.71] w-[34px] shrink-0"
                    />
                    <div className="flex gap-4">
                      <img
                        loading="lazy"
                        srcSet="..."
                        className="aspect-square w-12 shrink-0"
                      />
                      <div className="my-auto">Skale Enjoyoor</div>
                    </div>
                  </div>
                  <div className="my-auto text-lg uppercase leading-[99px] text-white">
                    127
                  </div>
                </div>
                <div className="flex w-full justify-between gap-5 bg-gray-800 px-8 py-6 max-md:max-w-full max-md:flex-wrap max-md:px-5">
                  <div className="flex items-start justify-between gap-5 text-sm leading-6 text-zinc-400">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5fc7dbad0df42f61bca745e58712eaca6b84b04f336c2cd7d40f1b83869962b?"
                      className="mt-1 aspect-[0.75] w-9 shrink-0"
                    />
                    <div className="flex gap-4">
                      <img
                        loading="lazy"
                        srcSet="..."
                        className="aspect-square w-12 shrink-0"
                      />
                      <div className="my-auto">Skale Enjoyoor</div>
                    </div>
                  </div>
                  <div className="my-auto text-lg uppercase leading-[99px] text-white">
                    110
                  </div>
                </div>
                <div className="flex w-full justify-between gap-5 bg-stone-900 px-8 py-6 max-md:max-w-full max-md:flex-wrap max-md:px-5">
                  <div className="flex items-start justify-between gap-5 text-sm leading-6 text-zinc-400">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/cdc57fa04dc2c355f471b86ad9b7f377b7597dab0a8dd661d3d890b68f15c148?"
                      className="mt-1 aspect-[0.73] w-[35px] shrink-0"
                    />
                    <div className="flex gap-4">
                      <img
                        loading="lazy"
                        srcSet="..."
                        className="aspect-square w-12 shrink-0"
                      />
                      <div className="my-auto">Skale Enjoyoor</div>
                    </div>
                  </div>
                  <div className="my-auto text-lg uppercase leading-[99px] text-white">
                    94
                  </div>
                </div>
                <div className="flex w-full justify-between gap-5 bg-neutral-950 px-10 py-6 max-md:max-w-full max-md:flex-wrap max-md:px-5">
                  <div className="flex justify-between gap-5">
                    <div className="my-auto text-2xl uppercase leading-[98.9px] text-white">
                      004
                    </div>
                    <div className="flex gap-4 text-sm leading-6 text-zinc-400">
                      <img
                        loading="lazy"
                        srcSet="..."
                        className="aspect-square w-12 shrink-0"
                      />
                      <div className="my-auto">Skale Enjoyoor</div>
                    </div>
                  </div>
                  <div className="my-auto text-lg uppercase leading-[99px] text-white">
                    77
                  </div>
                </div>
                <div className="flex w-full justify-between gap-5 bg-neutral-900 px-10 py-6 max-md:max-w-full max-md:flex-wrap max-md:px-5">
                  <div className="flex justify-between gap-5">
                    <div className="my-auto text-2xl uppercase leading-[98.9px] text-white">
                      005
                    </div>
                    <div className="flex gap-4 text-sm leading-6 text-zinc-400">
                      <img
                        loading="lazy"
                        srcSet="..."
                        className="aspect-square w-12 shrink-0"
                      />
                      <div className="my-auto">Skale Enjoyoor</div>
                    </div>
                  </div>
                  <div className="my-auto text-lg uppercase leading-[99px] text-white">
                    75
                  </div>
                </div>
                <div className="flex w-full justify-between gap-5 bg-neutral-950 px-10 py-6 max-md:max-w-full max-md:flex-wrap max-md:px-5">
                  <div className="flex justify-between gap-5">
                    <div className="my-auto text-2xl uppercase leading-[98.9px] text-white">
                      006
                    </div>
                    <div className="flex gap-4 text-sm leading-6 text-zinc-400">
                      <img
                        loading="lazy"
                        srcSet="..."
                        className="aspect-square w-12 shrink-0"
                      />
                      <div className="my-auto">Skale Enjoyoor</div>
                    </div>
                  </div>
                  <div className="my-auto text-lg uppercase leading-[99px] text-white">
                    68
                  </div>
                </div>
                <div className="flex w-full justify-between gap-5 bg-black px-10 py-6 max-md:max-w-full max-md:flex-wrap max-md:px-5">
                  <div className="flex justify-between gap-5">
                    <div className="my-auto text-2xl uppercase leading-[98.9px] text-white">
                      006
                    </div>
                    <div className="flex gap-4 text-sm leading-6 text-zinc-400">
                      <img
                        loading="lazy"
                        srcSet="..."
                        className="aspect-square w-12 shrink-0"
                      />
                      <div className="my-auto">Skale Enjoyoor</div>
                    </div>
                  </div>
                  <div className="my-auto text-lg uppercase leading-[99px] text-white">
                    59
                  </div>
                </div>
                <div className="flex w-full justify-between gap-5 bg-neutral-950 px-10 py-6 max-md:max-w-full max-md:flex-wrap max-md:px-5">
                  <div className="flex justify-between gap-5">
                    <div className="my-auto text-2xl uppercase leading-[98.9px] text-white">
                      007
                    </div>
                    <div className="flex gap-4 text-sm leading-6 text-zinc-400">
                      <img
                        loading="lazy"
                        srcSet="..."
                        className="aspect-square w-12 shrink-0"
                      />
                      <div className="my-auto">Skale Enjoyoor</div>
                    </div>
                  </div>
                  <div className="my-auto text-lg uppercase leading-[99px] text-white">
                    53
                  </div>
                </div>
                <div className="flex w-full justify-between gap-5 bg-zinc-950 px-10 py-6 max-md:max-w-full max-md:flex-wrap max-md:px-5">
                  <div className="flex justify-between gap-5">
                    <div className="my-auto text-2xl uppercase leading-[98.9px] text-white">
                      010
                    </div>
                    <div className="flex gap-4 text-sm leading-6 text-zinc-400">
                      <img
                        loading="lazy"
                        srcSet="..."
                        className="aspect-square w-12 shrink-0"
                      />
                      <div className="my-auto">Skale Enjoyoor</div>
                    </div>
                  </div>
                  <div className="my-auto text-lg uppercase leading-[99px] text-white">
                    45
                  </div>
                </div>
                <div className="flex w-full justify-between gap-5 bg-neutral-950 px-10 py-6 max-md:max-w-full max-md:flex-wrap max-md:px-5">
                  <div className="flex justify-between gap-5">
                    <div className="my-auto text-2xl uppercase leading-[98.9px] text-white">
                      011
                    </div>
                    <div className="flex gap-4 text-sm leading-6 text-zinc-400">
                      <img
                        loading="lazy"
                        srcSet="..."
                        className="aspect-square w-12 shrink-0"
                      />
                      <div className="my-auto">Skale Enjoyoor</div>
                    </div>
                  </div>
                  <div className="my-auto text-lg uppercase leading-[99px] text-white">
                    36
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

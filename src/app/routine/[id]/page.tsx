import { notFound } from "next/navigation";
import { getSpecificRoutine } from "~/server/queries";

export default async function Page({ params }: { params: { id: string } }) {
  const routine = await getSpecificRoutine(Number(params.id));

  if (!routine) {
    notFound();
  }

  return (
    <main className="flex grow flex-col items-center gap-6 p-4">
      <div className="grow-0 text-center text-7xl font-black text-green-700">
        Routine: {routine.name}
      </div>
      <div className="flex w-full flex-col gap-2 sm:w-1/3">
        <div>
          <span className="font-bold">Target Muscles: </span>
          {routine.targetMuscle}
        </div>
        <div>Notes</div>
        <div>{routine.notes}</div>
        <div>Exercises</div>
        <div>
          {routine.exercises?.map((ex) => <div className="">{ex}</div>)}
        </div>
      </div>
    </main>
  );
}

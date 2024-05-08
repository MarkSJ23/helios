import Link from "next/link";
import { RoutineButtons, WorkoutButtons } from "~/components/routine";
import { Button } from "~/components/ui/button";
import { getWorkoutLog, getRoutine } from "~/server/queries";

export default async function Routine() {
  const logs = await getWorkoutLog();
  const routines = await getRoutine();
  return (
    <main className="flex grow flex-col p-4">
      <div className="grow-0 text-center text-7xl font-black text-green-700">
        Routine
      </div>

      <div className="flex grow flex-wrap">
        <div className="flex grow flex-col items-center gap-2 p-2">
          <h1 className=" flex justify-center text-3xl font-bold">
            Log your workout
          </h1>
          {logs.map((log) => (
            <div className="flex w-1/2 items-center justify-between">
              {log.routine.name}: {log.date.toLocaleDateString()}
              <WorkoutButtons workoutId={log.id} />
            </div>
          ))}
        </div>
        <div className="flex grow flex-col  items-center gap-2 p-2">
          <h1 className=" flex justify-center p-4 text-3xl font-bold">
            Routines
          </h1>
          {routines.map((routine) => (
            <div className="flex w-1/2 items-center justify-between">
              <Link href={`/routine/${routine.id}`}>{routine.name}</Link>
              <RoutineButtons routineId={routine.id} />
            </div>
          ))}
          <Button className="w-1/2" asChild>
            <Link href="/create-routine">Create Routine</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

import { SettingsForm } from "~/components/settingsform";
import { getUserInfo } from "~/server/queries";

export default async function Settings() {
  // TODO: Better Styling
  const userInfo = (await getUserInfo()) ?? {
    age: 0,
    weight: 0,
    height: 0,
    calorieTarget: 0,
  };

  return (
    <main className="flex grow flex-col items-center p-4">
      <div className="grow-0 text-center text-7xl font-black">
        Enter Your <span className="text-green-700">Details</span>
      </div>
      <div className="grow" />
      <SettingsForm
        age={userInfo.age}
        weight={userInfo.weight}
        height={userInfo.height}
        targetCalories={userInfo.calorieTarget}
      />
      <div className="grow" />
    </main>
  );
}

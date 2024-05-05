import { Diet, DietButtons } from "~/components/diet";
import { getdiets, getfoods, getUserInfo } from "~/server/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { DietType } from "~/server/db/schema";
import { Button } from "~/components/ui/button";

const typesOfFood = [
  {
    type: "breakfast",
    name: "Breakfast",
  },
  {
    type: "lunch",
    name: "Lunch",
  },
  {
    type: "dinner",
    name: "Dinner",
  },
  {
    type: "snack",
    name: "Snacks",
  },
];

function getCorrectedCalories(
  diet: Awaited<ReturnType<typeof getdiets>>,
  totalCalories: number,
) {
  const map = new Map<number, number>();

  for (let i = 0; i < diet.length; i++) {
    map.set(diet[i]!.id, (diet[i]!.quantity / 100) * diet[i]!.food.calories);
    totalCalories -= (diet[i]!.quantity / 100) * diet[i]!.food.calories;
  }
  return { calorieMap: map, balance: totalCalories };
}

export default async function HomePage() {
  const foods = await getfoods();
  const diets = await getdiets();
  const user = await getUserInfo();
  const { balance, calorieMap } = getCorrectedCalories(
    diets,
    user!.calorieTarget,
  );
  return (
    <main className="flex grow flex-col items-center justify-around p-4">
      <div className="grow-0 text-center text-7xl font-black text-green-700">
        Diet
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {typesOfFood.map((food) => (
          <Card>
            <CardHeader>
              <CardTitle>{food.type}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 p-2">
              <Diet type={food.type as DietType} foods={foods}></Diet>
              <div className="flex flex-col gap-2 p-2 text-sm">
                {diets
                  .filter((diet) => diet.type === food.type)
                  .map((diet) => {
                    return (
                      <div
                        className="flex w-72 items-center justify-between px-2"
                        key={diet.id}
                      >
                        <div className="pr-2">
                          {diet.food.name} : {diet.quantity}g/ml |{" "}
                          {calorieMap.get(diet.id)}cal
                        </div>
                        <div className="flex items-center gap-2">
                          <DietButtons diet={diet}></DietButtons>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <div>Total Calories: {user!.calorieTarget}</div>
        <div>Balance Calories: {balance}</div>
        <Button>Clear</Button>
      </div>
    </main>
  );
}

import Diet from "~/components/diet";
import { getdiets, getfoods } from "~/server/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

function getfoodfromId(
  foods: Awaited<ReturnType<typeof getfoods>>,
  id: number,
) {
  return foods.find((food) => food.id === id);
}
export default async function HomePage() {
  const foods = await getfoods();
  const diets = await getdiets();
  return (
    <main className="">
      <h1>Diet</h1>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Breakfast</CardTitle>
          </CardHeader>
          <CardContent>
            <Diet type="breakfast" foods={foods}></Diet>
            {diets
              .filter((diet) => diet.type === "breakfast")
              .map((diet) => {
                const food = getfoodfromId(foods, diet.foodId);
                return (
                  <div className="bg-red-900" key={diet.id}>
                    {food?.name}
                    {diet.quantity}
                  </div>
                );
              })}
          </CardContent>
        </Card>
      </div>
      <div>
        <div>Total Calories</div>
        <div>Balance Calories</div>
      </div>
    </main>
  );
}

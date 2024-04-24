import Diet from "~/components/diet";
import { getfoods } from "~/server/queries";

export default async function HomePage() {
  const foods = await getfoods();
  return (
    <main className="">
      <h1>Diet</h1>
      <div>
        <Diet type="breakfast" foods={foods}></Diet>
      </div>
      <div>
        <div>Total Calories</div>
        <div>Balance Calories</div>
      </div>
    </main>
  );
}

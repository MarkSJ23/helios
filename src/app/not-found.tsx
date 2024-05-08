import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex grow flex-col items-center gap-4 p-4">
      <div className="grow-0 text-center text-7xl font-black text-green-700">
        Not Found
      </div>
      <p className="">Could not find requested resource</p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </main>
  );
}

import HomeComponent from "@/components/home-component";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-8">
      <h1 className="font-bold p-4">Jobs List</h1>
      <HomeComponent />
    </main>
  );
}

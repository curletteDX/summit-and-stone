import { UniformSlot } from "@uniformdev/canvas-react";

function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black">
      <main className="flex-1 w-full">
        <UniformSlot name="content" />
      </main>
    </div>
  );
}

export default Page;

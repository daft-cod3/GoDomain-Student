import { redirect } from "next/navigation";

export default function Home() {
  // Route the root URL to your real learning entry point.
  redirect("/content");
}


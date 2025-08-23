import { Button } from "@/components/ui/button";
import { Link } from "react-router";


export default function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col gap-6 justify-center items-center" >
      You are not authorized
      <Button variant={"default"} >
        <Link to={"/"}>Home</Link>
      </Button>
    </div>
  );
}

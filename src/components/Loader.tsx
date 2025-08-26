import { Loader2 } from 'lucide-react'


export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-svh" >
      <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
    </div>
  )
}

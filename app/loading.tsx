import { Loader } from "@/components/motion/loader";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
        <Loader variant='helix'/>
    </div>
  )
}
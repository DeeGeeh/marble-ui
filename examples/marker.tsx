import { MagnifyingGlassIcon, ShareIcon } from "@heroicons/react/24/outline"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

export default function MarkerExample() {
  return (
    <div className="flex flex-col gap-3">
      <Marker>
        <MarkerIcon>
          <ShareIcon />
        </MarkerIcon>
        <MarkerContent>Switched to release-candidate</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <MagnifyingGlassIcon />
        </MarkerIcon>
        <MarkerContent>Reviewed 8 related files</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
    </div>
  )
}

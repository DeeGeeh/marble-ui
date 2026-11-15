import Image from "next/image"
import { SiNpm, SiPnpm, SiYarn } from "@icons-pack/react-simple-icons"

import type { PackageManager } from "@/lib/site"

const icons = {
  pnpm: <SiPnpm color="default" />,
  npm: <SiNpm color="default" />,
  bun: (
    <Image src="/bun.svg" alt="" width={16} height={16} className="size-4" />
  ),
  yarn: <SiYarn color="default" />,
} satisfies Record<PackageManager, React.ReactNode>

export function PackageManagerIcon({ pm }: { pm: PackageManager }) {
  return icons[pm]
}

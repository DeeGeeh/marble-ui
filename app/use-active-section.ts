import { useEffect, useState } from "react"

const LINE = 64 + 24 // sticky header height plus the sections' scroll margin slack

/** Which of `ids` the reader is on: the last section whose top has scrolled up to just under the header. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>()
  // callers usually pass a fresh array each render; key on its contents so the listener isn't rebuilt every time
  const key = ids.join(" ")

  useEffect(() => {
    const ids = key.split(" ")
    let frame = 0
    const update = () => {
      frame = 0
      // the section whose top most recently passed just under the header (ties: the first in the row)
      let current: { id: string; top: number } | undefined
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top
        if (
          top !== undefined &&
          top <= LINE &&
          (!current || top > current.top + 1)
        )
          current = { id, top }
      }
      // the clicked link wins when it sits in the current row, or at the bottom where nothing reaches the line
      const hash = decodeURIComponent(location.hash.slice(1))
      const hashTop = ids.includes(hash)
        ? document.getElementById(hash)?.getBoundingClientRect().top
        : undefined
      const atBottom =
        innerHeight + scrollY >= document.documentElement.scrollHeight - 2
      const clicked =
        hashTop !== undefined &&
        (atBottom || (current && Math.abs(hashTop - current.top) <= 1))
      setActive(clicked ? hash : (current?.id ?? ids[0]))
    }
    const onScroll = () => {
      frame ||= requestAnimationFrame(update)
    }
    update()
    // layout can still be settling at mount (late styles, fonts), so re-measure once loaded and on resize
    addEventListener("load", onScroll)
    addEventListener("resize", onScroll)
    addEventListener("hashchange", onScroll)
    addEventListener("scroll", onScroll, { passive: true })
    return () => {
      removeEventListener("load", onScroll)
      removeEventListener("resize", onScroll)
      removeEventListener("hashchange", onScroll)
      removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [key])

  return active
}

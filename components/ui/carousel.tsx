"use client"

import "@blossom-carousel/react/style.css"
import {
  BlossomCarousel,
  BlossomDots,
  BlossomNext,
  BlossomPrev,
} from "@blossom-carousel/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { createContext, use, useId } from "react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const CarouselId = createContext("")

function Carousel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <CarouselId value={useId()}>
      <div
        data-slot="carousel"
        role="region"
        aria-roledescription="carousel"
        className={cn("group/carousel relative isolate", className)}
        {...props}
      />
    </CarouselId>
  )
}

function CarouselContent({
  className,
  ...props
}: React.ComponentProps<typeof BlossomCarousel>) {
  return (
    <BlossomCarousel
      id={use(CarouselId)}
      data-slot="carousel-content"
      className={cn("snap-x snap-mandatory scroll-px-1 px-1 py-3", className)}
      {...props}
    />
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="carousel-item"
      data-blossom-slide
      role="group"
      aria-roledescription="slide"
      className={cn("me-4 w-full snap-start last:me-0", className)}
      {...props}
    />
  )
}

const navButton = cn(
  buttonVariants({ variant: "outline", size: "icon" }),
  "absolute top-1/2 z-raised -translate-y-1/2 rounded-full disabled:opacity-0"
)

function CarouselPrevious({
  className,
  ...props
}: Omit<React.ComponentProps<typeof BlossomPrev>, "for">) {
  return (
    <BlossomPrev
      for={use(CarouselId)}
      data-slot="carousel-previous"
      aria-label="Previous slide"
      className={cn(navButton, "left-3", className)}
      {...props}
    >
      <ChevronLeftIcon />
    </BlossomPrev>
  )
}

function CarouselNext({
  className,
  ...props
}: Omit<React.ComponentProps<typeof BlossomNext>, "for">) {
  return (
    <BlossomNext
      for={use(CarouselId)}
      data-slot="carousel-next"
      aria-label="Next slide"
      className={cn(navButton, "right-3", className)}
      {...props}
    >
      <ChevronRightIcon />
    </BlossomNext>
  )
}

function CarouselDots({
  className,
  ...props
}: Omit<React.ComponentProps<typeof BlossomDots>, "for">) {
  return (
    <BlossomDots
      for={use(CarouselId)}
      data-slot="carousel-dots"
      className={cn(
        "mt-2 [--blossom-dot-color:var(--primary)] [--blossom-dot-opacity:0.25] [--blossom-dot-size:0.5rem]",
        className
      )}
      {...props}
    />
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
}

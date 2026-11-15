import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function CarouselExample() {
  return (
    <Carousel className="w-full max-w-xl">
      <CarouselContent>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <CarouselItem key={n} className="w-2/5">
            <Card>
              <CardContent className="flex aspect-4/5 items-center justify-center">
                <span className="font-heading text-4xl font-bold">{n}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots />
    </Carousel>
  )
}

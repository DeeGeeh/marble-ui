"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import {
  Skeleton,
  SkeletonAvatar,
  SkeletonReveal,
  SkeletonText,
} from "@/components/ui/skeleton"

export default function SkeletonExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-8">
      <Item>
        <ItemMedia>
          <SkeletonAvatar />
        </ItemMedia>
        <ItemContent>
          <SkeletonText lines={2} />
        </ItemContent>
      </Item>
      <Card>
        <CardContent>
          <Skeleton className="aspect-video w-full rounded-lg" />
        </CardContent>
        <CardContent>
          <SkeletonText />
        </CardContent>
      </Card>
      <SkeletonRevealDemo />
    </div>
  )
}

function SkeletonRevealDemo() {
  const [loading, setLoading] = useState(false)
  const reload = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1600)
  }
  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-4">
      <SkeletonReveal
        className="w-full"
        loading={loading}
        skeleton={
          <Item>
            <ItemMedia>
              <SkeletonAvatar />
            </ItemMedia>
            <ItemContent>
              <SkeletonText lines={2} />
            </ItemContent>
          </Item>
        }
      >
        <Item>
          <ItemMedia>
            <Avatar size="lg">
              <AvatarFallback>MU</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Marble UI</ItemTitle>
            <ItemDescription>Loaded with a gentle reveal</ItemDescription>
          </ItemContent>
        </Item>
      </SkeletonReveal>
      <Button variant="outline" size="sm" onClick={reload}>
        Simulate loading
      </Button>
    </div>
  )
}

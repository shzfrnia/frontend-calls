import { usePageTitle } from "@/hooks/use-page-title"
import { useApplicationServer } from "@/services/app-server"
import { useTranslation } from "react-i18next"
import { UserRound } from "lucide-react"

import { DefaultLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

import { UserCardList, UserCard } from "./components/user-card"

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max)
}

const info = [
  {
    username: "shadcn",
    avatar: "https://github.com/shadcn.png",
    email: "shadcn@vercel.com",
  },
  {
    username: "maxleiter",
    avatar: "https://github.com/maxleiter.png",
    email: "maxleiter@vercel.com",
  },
  {
    username: "evilrabbit",
    avatar: "https://github.com/evilrabbit.png",
    email: "evilrabbit@vercel.com",
  },
]

const people = new Array(30).fill("").map((_, index) => {
  return { ...info[getRandomInt(info.length)], id: index }
})

export function HomePage() {
  const { t } = useTranslation()
  usePageTitle(t("views.home-page.title"))
  const { setApplicationServerUrl } = useApplicationServer()

  return (
    <DefaultLayout>
      <DefaultLayout.LayoutLeftPanel>
        <DefaultLayout.LayoutHeaderPanel>
          <Button variant="outline" className="w-full">
            {t("views.home-page.find-or-start-call")}
          </Button>
        </DefaultLayout.LayoutHeaderPanel>
        <ScrollArea className="p-2 overflow-auto">
          <div>
            <Button variant="ghost" className="justify-start w-full">
              <UserRound /> Друзья
            </Button>
            <Separator className="mt-2" />
          </div>
          <div className="py-2 pl-2 pr-1">
            <div className="flex justify-between align-center">
              <p className="text-sm text-muted-foreground">
                {t("sidebar.header.house-tooltip")}
              </p>
            </div>
          </div>
          <UserCardList>
            {people.map((p) => {
              return <UserCard {...p} key={p.id} />
            })}
          </UserCardList>
        </ScrollArea>
      </DefaultLayout.LayoutLeftPanel>

      <DefaultLayout.LayoutContent>
        <DefaultLayout.LayoutHeaderPanel>
          <p>some header content</p>
        </DefaultLayout.LayoutHeaderPanel>
        <button onClick={() => setApplicationServerUrl("")}>reset</button>
      </DefaultLayout.LayoutContent>
    </DefaultLayout>
  )
}

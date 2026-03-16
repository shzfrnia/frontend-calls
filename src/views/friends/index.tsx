import { useTranslation } from "react-i18next"
import { UserRound, Search } from "lucide-react"

import { DefaultLayout } from "@/components/layout"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import { Field } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserCard, UserCardList } from "./components/user-card"
import { usePageTitle } from "@/hooks/use-page-title"

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
  {
    username: "misha",
    avatar: "https://avatars.githubusercontent.com/u/33577889?s=48&v=4",
    email: "pugumo68@gmail.com",
  },
]

const people = new Array(10).fill("").map((_, index) => {
  return { ...info[getRandomInt(info.length)], id: index }
})

export function Friends() {
  const { t } = useTranslation()
  usePageTitle(t("views.friends.title"))

  return (
    <Tabs defaultValue="online" className="flex-1 overflow-hidden">
      <DefaultLayout.LayoutHeaderPanel className="pl-2">
        <div className="flex gap-5">
          <div className="flex gap-2 items-center">
            <UserRound />
            <p className="font-semibold">{t("common.friends")}</p>
          </div>

          <TabsList>
            <TabsTrigger value="online">{t("common.online")}</TabsTrigger>
            <TabsTrigger value="all">{t("common.all")}</TabsTrigger>
          </TabsList>
        </div>
      </DefaultLayout.LayoutHeaderPanel>

      <TabsContent value="online" className="px-4 py-2 overflow-hidden">
        <div className="flex flex-col gap-5 h-full">
          <Field>
            <InputGroup>
              <InputGroupInput
                id="input-group-url"
                placeholder={t("common.search")}
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <ScrollArea className="h-full overflow-hidden">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                {t("common.online")} — {people.length}
              </p>
              <UserCardList>
                {people.map((p) => {
                  return <UserCard {...p} key={p.id} />
                })}
              </UserCardList>
            </div>
          </ScrollArea>
        </div>
      </TabsContent>
      <TabsContent value="all">all</TabsContent>
    </Tabs>
  )
}

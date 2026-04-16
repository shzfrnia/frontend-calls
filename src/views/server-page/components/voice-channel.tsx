import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Volume2, Settings, UserRoundPlus } from "lucide-react"

import { Badge } from "@/components/ui/badge"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui-proxy/button"

export function VoiceChannel({ name }: { name: string }) {
  const { t } = useTranslation()

  return (
    <NavLink to={`channel/${name}`}>
      {({ isActive }) => {
        return (
          <div
            className={cn(
              "group",
              "flex items-center gap-2",
              "p-1",
              "cursor-pointer",
              "rounded-md",
              "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
            )}
          >
            <Volume2 className="h-[1rem] shrink-0" />
            <div className="grid">
              <p className="truncate">{name}</p>
              {isActive}
            </div>

            <div className="flex ml-auto items-center shrink-0">
              <Badge
                variant="outline"
                className="text-[.6rem] group-hover:pointer-events-none group-hover:opacity-0 group-hover:absolute"
              >
                0 / 69
              </Badge>

              <div className="opacity-0 absolute pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:static">
                <Button
                  size="icon-xs"
                  variant="ghost"
                  tooltip={t("common.invite")}
                >
                  <UserRoundPlus />
                </Button>
                <Button
                  size="icon-xs"
                  variant="ghost"
                  tooltip={t("common.settings")}
                >
                  <Settings />
                </Button>
              </div>
            </div>
          </div>
        )
      }}
    </NavLink>
  )
}

import { useTranslation } from "react-i18next"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LocalizationToggler() {
  const { i18n, t } = useTranslation()

  const languages = Object.keys(i18n.services.resourceStore.data)

  return (
    <Select defaultValue={i18n.language} disabled>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {languages.map((lang) => {
            return (
              <SelectItem key={lang} value={lang}>
                {t(`common.localizations.${lang}`)}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

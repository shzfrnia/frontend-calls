import { useTranslation } from "react-i18next"

import { ThemeToggler } from "@/components/theme-toggler"
import { LocalizationToggler } from "@/components/localization-toggler"

import { MainBlock } from "../main-block"
import { SecondaryBlock } from "../secondary-block"

export function SettingsApplication() {
  const { t } = useTranslation()

  return (
    <MainBlock>
      <SecondaryBlock
        header={t(
          "dialogs.settings.nav.general.nav.application-settings.choose-theme.header"
        )}
        description={t(
          "dialogs.settings.nav.general.nav.application-settings.choose-theme.description"
        )}
      >
        <ThemeToggler />
      </SecondaryBlock>

      <SecondaryBlock
        header={t(
          "dialogs.settings.nav.general.nav.application-settings.choose-language.header"
        )}
        description={t(
          "dialogs.settings.nav.general.nav.application-settings.choose-language.description"
        )}
      >
        <LocalizationToggler />
      </SecondaryBlock>
    </MainBlock>
  )
}

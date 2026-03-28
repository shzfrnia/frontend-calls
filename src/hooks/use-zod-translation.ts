import { useTranslation } from "react-i18next"

const SEPARATOR = "|"

export function useZodTranslation() {
  const { t } = useTranslation()

  return {
    zodT: (source: string) => {
      const [text, args] = source.split(SEPARATOR)

      const preparedArgs: Record<string, string | number> = args
        ? JSON.parse(args)
        : {}

      return t(text, preparedArgs)
    },
  }
}

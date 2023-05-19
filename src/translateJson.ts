import { SourceLanguageCode, TargetLanguageCode, Translator } from "deepl-node"
import { flatten, unflatten } from "flat"

type Args = {
  authKey: string
  input: string | object
  sourceLang?: SourceLanguageCode
  targetLang: TargetLanguageCode
}

type JSON = {
  [key: string]: JSON | string
}

type FlatJSON = {
  [key: string]: string
}

export const translateJson = async (args: Args) => {
  const { authKey, input, sourceLang, targetLang } = args

  const json: JSON = typeof input === "string" ? JSON.parse(input) : input

  if (Object.keys(json).length === 0) {
    return {}
  }

  const preparedJson = flatten<JSON, FlatJSON>(json)

  const translator = new Translator(authKey)

  const translatedStrings = await translator.translateText(
    Object.values(preparedJson),
    sourceLang ?? null,
    targetLang,
    {
      tagHandling: "html",
    }
  )

  const translatedJson: FlatJSON = {}

  const keys = Object.keys(preparedJson)
  translatedStrings.forEach((value, index) => {
    translatedJson[keys[index]] = value.text
  })
  const resultJson = unflatten(translatedJson)

  return resultJson
}

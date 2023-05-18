import * as deepl from "deepl-node"

type Args = {
  authKey: string
  input: string | object
  sourceLang?: deepl.SourceLanguageCode
  targetLang: deepl.TargetLanguageCode
}

export const translateJson = (args: Args) => {
  const { authKey, input, sourceLang, targetLang } = args

  const json: object = typeof input === "string" ? JSON.parse(input) : input

  if (Object.keys(json).length === 0) {
    return {}
  }

  const translator = new deepl.Translator(authKey)

  // Translating...
}

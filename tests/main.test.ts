import * as dotenv from "dotenv"
import { suite } from "uvu"
import assert from "uvu/assert"
import { translateJson } from "../src/translateJson"

dotenv.config({
  path: ".env.tests",
  debug: true,
})

const DEEPL_AUTH_KEY = process.env.DEEPL_AUTH_KEY as string

const Translator = suite("Translator")

Translator(
  "Should return an empty output when recieving an empty input",
  () => {
    assert.equal(
      translateJson({
        authKey: DEEPL_AUTH_KEY,
        input: {},
        targetLang: "en-US",
        sourceLang: "ru",
      }),
      {}
    )
  }
)

Translator.run()

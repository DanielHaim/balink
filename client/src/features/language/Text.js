import { useContext } from "react"
import { LanguageContext } from "../../international/language"

export function Text({ tid }) {
    const languageContext = useContext(LanguageContext);
    return languageContext.dictionary[tid] || tid;
};
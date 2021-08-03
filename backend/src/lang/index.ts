import en from "./en"
import ptBR from "./pt-BR"

export const GetError = (lang: string | undefined, errorCode: string) => {
    switch (lang) {
        case "pt-BR":
            return ptBR[errorCode]
        default:
            return en[errorCode]
    }
}
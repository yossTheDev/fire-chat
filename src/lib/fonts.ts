import { Bebas_Neue, JetBrains_Mono as FontMono, Poppins as FontSans } from "next/font/google"

export const fontSans = FontSans({
    subsets: ["latin"],
    weight: ["400", "700"],
    style: "normal",
    variable: "--font-sans",
})
export const fontMono = FontMono({
    subsets: ["latin"],
    variable: "--font-mono",
})

export const fontBebas = Bebas_Neue({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-bebas",
})
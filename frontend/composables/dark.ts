import { useDark, useToggle } from '@vueuse/core'

export const isDark = useDark()
export const toggleDark = () => {
    const theme: string = !isDark.value ? "lara-dark-indigo" : "lara-light-indigo"
    // document.getElementById("theme")?.remove()
    useHead({
        link: [
            {
                rel: "stylesheet",
                id: "theme",
                href: `/themes/${theme}/theme.css`,
            }
        ]
    })
    return useToggle(isDark)()
}

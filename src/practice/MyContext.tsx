import { createContext, useState } from "react";

export const ThemeContext = createContext({})


const ThemeProvider = (Props: any) => {
    const [theme, setTheme] = useState<string>('dark');

    return <ThemeContext.Provider value={{ theme, setTheme }}>
        {Props.children}
    </ThemeContext.Provider>
}

export default ThemeProvider
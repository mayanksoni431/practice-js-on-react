import { useContext, useEffect, useLayoutEffect, useState } from "react";
import ThemeProvider, { ThemeContext } from "./MyContext";

const useDebounced = (value: any, delay: number) => {
    const [debounce, setDebounce] = useState()

    useEffect(() => {
        let handler = setTimeout(() => { console.log("timerExe"); setDebounce(value) }, delay)
        return () => { clearTimeout(handler); console.log("decouple") }
    }, [delay])

    return (debounce)
}

const Practice = () => {
    // const contextData = useContext(ThemeContext)



    const [text, setText] = useState('');
    // const id = useId()
    // const id2 = useId()

      const id = 'a'
    const id2 = 'b'
    const handleChange = (event: any) => {
        setText(event.target.value);
        console.log("newId", id, id2)
    };
    useEffect(() => {
        console.log("couple useEffect")
        return (() => {
            console.log('decouped useEffect')
        })
    }, [text])

    useLayoutEffect(() => {
        console.log("couple useLayoutEffect")
        return () => {
            console.log('decouple uselayoutEfferct')
        }
    }, [text])

    return (
        <>
        </>
    )
}

const Index = () => {
    return (
        <ThemeProvider>
            <Practice />
        </ThemeProvider>
    )
}

export default Index;
import React, { useEffect, useState, useTransition } from "react"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";

const useDebounced = (text: any, delay: number) => {
    const [value, setValue] = useState<any>();
    useEffect(() => {
        const handler = setTimeout(() => setValue(text), delay)
        return () => clearTimeout(handler)
    }, [text, delay])
    return value;
}

const LoadingSpiner = () => {
    return <>Loading...</>
}

const Message = (props: any) => {
    const counter = useSelector((store: any) => store.counter)
    console.log("selectorVal", counter)
    const dispatch = useDispatch()

    return <>
        <>{props.msg}</>
        <div>Redux Playgound</div>
        <div>
            <div>
                {`Counter Value ${counter}`}
            </div>
            <div><button onClick={() => { console.log("ClickAMM"); dispatch({ type: "ADD" }) }}>INC</button></div>
            <div><button onClick={() => { console.log("ClickRM"); dispatch({ type: "RM" }) }}>RM</button></div>
        </div>
    </>
}

const withLoading = (Comp: any) => {
    return (props: any) => (
        props.isLoading ?
            <LoadingSpiner /> :
            <Comp {...props} />
    )
}

const Index = () => {
    // return withLoading(<Message msg={'Main Page'} isLoading={true} />)

    const [text, setText] = useState<string>()
    const [fText, setFText] = useState<string>()

    const [isPending, startTransition] = useTransition();


    useEffect(() => {
        startTransition(() => {
            console.log('transiotion', text, fText)
            setFText(text)
        })
        if (!isPending) {
            console.log('transiotion 2', text, fText)
            setFText('No value')
        }
    }, [text])

    return (
        <>
            <input type={'text'} onChange={(event) => setText(event.target.value)}></input>
            <div>{useDebounced(text, 1000)}</div>
            <div>{isPending ? 'Pending' : fText}</div>

            <Provider store={store}>
                <Message />
            </Provider>

        </>
    )

}

export default Index;
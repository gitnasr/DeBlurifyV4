import { useEffect, useState } from "react"

import { getFromStorage } from "../services/Storage"

const useAppConfig = () => {
    const [config, setConfig] = useState({})
    useEffect(() => {
        async function getConfig(){
            const storedConfig = await getFromStorage("config")
            const jsonConfig = JSON.parse(storedConfig)
            console.log("🚀 ~ file: useAppConfig.js:9 ~ useEffect ~ storedConfig:", jsonConfig)
            setConfig(storedConfig)
        }
        getConfig()
    },[])
    return config
}

export default useAppConfig
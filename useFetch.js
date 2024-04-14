import { useEffect, useState } from "react"

export const useFetch = (url) => {
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasEror: null,
        error: null,
    });

    const localCache = {};

    useEffect (() => {
       getFetch();
    }, [url]);

    const setLoadingState = () =>{
        setState ({
            data:null,
            isLoading:true,
            hasEror:null,
            error:null
        });
    }
    const getFetch = async () => {
        
        if(localCache[url]){
            setState({
                data:localCache[url],
                isLoading:false,
                hasEror:false,
                error:null,
            });
            return;
        }
        setLoadingState();
        const response = await fetch(url);      

        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if(!response.ok){
            setState({
                data: null,
                isLoading: false,
                hasEror: true,
                error:{
                    code: response.status,
                    message: response.statusText
                }
            });
            return;
        }
        const data = await response.json();
        setState({
            data: data,
            isLoading: false,
            hasEror: false,
            error: null,
        });

        localCache[url]=data;

    }

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasEror: state.hasEror,
    }
}
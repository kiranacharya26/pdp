import { useEffect } from "react";

const useInfiniteScroll = (callback) => {
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                callback();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [callback]);
};

export default useInfiniteScroll;

import Carousel from "../components/carousel/Carousel"
import Posts from "../components/posts/Posts"
import styles from "./home.module.css"

export default function Home() {
    return (
        <>
            <Carousel />
            <Posts />
            <Posts />
            <Posts />
            <Posts />
        </>
    )
}

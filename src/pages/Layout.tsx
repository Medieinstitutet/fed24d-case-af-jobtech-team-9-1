import { Outlet } from "react-router"

export const Layout = () => {
    return<>
        <header>Header</header>
        <main>
            <Outlet/>
        </main>
        <footer>Footer</footer>
    </>
}
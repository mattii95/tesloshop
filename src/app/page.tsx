import { titleFont } from "@/config/fonts";

export default function Home() {
    return (
        <main>
            <h1>Hello world</h1>
            <h1 className={titleFont.className}>Hello world 2</h1>
        </main>
    );
}

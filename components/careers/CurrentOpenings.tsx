import { getCareers } from "@/lib/keystatic";
import CurrentOpeningsClient from "./CurrentOpeningsClient";

export default async function CurrentOpenings() {
    const careers = await getCareers();

    return <CurrentOpeningsClient careers={careers} />;
}

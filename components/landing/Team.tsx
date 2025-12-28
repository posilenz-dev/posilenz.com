import { getCareers } from "@/lib/keystatic";
import TeamClient from "./TeamClient";

export default async function Team() {
    const careers = await getCareers();

    return <TeamClient careers={careers} />;
}

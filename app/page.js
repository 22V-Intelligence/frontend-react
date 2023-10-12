import { headers } from "next/headers";
import sectionRenderer from "./utils/sectionRenderer";
import getPageBySlug from "../lib/getPageBySlug";

export default async function Page(props) {
    const data = await getPageBySlug("/");
    const sections = data[0]?.attributes?.Sections;

    return sectionRenderer(sections);
}

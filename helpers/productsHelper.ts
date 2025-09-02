import { FilterItems } from "@/types/commerce";

export const selectedFilter = (slugs:string[], type: FilterItems) => { return (slugs?.filter(x => x.includes(`${type}-`))?.map(x => x.split(`${type}-`)?.[1])) || [] };
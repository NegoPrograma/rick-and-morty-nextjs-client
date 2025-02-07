import { Gender } from "./Gender";
import { Status } from "./Status";

export interface Filters {
    name?: string | null;
    status?: Status | null;
    species?: string | null;
    type?: string | null;
    gender?: Gender | null;
    page?: number | null;
}
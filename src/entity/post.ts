import { Creator } from "./creator";

export interface IPost{
    id: string,
    content: string,
    likes: number | undefined,
    dislikes: number | undefined,
    created_at: string,
    updated_at: string,
    creator_id: string
}
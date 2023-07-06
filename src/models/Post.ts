import { Creator } from "../entity/creator"

export class Post {
    constructor(
        private id: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string,
        private creator: {
            id: string,
            name: string
        }
    ) {}

    public getId(): string {
        return this.id
    }

    public setId(newId: string): void {
        this.id = newId
    }

    public getContent(): string {
        return this.content
    }

    public setContent(newContent: string): void {
        this.content = newContent
    }

    public getLikes(): number {
        return this.likes
    }

    public setGetLikes(newGetLikes: number): void {
        this.likes = newGetLikes
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(newGetDislikes: number): void {
        this.dislikes = newGetDislikes
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public getUpdateAt(): string {
        return this.updatedAt
    }

    public setUpdateAt(NewUpdatedAt: string): void {
        this.updatedAt = NewUpdatedAt
    }

    public getCreator(): Creator {
        return this.creator
    }
    
    public setCreator(NewCreator: Creator): void {
        this.creator = NewCreator
    }
}
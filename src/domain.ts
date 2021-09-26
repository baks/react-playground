type Result<T> = { data: T, kind: "success" } | { error: string, kind: "failure" };
type NonEmptyTitle = {
    readonly NonEmptyTitle: unique symbol;
};

function isNonEmptyTitle(s: string): s is PostTitle {
    return s.length > 0
}

export type Optional<T> = T | null;
export type PostTitle = string & NonEmptyTitle;

export type Post = Readonly<{
    userId: number;
    id: number;
    title: PostTitle;
    body: string;
}>;

export type Comment = Readonly<{
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}>;

export function createPostTitle(s: string): Result<PostTitle> {
    return isNonEmptyTitle(s) ? { data: s, kind: "success" } : { error: "invalid title", kind: "failure" };
}
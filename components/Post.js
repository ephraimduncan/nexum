import Link from "next/link";

export default function Post({ post }) {
  return (
    <Link href={`/post/${post.id}`}>
      <div className="post-card">
        <div className="post-card-draft">
          <h2>{post.title}</h2>
          {post.published ? "" : <span className="draft-span">Draft</span>}
        </div>
        <small>By {post.author.name}</small>
      </div>
    </Link>
  );
}

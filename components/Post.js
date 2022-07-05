export default function Post({ post }) {
  return (
    <div className="post-card">
      <div className="post-card-draft">
        <h2>{post.title}</h2>
        {post.published ? "" : <span className="draft-span">Draft</span>}
      </div>
      <small>By {post.author.name}</small>
      <style jsx>{`
        .post-card-draft {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .draft-span {
          color: #f43f5e;
        }
      `}</style>
    </div>
  );
}

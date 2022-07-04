export default function Post({ post }) {
  return (
    <div className="draft-post">
      <h2>{post.title}</h2>
      <small>By {post.author.name}</small>
      <style jsx>{``}</style>
    </div>
  );
}

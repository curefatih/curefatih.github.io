import BlogLayout from "./blog";

export default function PostLayout(props) {
  return (
    <BlogLayout title={`Fatih Cüre | ${props.title}`}>
      <div className="markdown-body my-5">
        <article className="dark:text-white">
          <div dangerouslySetInnerHTML={{ __html: props.content }} />
        </article>
      </div>
    </BlogLayout>
  );
}

function Post({ title, category, imageSrc }) {
    return (
        <div className="post">
            <img src={imageSrc} alt={title} className="post-image" />
            <div className="post-category">{category}</div>
            <h3 className="post-title">{title}</h3>
        </div>
    );
}

export default Post;

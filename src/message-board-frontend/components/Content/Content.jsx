import Post from './Post.jsx'

function Content() {
    return (
        <div className="content">
            <Post 
            title="Example Post Title" 
            category="News" 
            imageSrc="/images/Capture.PNG"
            />
        </div>
    );
}

export default Content;

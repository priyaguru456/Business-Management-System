import { Link } from "react-router-dom";

export default function UserSidebar(){

return(

<div className="userSidebar">

<style>{`

.userSidebar{
width:220px;
background:white;
padding:20px;
border-right:1px solid #eee;
min-height:100vh;
box-shadow:2px 0 8px rgba(0,0,0,0.05);
font-family:Arial;
}

.userSidebar h3{
margin-bottom:20px;
color:#2874f0;
}

.categoryLink{
display:block;
padding:10px;
margin-bottom:10px;
text-decoration:none;
color:#333;
border-radius:6px;
font-weight:500;
transition:0.2s;
}

.categoryLink:hover{
background:#f1f3f6;
color:#2874f0;
transform:translateX(3px);
}

`}</style>

<h3>Categories</h3>

<Link className="categoryLink" to="/category/Electronics">
📱 Electronics
</Link>

<Link className="categoryLink" to="/category/Fashion">
👕 Fashion
</Link>

<Link className="categoryLink" to="/category/Books">
📚 Books
</Link>

<Link className="categoryLink" to="/category/Home">
🏠 Home
</Link>

</div>

)

}
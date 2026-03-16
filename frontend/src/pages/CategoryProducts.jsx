import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";

export default function CategoryProducts(){

const {name} = useParams();
const [products,setProducts] = useState([]);

useEffect(()=>{

const fetchProducts = async ()=>{

const res = await API.get("/products");

const filtered = res.data.filter(p=>p.category === name);

setProducts(filtered);

};

fetchProducts();

},[name]);

return(

<div>

<h2>{name} Products</h2>

{products.map(p=>(
<div key={p._id}>

<h4>{p.name}</h4>
<p>₹ {p.price}</p>

</div>
))}

</div>

)

}
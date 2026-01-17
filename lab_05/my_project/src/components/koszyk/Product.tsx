type ProductProps = {
    nazwa: string;
}
function Product({ nazwa } : ProductProps){
    return <div>{nazwa}</div>
}

export default Product;
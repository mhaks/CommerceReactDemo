
import { useLoaderData, redirect } from "react-router";
import { Form, } from "react-router-dom";


export async function loader({params}) {
    const url = `${import.meta.env.VITE_REACT_APP_API_URL}/Shopping/Products/${params.id}`;
    let product = null;
    await fetch(url)
        .then(response => response.json())
        .then(data  => { product = data; })
        .catch(error => console.error(error));
   
    return product;
}


export async function action({request}) {
    const formData = await request.formData(); 
    const addCartUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/Shopping/Cart/Products`;
    await fetch(addCartUrl, {
        method: 'POST',
                body: formData,
    });     
    return redirect('../cart/');
}

export default function Product() {

    const product = useLoaderData();

    return (
        <>
            <section className="bg-dark py-1">
                <div className="container px-4 px-lg-5">
                    <div className="text-left text-white">
                        <h5 className="fw-bolder">Product</h5>
                    </div>
                </div>
            </section>


            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">

                        {product != null ? (
                            <>
                            <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src="/product_600x700.jpg" alt={product.title} /></div>
                            <div className="col-md-6">
                                <div className="small mb-1">{product.modelNumber}</div>
                                <h1 className="display-5 fw-bolder">{product.title}</h1>
                                <div className="small mb-1">{product.brand}</div>
                                <p className="lead">{product.description}</p>
                                <div className="fs-5 mb-5">
                                    <span>${product.price}</span>
                                </div>                
                                <div className="d-flex">
                                    <Form method="put" >
                                        <input type='hidden' name='productId' value={product.id}/>
                                        <input className="form-control text-center me-3" name="quantity" type="number" defaultValue="1" min="1" style={{maxWidth: 3 + "rem"}} />
                                        <button className="btn btn-outline-dark flex-shrink-0" type="submit">
                                            <i className="bi-cart-fill me-1"></i>
                                            Add to cart
                                        </button>
                                    </Form>
                                </div>
                            </div>
                            </>
                        ) : (
                            <h3>Loading</h3>
                        )}                           
                        
                    </div>
                </div>
            </section>
        </>
        
    ); 
}
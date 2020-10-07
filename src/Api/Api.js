const ulr_base="https://api.mercadolibre.com/";

const ENPOINTS={
    SEARCH:"sites/MLA/search?q=",
    CURRENCIES:"currencies/",
    DETAILITEM:"items/",
    DETAILITEMDESCRIPTION:"/description"
}

const getListProducts = async (query) => {
    const response = await fetch(`${ulr_base}${ENPOINTS.SEARCH}${query}`);
    const json = await response.json();
    let categories=[];
    let items=[];
    if(json.filters.length > 0){
        categories = json.filters
        .filter(filter=> filter.id ==="category")
        .reduce((categoryname,category)=>{
            return category.values;
        },{})
        .reduce((categoryname,category)=>{
            return category.path_from_root;
        },{})
        .reduce((previusCategory,nextCategoty)=>{
            previusCategory.push(nextCategoty.name);
            return previusCategory;
        },[]);
    }

    if(json.results.length > 0){
        items = await Promise.all(json.results.slice(0, 4).map(async (product)=>{
            const price= await getCurrency(product.currency_id,product.price);
            let newData={
                "id" : product.id,
                "title":product.title,
                "price": price,
                "picture": product.thumbnail,
                "condition": product.condition,
                "free_shipping": product.shipping.free_shipping
            };
            return newData;
        }).reduce((previusCategory,nextCategoty)=> {
            previusCategory.push(nextCategoty);
            return previusCategory;
        },[]));
    }
    const data={"author":{"name":"Cristian","lastname":"Preciado"},"categories":categories,"items":items};
    return data;
}

const getItemDetail = async (id) => {
    const response = await fetch(`${ulr_base}${ENPOINTS.DETAILITEM}${id}`);
    const json = await response.json();
    const responseDescription = await fetch(`${ulr_base}${ENPOINTS.DETAILITEM}${id}${ENPOINTS.DETAILITEMDESCRIPTION}`);
    const jsonDescription = await responseDescription.json();
    let items={
        "id" : json.id,
        "title":json.title,
        "price": await getCurrency(json.currency_id,json.price),
        "picture": json.thumbnail,
        "condition": json.condition,
        "free_shipping": json.shipping.free_shipping,
        "sold_quantity": json.sold_quantity,
        "description": jsonDescription.plain_text,
    };
    const data={"author":{"name":"Cristian","lastname":"Preciado"},"item":items};
    return data;
}

const getCurrency = async (idCurrency,price) => {
    const responsecat = await fetch(`${ulr_base}${ENPOINTS.CURRENCIES}${idCurrency}`);
    const json = await responsecat.json();
    return {"currency":json.symbol,"amount":price,"decimals":json.decimal_places};
}

export {getListProducts,getItemDetail};
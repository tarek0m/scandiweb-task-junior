<?php
defined('ROOTPATH') or exit('Access Denied!');

/**
 * Home class
 */
class Home
{
    use Controller;

    public function index()
    {
        $product = new Product;
        $products = $product->findAll();
        echo json_encode($products);
    }

    public function addProduct()
    {
        $request = json_decode(file_get_contents('php://input'));

        $product = new Product;
        $product->insert([
            'sku' => $request->sku,
            'name' => $request->name,
            'price' => $request->price,
            'productType' => $request->productType,
            'features' => get_features($request)
        ]);
        $products = $product->findAll();
        echo json_encode($products);
    }


    public function deleteProducts($ids)
    {
        $product = new Product;
        $product->delete($ids, 'sku');
        $products = $product->findAll();
        echo json_encode($products);
    }
}

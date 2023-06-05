<?php
/*
* Product Class
*/
class Product
{
    use Model;

    protected $table = 'products';
    protected $order_column = "CAST(REGEXP_REPLACE(sku, '[^0-9]*([0-9]+).*', '\\1') AS UNSIGNED), sku";
    protected $limit = 100000000000;    // no pagination, no limit
}

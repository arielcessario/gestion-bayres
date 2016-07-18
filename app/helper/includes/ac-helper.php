<?php
session_start();
/*
if (file_exists('../../../includes/MyDBi.php')) {
    require_once '../../../includes/MyDBi.php';
    //require_once '../../../includes/utils.php';
} else {
    require_once 'MyDBi.php';
}
*/

$data = file_get_contents("php://input");

$decoded = json_decode($data);
if ($decoded != null) {
    if ($decoded->function == 'create') {
        create($decoded->sucursal);
    }elseif($decoded->function == 'save') {
        save($decoded->sucursal);
    }
} else {
    /*
    $function = $_GET["function"];
    if ($function == 'getNoticias') {
        getNoticias();
    }
    */
}

function create($sucursal){

    $sucursal_decoded = json_decode($sucursal);
    $asiento_id = $sucursal_decoded->asiento_id;

    /*
    for($sucursal_decoded->despues as $item){
        $despues .= "stock_id:" . $item->stock_id . " - Cant Actual:" . $item->cantidad_actual . "\n";
    }
    */

    $file = 'ventas.log';
    $current = file_get_contents($file);
    $current .= date('Y-m-d H:i:s') . ": asiento_id: " . $asiento_id . "\n";
    //$current .= $despues . "\n";
    file_put_contents($file, $current);

}

function save($sucursal){

    $decoded = json_decode($sucursal);
    $asiento_id = $decoded->asiento_id;

    $despues = "";
    $detalles = "";

    foreach($decoded->despues as $item){
        $despues .= "DESPUES: stock_id: " . $item->stock_id . " - cant_actual: " . $item->cant_actual . "\n";
    }

    foreach($decoded->detalles as $item){
        $detalles .= "DETALLES: cantidad: " . $item->cantidad . " - iva: " . $item->iva .
            " - precio_total: " . $item->precio_total . " - producto_id: " . $item->producto_id .
            " - producto_nombre: " . $item->producto_nombre . " - productos_tipo: " . $item->productos_tipo .
            "\n";

        foreach($item->productos_kit as $item1){
            $detalles .= " -- producto_id: " . $item1->producto_id . " - producto_kit_id: " . $item1->producto_kit_id ."\n";

            foreach($item1->stock as $stock){
                $detalles .= " *** STOCK: stock_id: " . $stock->stock_id . " - cant_actual: " . $stock->cant_actual .
                    " - costo_uni: " . $stock->costo_uni . " - sucursal_id: " . $stock->sucursal_id .
                    "\n";
            }
            foreach($item1->stocks as $stocks){
                $detalles .= " === STOCKS: stock_id: " . $stocks->stock_id . " - cant_actual: " . $stocks->cant_actual .
                    " - costo_uni: " . $stocks->costo_uni . " - sucursal_id: " . $stocks->sucursal_id .
                    "\n";
            }
        }

        foreach($item->stock as $item2){
            $detalles .= " -- stock_id: " . $item2->stock_id . " - cant_actual: " . $item2->cant_actual .
                " - costo_uni: " . $item2->costo_uni . " - sucursal_id: " . $item2->sucursal_id .
                "\n";
        }
    }

    $file = 'ventas.log';
    $current = file_get_contents($file);
    $current .= date('Y-m-d H:i:s') . ": asiento_id: " . $asiento_id . "\n";
    $current .= $despues;
    $current .= $detalles . "\n";
    $current .= "/***************************************************************************/\n";
    file_put_contents($file, $current);


    echo json_encode($sucursal);

}
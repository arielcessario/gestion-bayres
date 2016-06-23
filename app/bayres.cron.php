<?php
//phpinfo();

require_once 'includes/MyDBi.php';
$db = new MysqliDbasfads();

//OBTENGO EL MES Y AÑO ACTUAL
$anio = date('Y');
$mes = date('m');

//RECUPERO EL DIA, MES, AÑO ANTERIOR
$anio_ant = ($mes == 1) ? $anio - 1 : $anio;
$mes_ant = ($mes == 1) ? 12 : $mes - 1;
$dia = date("d", mktime(0,0,0, $mes_ant+1, 0, $anio_ant));

//ARMO LAS FECHAS PARA REALIZAR EL FILTRO
$fecha_desde =  date('Y-m-d', mktime(0,0,0, $mes_ant, 1, $anio_ant));
$fecha_hasta = date('Y-m-d', mktime(0,0,0, $mes_ant, $dia, $anio_ant));

//OBTENGO EL TOTAL DE LOS MOVIMIENTOS PARA DETERMINADAS CUENTAS DEL MES QUE CERRO
$results = $db->rawQuery("SELECT
                            cuenta_id as cuenta_id,
                            IFNULL(SUM(importe), 0) AS total
                          FROM movimientos
                          WHERE DATE(fecha) BETWEEN '$fecha_desde' AND '$fecha_hasta'
                            AND (cuenta_id = '1.1.1.01' OR cuenta_id = '1.1.1.02'
                            OR cuenta_id = '1.1.1.03' OR cuenta_id = '1.1.1.10'
                            OR cuenta_id = '1.1.1.31' OR cuenta_id = '1.1.1.32'
                            OR cuenta_id = '1.1.1.33' OR cuenta_id = '1.1.1.34')
                          GROUP BY cuenta_id");

//SI HUBO MOVIMIENTOS EL MES PASADO SIGO
if($db->count > 0) {

    foreach ($results as $row) {

        //DETERMINO SI EN LA TABLA RESULTADOS, YA EXISTE ALGUNA CUENTA PARA EL MES Y AÑO QUE CERRO
        $resultados = $db->rawQuery("SELECT
                            resultado_id,
                            anio,
                            mes,
                            cuenta_id,
                            total
                          FROM resultados
                          WHERE anio= ".$anio_ant."
                            AND mes = ".$mes_ant."
                            AND cuenta_id = '". $row['cuenta_id'] ."'");

        //SI NO EXSTE UN REGISTRO PARA ESA CUENTA LO INSERTO
        if($db->count == 0) {
            $data = array(
                'anio' => $anio_ant,
                'mes' => $mes_ant,
                'cuenta_id' => $row['cuenta_id'],
                'total' => $row['total']
            );

            $result = $db->insert('resultados', $data);
            if ($result > -1) {
                //SE INSERTO EL REGISTRO
                //echo ("Registro insertado");
            } else {
                //ERROR INSERTANDO
                //echo ("Error insertando el registro");
            }
        } else {
            //SI EXISTE UN REGISTRO NO HAGO NADA
            //echo("Existe un registro");
        }
    }
}



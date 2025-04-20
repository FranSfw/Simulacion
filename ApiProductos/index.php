<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Guardar el código del producto
$codigo = isset($_GET["codigo"]) ? trim($_GET["codigo"]) : "";

if (empty($codigo)) {
    response(400, "Bad Request: código de producto no proporcionado", null);
    exit;
}

// Conexión a la base de datos
$conexion = mysqli_connect("localhost", "root", "root", "dbsimulacion");

if (!$conexion) {
    response(500, "Internal Server Error: error de conexión", null);
    exit;
}

// Escapar el código del producto para evitar inyecciones SQL
$codigo = mysqli_real_escape_string($conexion, $codigo);

// Consulta para buscar el producto por su código
$consulta = "SELECT producto_nombre, producto_precio, producto_imagen FROM productos WHERE producto_codigo = '$codigo'";

// Ejecutar la consulta
$resultado = mysqli_query($conexion, $consulta);

if (!$resultado) {
    response(500, "Internal Server Error: error en la consulta", null);
    exit;
}

// Verifica si hay resultados
$fila = mysqli_fetch_assoc($resultado);

if ($fila) {
    response(200, "OK: Producto encontrado", $fila);
} else {
    response(404, "Not Found: Producto no encontrado", null);
}

// Cierra la conexión
mysqli_close($conexion);

// Función para devolver una respuesta JSON
function response($status, $mensaje, $data = []) {
    http_response_code($status);
    $respuesta = [
        "status" => $status,
        "mensaje" => $mensaje
    ];

    if (!empty($data)) {
        $respuesta["data"] = $data;
    }

    echo json_encode($respuesta);
    exit;
}
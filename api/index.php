<?php
error_reporting(0);

require_once "conf.php";

/**
 * Simple Endpoint
 */

// MySQL connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error)
    die("Connection failed: " . $conn->connect_error);

if (mysqli_connect_errno())
  echo "Failed to connect to MySQL: " . mysqli_connect_error();

function sqlGetItems() {
	global $conn;

	$params = array();
	$where = array();
	$default_params = array(
		'id' => '',
		'allowed' => '',
		'order_by' => ''
	);

	// Get params
	foreach ($default_params as $key => $value) {
		if ($_GET[$key] === 0 || !empty($_GET[$key]))
			$params[$key] = $_GET[$key];
	}

	// Build Filters
	if (!empty($params['id']))
		$where[] = "id = '" . intval($params['id']) . "'";

	if (!empty($params['allowed']))
		$where[] = "allowed = '" . intval($params['allowed']) . "'";

	if (!empty($where))
		$where_sql = 'WHERE ' . implode(' AND', $where);

	// Build SQL
	$sql = "SELECT *
		FROM items " .
		$where_sql;

	$res = $conn->query($sql);

	// Build output
	$data = (object) array();
	if (!empty($params['id'])) {
		while($row = $res->fetch_assoc()) {
			$data = (object) $row;
			break;
		}
		return $data;
	}

	$data = array();
	if ($res->num_rows > 0) {
	    while($row = $res->fetch_assoc()) {
    		$data[] = (object) $row;
	    }
	    return $data;
    }
}

if (empty($_POST)) {
	$out = sqlGetItems();
	echo json_encode($out);
}
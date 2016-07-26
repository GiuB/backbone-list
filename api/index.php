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
		'approved' => '',
		'order_by' => '',
		'page' => 1
	);

	// Get params
	foreach ($default_params as $key => $value) {
		if ($_GET[$key] === 0 || !empty($_GET[$key]))
			$params[$key] = $_GET[$key];
	}

	// Build Filters
	if (!empty($params['id']))
		$where[] = "id = '" . intval($params['id']) . "'";

	if (!empty($params['approved']))
		$where[] = "approved = '" . intval($params['approved']) . "'";

	$limit = "LIMIT " . PAGINATION_SIZE . "";
	if (!empty($params['page']) && (int)$params['page'] > 1) {
		$offset = (int)$params['page'] * PAGINATION_SIZE;
		$limit = "LIMIT " . PAGINATION_SIZE . ", $offset";
	}

	if (!empty($where))
		$where_sql = 'WHERE ' . implode(' AND', $where);

	// Build SQL
	$sql = "SELECT SQL_CALC_FOUND_ROWS *
		FROM items " .
		$where_sql .
		$limit;

	$res   = $conn->query($sql);
	$total = $conn->query("SELECT FOUND_ROWS() AS total");
	$tot   = mysqli_fetch_array($total);

	$data = array();
	if ($res->num_rows > 0) {
	    while($row = $res->fetch_assoc()) {
    		$data[] = (object) $row;
	    }
    }

    return (object) array(
    	'total_count' => (int)$tot['total'],
    	'items' => $data
	);
}

if (empty($_POST)) {
	$out = sqlGetItems();
	echo json_encode($out);
}
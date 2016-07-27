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
		'page' => 1,
		'approved' => '',
		'sort' => 'id',
		'order' => 'ASC'
	);

	// Get params
	$input = empty($_POST)? $_GET : $_POST;
	foreach ($default_params as $key => $value) {
		if ($input[$key] === 0 || !empty($input[$key]))
			$params[$key] = $input[$key];
	}

	// Build Filters
	if (!empty($params['id']))
		$where[] = "id = '" . intval($params['id']) . "'";

	if (!empty($params['approved']))
		$where[] = "approved = '" . intval($params['approved']) . "'";

	// Build order
	$order = "ORDER BY " . $default_params['sort'] . ' ' . $default_params['order'];
	$sort_by = !empty($params['order'])? $params['order'] : $default_params['order'];
	if (!empty($params['sort']))
		$order = "ORDER BY " . $params['sort'] . ' ' . strtoupper($sort_by);

	// Build limit
	$limit = "LIMIT " . PAGINATION_SIZE . "";
	if (!empty($params['page']) && (int)$params['page'] > 1) {
		$offset = ((int)$params['page'] - 1) * PAGINATION_SIZE;
		$limit = "LIMIT $offset, " .PAGINATION_SIZE;
	}

	$where_sql = "";
	if (!empty($where))
		$where_sql = 'WHERE ' . implode(' AND', $where);

	// Build SQL
	$sql = "SELECT SQL_CALC_FOUND_ROWS *
		FROM items" . " " .
		$where_sql . " " .
		$order . " " .
		$limit;

	//echo $sql; exit;

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
<?php

defined('ROOTPATH') or exit('Access Denied!');

if ($_SERVER["SERVER_NAME"] == 'localhost') {
    // database config
    define('DB_NAME', 'scandiweb-asg');
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PSW', '');

    define('ROOT', 'http://localhost:3000/public');
} else {
    // database config
    define('DB_NAME', 'id20862646_tarek');
    define('DB_HOST', 'localhost');
    define('DB_USER', 'id20862646_root');
    define('DB_PSW', 'Root_123');

    define('ROOT', 'https://scandiweb-test-tarek.000webhostapp.com');
}

// turn it to false (don't show errors) when in live server
define('DEBUG', false);

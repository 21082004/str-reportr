<?php
require 'vendor/autoload.php'; // Load PhpSpreadsheet

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $name = $_POST['name'];
    $service = $_POST['service'];
    $instructions = $_POST['instructions'];

    // Check if the Excel file exists
    $filePath = 'contact_info.xlsx';
    if (file_exists($filePath)) {
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($filePath);
    } else {
        $spreadsheet = new Spreadsheet();
        $spreadsheet->getActiveSheet()->setCellValue('A1', 'Name');
        $spreadsheet->getActiveSheet()->setCellValue('B1', 'Service');
        $spreadsheet->getActiveSheet()->setCellValue('C1', 'Instructions');
    }

    // Append new data
    $sheet = $spreadsheet->getActiveSheet();
    $rowCount = $sheet->getHighestRow() + 1; // Find the next empty row

    $sheet->setCellValue('A' . $rowCount, $name);
    $sheet->setCellValue('B' . $rowCount, $service);
    $sheet->setCellValue('C' . $rowCount, $instructions);

    // Save the file
    $writer = new Xlsx($spreadsheet);
    $writer->save($filePath);

    // Redirect back to the form with a success message
    header('Location: index.php?success=1');
    exit();
}
?>

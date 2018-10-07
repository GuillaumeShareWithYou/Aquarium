<?php

$dirs = scandir(__DIR__);
$dirs = array_filter($dirs, function ($dir) {
    return !preg_match("/^\./", $dir);
});
foreach ($dirs as $dir) {
    echo $dir . "\n";
}
?>
<ul>
    <?php foreach ($dirs as $dir): ?>
        <li><a href="<?= '/'.$dir?>">
                <?= $dir?>
            </a>
        </li>
    <?php endforeach; ?>
</ul>
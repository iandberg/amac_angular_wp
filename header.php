<!DOCTYPE html>
<html <?php language_attributes(); ?> ng-app="myapp">
<head>
  <title>Ascension Martial Arts</title>
  <?php wp_head();?>
</head>
<body>

	<header id="logo_nav">
		<div class="container">
			<ul id="main_nav">
				<?php wp_nav_menu(array('menu'=>'primary','container'=>false,'items_wrap'=>'%3$s')); ?>
			</ul>
		</div>	
	</header>

	<div class="container">
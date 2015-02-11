<?php
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );

}

function mytheme_enqueue_scripts() {
  // register AngularJS
//   wp_register_script('angular-core', 'https://code.angularjs.org/1.3.9/angular.js', array(), null, false);
  wp_register_script('angular-core', get_stylesheet_directory_uri().'/js/angular.min.js', array(), null, false);

  // register our app.js, which has a dependency on angular-core
  wp_register_script('angular-app', get_stylesheet_directory_uri().'/js/app.js', array('angular-core'), null, false);
  wp_register_script('ui-router', get_stylesheet_directory_uri().'/js/angular-ui-router/release/angular-ui-router.js', array('angular-core'), null, false);
  wp_register_script('angular-sanitize', get_stylesheet_directory_uri().'/js/angular-sanitize/angular-sanitize.min.js', array('angular-core'), null, false);
  wp_register_script('angular-animate', get_stylesheet_directory_uri().'/js/angular-animate/angular-animate.js', array('angular-core'), null, false);

  // enqueue all scripts
  wp_enqueue_script('angular-core');
  wp_enqueue_script('angular-app');
  wp_enqueue_script('ui-router');
  wp_enqueue_script('angular-sanitize');
  wp_enqueue_script('angular-animate');

  // we need to create a JavaScript variable to store our API endpoint...   
  wp_localize_script( 'angular-core', 'AppAPI', array( 'url' => get_bloginfo('wpurl')) ); // this is the API address of the JSON API plugin
  // ... and useful information such as the theme directory and website url
  wp_localize_script( 'angular-core', 'BlogInfo', array( 
  		'url' => get_stylesheet_directory_uri().'/', 
  		'site' => get_bloginfo('wpurl'),
  		'partials' => get_stylesheet_directory_uri().'/partials/', 
  		) );

}
add_action('wp_enqueue_scripts', 'mytheme_enqueue_scripts');


add_filter( 'nav_menu_link_attributes', 'my_nav_menu_attribs', 10, 3 );

function my_nav_menu_attribs( $atts, $item, $args ){
	$post = get_post($item->object_id);
	$atts['ui-sref'] = $post->post_name;

	return $atts;
}
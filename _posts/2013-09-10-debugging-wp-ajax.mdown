---
layout: post
title: Debugging WP AJAX Actions
---

When testing WordPress AJAX requests, usually I find myself filling forms over and over again
in order to get data in the server side to build the the functionality I want to build.

Given the long time such process took to me, I tried to find an easier way to get `_POST` data in the server, and realized
that such data could be directly set to the `_POST` variable, and then, I could trigger
an action to execute the function or method that will handle the request.

A simple example of this method used for creating a post via AJAX without using validation, is the following.

**Create a request handler**

Create the function that will handle the request, this sample function is globally accessible,
however you should want to have it in a controller or a simple class to handle requests.

<pre class="prettyprint" data-lang="php">
/**
* Function that will handle post insertion with data in
* POST request.
*
* &lt;code&gt;
*
*	// Sample returned response
*	array( 'status'=> 200 );
*
* &lt;/code&gt;
*
* Note: you should validate your data before creating a
* WordPress Post.
*/
function ajax_create_post() {

	// Set post data up.
	$data = array(
			'post_title' => $_POST[ 'post_title' ]
		,	'post_content'  => $_POST[ 'post_content' ]
	);

	// Create a response object.
	$response = ( object ) array(
			'status' => 600 // Error
	);

	// Create a post.
	$post_id = wp_insert_post( $data );

	// Check whether the post was inserted.
	if ( is_numeric( $post_id ) ) {
		$response->status = 200;
		$response->post_id = $post_id;
	}

	// Print response.
	echo json_encode( $response );
	die();

}

</pre>

**Bind the function to an action**

Bind the function that will handle the request to a `WordPress Action` so that everytime such action is triggered,
the handle function will be executed.

<pre class="prettyprint" data-lang="php">
// Bind action "wp_ajax_ajax_create_post" to "ajax_create_post" function.
add_action( 'wp_ajax_ajax_create_post', 'ajax_create_post' );

</pre>

**Set attributes in `_POST` variable**

Set the data you want your handler to get when the action is triggered.

<pre class="prettyprint" data-lang="php">
// Set the _POST attributes you want to use.
$_POST = array(
		'post_title' => 'My post title'
	,	'post_content' => 'Sample post inserted via AJAX'
);

</pre>

**Trigger the action**

Now that the action is bound to a function and that we've set `_POST` attributes, we can trigger
the action to actually insert a post, and test our request handler.

<pre class="prettyprint" data-lang="php">
// Trigger action
do_action( 'wp_ajax_ajax_create_post' );

</pre>


Directly defining `_POST` attributes has helped me testing my code easily and I
hope it is also helpful for you.

The complete example can be found in [this gist](https://gist.github.com/PabloVallejo/6488040). Also
you can read [WP AJAX documentation](http://codex.wordpress.org/AJAX_in_Plugins).
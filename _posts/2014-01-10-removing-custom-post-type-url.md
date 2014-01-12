---
layout: post
title: Removing Custom Post Type Slug From Permalinks In WordPress
---

Some days ago I needed to remove the custom post type slug from the URL in a WordPress project, so that our post types URLs would look prettier, that is, instead of looking, `.com/event/my-awesome-event` look `.com/my-awesome-event`.
In our case, we decided to use post types because we wanted to have the events separated from the regulars posts so that it was easier for us to find them on the dashboard. However we wanted the permalink structure to the remain the same for both of them.

After trying different solutions, including editing the `.htaccess` file, I found that the best and simplest way to do it was using the technique exposed by the guys at [WordPress VIP](http://vip.wordpress.com/documentation/remove-the-slug-from-your-custom-post-type-permalinks/) which not only allows to have URLs without post type slug, but also modifies the permalinks so that they point to the prettier URLs. This technique has 2 parts.

First, the post type is created and a filter is called on `post_type_link` hook, so that the permalink of the post type gets the slug removed.

<pre class="prettyprint" data-lang="php">
/**
 * Register a custom post type but don't do anything fancy
 */
register_post_type( 'event', array( 'label' => 'Event', 'public' => true ) );
</pre>

<pre class="prettyprint" data-lang="php">
/**
 * Remove the slug from published post permalinks. Only affect our CPT though.
 */
function vipx_remove_cpt_slug( $post_link, $post, $leavename ) {
 
    if ( ! in_array( $post->post_type, array( 'event' ) ) 
    	|| 'publish' != $post->post_status )
        return $post_link;
 
    $post_link = str_replace( '/' . $post->post_type . '/', '/', $post_link );
 
    return $post_link;
}
add_filter( 'post_type_link', 'vipx_remove_cpt_slug', 10, 3 );
</pre>

And then as the second part, we tell WordPress not only to show posts or pages on URLs like `.com/<post-or-page-name>` but also to show custom post types.

<pre class="prettyprint" data-lang="php">
/**
 * Some hackery to have WordPress match postname to any of our public 
 * post types. All of our public post types can have /post-name/ as 
 * the slug, so they better be unique across all posts. Typically core 
 * only accounts for posts and pages where the slug is /post-name/
 */
function vipx_parse_request_tricksy( $query ) {
 
    // Only noop the main query
    if ( ! $query->is_main_query() )
        return;
 
    // Only noop our very specific rewrite rule match
    if ( 2 != count( $query->query )
        || ! isset( $query->query['page'] ) )
        return;
 
    // 'name' will be set if post permalinks are just post_name, 
    // otherwise the page rule will match
    if ( ! empty( $query->query['name'] ) )
        $query->set( 'post_type', array( 'post', 'event', 'page' ) );
}
add_action( 'pre_get_posts', 'vipx_parse_request_tricksy' );
</pre>

The only caveat to this method, is that you should take care not to have a regular post and a post from a custom post type having the same URL, because WordPress would likely render the most recent one. Other than that, it can be very helpful to easily have URLs with a more simple format.

**Source: [WordPress VIP](http://vip.wordpress.com/documentation/remove-the-slug-from-your-custom-post-type-permalinks/).**




<?php
/**
 * The template for displaying pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other "pages" on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage Sixodp
 */

get_header(); ?>

<div id="primary" class="content-area">
  <main id="main" class="site-main wrapper" role="main">
    
    <?php
      get_template_part('partials/header-logos');
    ?>

    <div class="page-hero"></div>
    <div class="page-hero-content container">
      <div class="wrapper">
        <div class="headingbar">
          <h1 class="heading-main"><?php _e('Showcase ideas', 'sixodp') ?></h1>
        </div>

        <div class="row">
          <div class="col-md-3 sidebar">
            <ul>
              <li class="sidebar-item--highlight">
                <a href="<?php echo get_permalink(get_translated_page_by_title('Uusi sovellusidea')); ?>">
                  <?php _e('New showcase idea', 'sixodp') ?>
                  <span class="sidebar-icon-wrapper">
                    <span class="fa fa-chevron-right"></span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-md-9 col-xs-12">
            <div class="cards cards--2 cards--image">
              <?php
                // Start the loop.
                while ( have_posts() ) : the_post();
                  // Include the page content template.
                  get_template_part('partials/archive-item');

                  // End of the loop.
                endwhile;
              ?>
            </div>
          </div>
        </div>

      </div>
    </div>

  </main><!-- .site-main -->

</div><!-- .content-area -->
<?php get_footer(); ?>

<?php
/**
* Hero -partial
*/
?>

<div class="hero" style="background-image: url(<?php echo get_field('frontpage_background')['url']; ?>);">
  <div class="hero__inner">
    <?php
      get_template_part('partials/header-logos');
    ?>
    <div class="container">
      <div class="row">
        <h1 class="heading--main text-center"><?php _e('6Aika Open Data Portal', 'sixodp');?></h1>
        <h3 class="subheading text-center"><?php _e('Open data for free utilization', 'sixodp');?></h3>

        <div class="col-md-8 col-md-offset-2">
          <div class="input-group">
            <div class="input-group-btn">
              <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span id="selected-domain" data-value="/data/dataset"><?php _e('Datasets', 'sixodp');?> </span> <span class="caret"></span>
              </button>
              <ul class="dropdown-menu dropdown-menu-right">
                <li><a data-value="/data/dataset"><?php _e('Datasets', 'sixodp');?> </a></li>
                <li><a data-value="/data/showcase"><?php _e('Applications', 'sixodp');?> </a></li>
                <li><a data-value="/data/collection"><?php _e('Collections', 'sixodp');?> </a></li>
                <li><a data-value="/posts"><?php _e('Articles', 'sixodp');?> </a></li>
                <li role="separator" class="divider"></li>
                <li><a data-value="/posts"><?php _e('Other', 'sixodp');?> </a></li>
              </ul>
            </div><!-- /btn-group -->
            <input type="text" id="q" class="form-control input-lg" aria-label="...">
            <span class="input-group-btn">
              <button id="search" class="btn btn-secondary" type="button"><?php _e('Search', 'sixodp');?> </button>
            </span>
          </div><!-- /input-group -->
        </div>
      </div>
    </div>

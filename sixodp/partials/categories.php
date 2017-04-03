<?php
  /**
  * Category list partial.
  */
?>

  <div class="wrapper wrapper--categories">
    <div class="container">
      <div class="row">
        <div class="categories">
          <?php
            foreach(get_ckan_categories() as $category) : 
              $display_name = $category['display_name'];
              $name         = $category['name'];
              $url          = CKAN_BASE_URL.'/data/groups/'.$name;
              $image_url    = $category['image_display_url']; ?>
              <div class="category__wrapper">
                <div class="category">
                  <a href="<?php echo $url; ?>" class="category__link">
                    <img class="category__icon" src="<?php echo $image_url; ?>">
                    <span class="category__name"><?php echo $display_name; ?></span>
                  </a>
                </div>
              </div><?php
            endforeach;
          ?>
        </div>
      </div>
    </div>
    <?php include(locate_template('/partials/stats.php')); ?>
  </div>
</div> <!-- end hero in categories -->
